// Tells you which API token is dead, without touching any data files.
//   PowerShell:  $env:SPOTIFY_CLIENT_ID="..."; node scripts/check-tokens.js
// Anything not configured is reported as skipped.

async function checkSpotify() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return { status: "skipped", detail: "credentials not set" };

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
  });
  if (!res.ok) return { status: "BROKEN", detail: `${res.status} ${await res.text()}` };

  const { access_token } = await res.json();
  const tracks = await fetch("https://api.spotify.com/v1/me/tracks?limit=1", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!tracks.ok) return { status: "BROKEN", detail: `liked songs: ${tracks.status} ${await tracks.text()}` };
  return { status: "ok", detail: "token refreshes, liked songs readable" };
}

async function checkStrava() {
  const { STRAVA_CLIENT_ID: id, STRAVA_CLIENT_SECRET: secret, STRAVA_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return { status: "skipped", detail: "credentials not set" };

  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: "refresh_token" }),
  });
  if (!res.ok) return { status: "BROKEN", detail: `${res.status} ${await res.text()}` };

  const data = await res.json();
  const rotated = data.refresh_token && data.refresh_token !== refresh;
  const me = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  if (me.status === 403) {
    return { status: "BROKEN", detail: "athlete: 403 — token is missing the profile:read_all scope" };
  }
  if (!me.ok) return { status: "BROKEN", detail: `athlete: ${me.status} ${await me.text()}` };
  return {
    status: "ok",
    detail: rotated ? "token refreshes, but Strava ROTATED it — store the new one" : "token refreshes, athlete readable",
  };
}

async function checkSubstack() {
  const res = await fetch("https://shohbaxt.substack.com/feed", { headers: { "User-Agent": "shohbaxt.github.io" } });
  return res.ok
    ? { status: "ok", detail: "feed reachable" }
    : { status: "BROKEN", detail: `${res.status}` };
}

const checks = { spotify: checkSpotify, strava: checkStrava, substack: checkSubstack };

async function main() {
  let broken = false;
  for (const [name, check] of Object.entries(checks)) {
    const result = await check().catch((err) => ({ status: "BROKEN", detail: err.message }));
    if (result.status === "BROKEN") broken = true;
    console.log(`${name.padEnd(9)} ${result.status.padEnd(8)} ${result.detail}`);
  }
  if (broken) process.exitCode = 1;
}

main();
