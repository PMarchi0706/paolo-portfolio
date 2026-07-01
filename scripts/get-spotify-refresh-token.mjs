// One-time local script to obtain a Spotify refresh token for the site owner's account.
// Not part of the deployed app — run once locally with `node scripts/get-spotify-refresh-token.mjs`.
//
// Prerequisites:
//   1. SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET set in .env.local
//   2. http://127.0.0.1:8888/callback added as a Redirect URI in the Spotify Developer Dashboard
//      for this app (https://developer.spotify.com/dashboard -> your app -> Edit Settings)

import http from "node:http";
import { config } from "dotenv";

config({ path: ".env.local" });

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET in .env.local"
  );
  process.exit(1);
}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("scope", SCOPES);

console.log("\n1. Open this URL in your browser and log in with the Spotify account you want to show on the site:\n");
console.log(authUrl.toString());
console.log(`\n2. Waiting for the redirect on ${REDIRECT_URI} ...\n`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(`Authorization failed: ${error ?? "no code returned"}`);
    console.error(`Authorization failed: ${error ?? "no code returned"}`);
    server.close(() => process.exit(1));
    return;
  }

  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      throw new Error(JSON.stringify(data));
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Success! You can close this tab and return to the terminal.");

    console.log("Success! Add this to .env.local and Vercel env vars:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Token exchange failed — check the terminal.");
    console.error("Token exchange failed:", err);
  } finally {
    server.close(() => process.exit(0));
  }
});

server.listen(PORT);
