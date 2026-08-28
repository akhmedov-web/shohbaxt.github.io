// Fetches running stats from Strava and saves to public/strava-data.json
// Used by GitHub Actions on a schedule

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 400 || res.status === 401) {
      console.error(
        "STRAVA_REFRESH_TOKEN is no longer valid. Strava rotates refresh tokens and " +
          "invalidates the previous one. Re-authorize with scripts/get-strava-token.js " +
          "and update the STRAVA_REFRESH_TOKEN secret."
      );
    }
    throw new Error(`Token refresh failed: ${res.status} ${body}`);
  }
  const data = await res.json();

  // Strava can hand back a fresh refresh token; the old one stops working the
  // moment it does. Leave it on disk so the workflow can store it as a secret.
  if (data.refresh_token && data.refresh_token !== REFRESH_TOKEN) {
    const fs = await import("fs");
    fs.writeFileSync(".strava-refresh-token", data.refresh_token);
    console.log("Strava rotated the refresh token — STRAVA_REFRESH_TOKEN needs updating.");
  }

  return data.access_token;
}

async function fetchAthleteStats(token) {
  // Get athlete ID first. This endpoint needs the profile:read_all scope —
  // a token holding only activity:read_all gets 403 here, not 401.
  const meRes = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) {
    const body = await meRes.text();
    if (meRes.status === 403) {
      console.error(
        "Strava returned 403 for /athlete. The token is valid but lacks the " +
          "profile:read_all scope. Re-authorize with scripts/get-strava-token.js " +
          "(it now requests that scope) and update STRAVA_REFRESH_TOKEN."
      );
    }
    throw new Error(`Fetch athlete failed: ${meRes.status} ${body}`);
  }
  const me = await meRes.json();

  // Get stats
  const statsRes = await fetch(`https://www.strava.com/api/v3/athletes/${me.id}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!statsRes.ok) {
    throw new Error(`Fetch stats failed: ${statsRes.status} ${await statsRes.text()}`);
  }
  return statsRes.json();
}

async function fetchRecentActivities(token) {
  const res = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Fetch activities failed: ${res.status} ${await res.text()}`);
  const activities = await res.json();

  return activities
    .filter((a) => a.type === "Run")
    .slice(0, 10)
    .map((a) => ({
      name: a.name,
      distance: (a.distance / 1000).toFixed(1) + " km",
      pace: formatPace(a.moving_time, a.distance),
      date: new Date(a.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      elapsed: formatDuration(a.moving_time),
    }));
}

function formatPace(seconds, meters) {
  if (!meters) return "-";
  const paceSeconds = seconds / (meters / 1000);
  const mins = Math.floor(paceSeconds / 60);
  const secs = Math.floor(paceSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")} /km`;
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

// The totals need profile:read_all; the activity list only needs
// activity:read_all. Reading the old file lets a scope problem on the former
// cost us the totals alone instead of the whole page.
function previousData(fs, outPath) {
  try {
    return JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  console.log("Fetching access token...");
  const token = await getAccessToken();

  console.log("Fetching stats and activities...");
  const [statsResult, runs] = await Promise.all([
    fetchAthleteStats(token).catch((err) => err),
    fetchRecentActivities(token),
  ]);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "public", "strava-data.json");

  const statsFailed = statsResult instanceof Error;
  const stats = statsFailed ? {} : statsResult;
  const previous = statsFailed ? previousData(fs, outPath) : {};

  const runTotals = stats.all_run_totals || {};
  const recentTotals = stats.recent_run_totals || {};

  const data = {
    totalRuns: statsFailed ? previous.totalRuns || 0 : runTotals.count || 0,
    totalKm: statsFailed ? previous.totalKm || "0" : ((runTotals.distance || 0) / 1000).toFixed(0),
    recentKm: statsFailed ? previous.recentKm || "0.0" : ((recentTotals.distance || 0) / 1000).toFixed(1),
    recentRuns: runs,
    updated: new Date().toISOString(),
  };

  console.log(`Got ${runs.length} recent runs, ${data.totalRuns} total`);

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Written to ${outPath}`);

  // Activities were written either way; still fail loudly so the run goes red.
  if (statsFailed) throw statsResult;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
