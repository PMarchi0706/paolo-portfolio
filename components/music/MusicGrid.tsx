import { MusicPickCard } from "@/components/music/MusicPickCard";
import { musicPicks } from "@/data/music-picks";
import blurbs from "@/data/music-blurbs.generated.json";
import type { MusicBlurb } from "@/lib/types";

export function MusicGrid() {
  const blurbMap = new Map(
    (blurbs as MusicBlurb[]).map((b) => [b.id, b.blurb])
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {musicPicks.map((pick) => (
        <MusicPickCard key={pick.id} pick={pick} blurb={blurbMap.get(pick.id)} />
      ))}
    </div>
  );
}
