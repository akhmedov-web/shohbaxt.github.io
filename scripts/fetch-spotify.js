// Fetches liked songs from Spotify and saves to public/spotify-data.json
// Used by GitHub Actions on a schedule

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 400) {
      console.error(
        "SPOTIFY_REFRESH_TOKEN was rejected. It is revoked whenever the Spotify " +
          "password changes or app access is withdrawn. Re-authorize with " +
          "scripts/get-refresh-token.js and update the SPOTIFY_REFRESH_TOKEN secret."
      );
    }
    throw new Error(`Token refresh failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function fetchLikedSongs(token) {
  const res = await fetch("https://api.spotify.com/v1/me/tracks?limit=20", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Fetch liked songs failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.items.map((item) => ({
    track: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    album: item.track.album.name,
    added: item.added_at,
    url: item.track.external_urls.spotify,
  }));
}

async function main() {
  console.log("Fetching access token...");
  const token = await getAccessToken();
  console.log("Fetching liked songs...");
  const songs = await fetchLikedSongs(token);
  console.log(`Got ${songs.length} songs`);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "public", "spotify-data.json");
  fs.writeFileSync(outPath, JSON.stringify({ songs, updated: new Date().toISOString() }, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
