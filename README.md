# Paolo Marchi — Portfolio

Personal developer portfolio built with Next.js. Features a live Spotify
"now playing" widget and a `/music` page with AI-generated blurbs (via
Claude) about a curated set of song picks.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

All required vars are listed in `.env.example`:

- `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` — from your app in the
  [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
- `SPOTIFY_REFRESH_TOKEN` — obtained via the one-time setup below.
- `ANTHROPIC_API_KEY` — from the [Anthropic Console](https://console.anthropic.com).

### One-time Spotify setup

Having a Client ID/Secret alone is **not** enough to show your own
currently-playing track — that only supports Spotify's Client Credentials
flow, which can't access personal listening data. You need to run the
Authorization Code flow once, as yourself:

1. In the Spotify Developer Dashboard, open your app's settings and add
   `http://127.0.0.1:8888/callback` as a Redirect URI.
2. Make sure `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are set in
   `.env.local`.
3. Run:
   ```bash
   node scripts/get-spotify-refresh-token.mjs
   ```
4. Open the printed URL, log in with your own Spotify account, and approve.
   The script will print a `SPOTIFY_REFRESH_TOKEN` — copy it into
   `.env.local` (and later into your Vercel project's env vars).

This refresh token doesn't expire from time alone (only if revoked), so
this is a one-time step.

### Generating music blurbs

Curated picks live in `data/music-picks.ts`. Fill in `personalNote` for
each — it's the single biggest lever for making the generated blurb sound
like you and not a generic algorithm.

Blurbs are generated at build time, not per-visitor, to keep the site fast
and API cost near-zero. Whenever you add or edit a pick:

```bash
npm run generate:blurbs
```

This calls Claude once per song and writes the results to
`data/music-blurbs.generated.json`, which is committed to the repo and
served statically. Commit the updated file after regenerating.

## Content still needed

Several files are scaffolded with placeholder content, clearly marked
`TODO`:

- `components/sections/Resume.tsx` — real email/GitHub/LinkedIn links, and
  a real `public/resume.pdf`.
- `data/music-picks.ts` — real song picks + personal notes.
- `data/skills.ts` — confirm/expand the seeded skills list.
- `data/projects.ts` — add a link once the Unbox 3D repo is shareable, and
  the live URL for this site once deployed.

## Deploying

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all four env vars from `.env.example` in Project Settings →
   Environment Variables (Production and Preview).
4. Deploy.
