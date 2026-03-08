// One-time script to get a Strava refresh token
// Step 1: Run this script — it prints a URL
// Step 2: Open the URL, authorize
// Step 3: You'll be redirected with ?code=XXXXX in the URL
// Step 4: Copy the code and run: node scripts/get-strava-token.js PASTE_CODE_HERE

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log("Set environment variables first:");
  console.log('  PowerShell:   $env:STRAVA_CLIENT_ID="your_id"');
  console.log('                $env:STRAVA_CLIENT_SECRET="your_secret"');
  process.exit(1);
}

const code = process.argv[2];

if (!code) {
  const authUrl = `https://www.strava.com/oauth/authorize?${new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: "https://shohbaxt.github.io/running",
    scope: "activity:read_all",
    approval_prompt: "auto",
  }).toString()}`;

  console.log("\n1. Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("\n2. Authorize the app.");
  console.log("3. You'll be redirected to shohbaxt.github.io/running?code=XXXXX&scope=...");
  console.log("4. Copy the 'code' value from the URL (just the code part, before &scope)");
  console.log("5. Run again with the code:\n");
  console.log('   node scripts/get-strava-token.js "PASTE_CODE_HERE"\n');
} else {
  (async () => {
    const res = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }),
    });

    const data = await res.json();

    if (data.refresh_token) {
      console.log("\nSuccess! Your refresh token:\n");
      console.log(data.refresh_token);
      console.log("\nAdd this as a GitHub secret named STRAVA_REFRESH_TOKEN");
    } else {
      console.error("\nError:", data);
    }
  })();
}
