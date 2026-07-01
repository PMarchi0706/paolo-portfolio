"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { NowPlayingResponse } from "@/lib/types";

const POLL_INTERVAL_MS = 45 * 1000;

export function NowPlayingWidget() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const json = (await res.json()) as NowPlayingResponse;
        if (!cancelled) setData(json);
      } catch {
        // Stay silent — widget just won't update this cycle.
      }
    }

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!data) return null;

  const track = data.isPlaying ? data : data.lastPlayed;
  if (!track) return null;

  const label = data.isPlaying ? "Now playing" : "Last played";

  const content = (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
      {track.albumArt ? (
        <Image
          src={track.albumArt}
          alt=""
          width={20}
          height={20}
          className="rounded-sm"
          unoptimized
        />
      ) : (
        <span
          className={`h-2 w-2 rounded-full ${
            data.isPlaying ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          }`}
        />
      )}
      <span className="text-muted-foreground">{label}:</span>
      <span className="max-w-[10rem] truncate font-medium">
        {track.track}
      </span>
      <span className="max-w-[8rem] truncate text-muted-foreground">
        — {track.artist}
      </span>
    </div>
  );

  if (track.url) {
    return (
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        {content}
      </a>
    );
  }

  return content;
}
