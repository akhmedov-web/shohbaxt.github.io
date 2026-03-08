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
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

async function fetchAthleteStats(token) {
  // Get athlete ID first
  const meRes = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) throw new Error(`Fetch athlete failed: ${meRes.status}`);
  const me = await meRes.json();

  // Get stats
  const statsRes = await fetch(`https://www.strava.com/api/v3/athletes/${me.id}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!statsRes.ok) throw new Error(`Fetch stats failed: ${statsRes.status}`);
  return statsRes.json();
}

async function fetchRecentActivities(token) {
  const res = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Fetch activities failed: ${res.status}`);
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

async function main() {
  console.log("Fetching access token...");
  const token = await getAccessToken();

  console.log("Fetching stats and activities...");
  const [stats, runs] = await Promise.all([
    fetchAthleteStats(token),
    fetchRecentActivities(token),
  ]);

  const runTotals = stats.all_run_totals || {};
  const recentTotals = stats.recent_run_totals || {};

  const data = {
    totalRuns: runTotals.count || 0,
    totalKm: ((runTotals.distance || 0) / 1000).toFixed(0),
    recentKm: ((recentTotals.distance || 0) / 1000).toFixed(1),
    recentRuns: runs,
    updated: new Date().toISOString(),
  };

  console.log(`Got ${runs.length} recent runs, ${data.totalRuns} total`);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "public", "strava-data.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
