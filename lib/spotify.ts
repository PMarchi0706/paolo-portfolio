import { getOrSetCache } from "@/lib/cache";
import type { NowPlayingResponse } from "@/lib/types";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const ACCESS_TOKEN_TTL_MS = 50 * 60 * 1000; // access tokens last ~1hr, refresh a bit early
const NOW_PLAYING_TTL_MS = 30 * 1000;

type SpotifyTrackShape = {
  isPlaying: boolean;
  track: string;
  artist: string;
  albumArt: string | null;
  url: string | null;
};

async function getAccessToken(): Promise<string> {
  return getOrSetCache("spotify:access-token", ACCESS_TOKEN_TTL_MS, async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error("Missing Spotify environment variables");
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Spotify token refresh failed: ${res.status}`);
    }

    const data = (await res.json()) as { access_token: string };
    return data.access_token;
  });
}

function extractTrack(item: {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}): Pick<SpotifyTrackShape, "track" | "artist" | "albumArt" | "url"> {
  return {
    track: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    albumArt: item.album.images[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
  };
}

async function fetchCurrentlyPlaying(): Promise<NowPlayingResponse> {
  const accessToken = await getAccessToken();

  const currentRes = await fetch(CURRENTLY_PLAYING_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (currentRes.status === 200) {
    const data = await currentRes.json();
    if (data?.is_playing && data?.item) {
      return { isPlaying: true, ...extractTrack(data.item) };
    }
  }

  // Nothing currently playing (204, or is_playing: false) — fall back to recently played.
  const recentRes = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!recentRes.ok) {
    return { isPlaying: false, lastPlayed: null };
  }

  const recentData = await recentRes.json();
  const lastItem = recentData?.items?.[0]?.track;

  if (!lastItem) {
    return { isPlaying: false, lastPlayed: null };
  }

  return { isPlaying: false, lastPlayed: extractTrack(lastItem) };
}

export async function getNowPlaying(): Promise<NowPlayingResponse> {
  try {
    return await getOrSetCache(
      "spotify:now-playing",
      NOW_PLAYING_TTL_MS,
      fetchCurrentlyPlaying
    );
  } catch {
    // Spotify unreachable / token revoked — degrade gracefully, never throw to the caller.
    return { isPlaying: false, lastPlayed: null };
  }
}
