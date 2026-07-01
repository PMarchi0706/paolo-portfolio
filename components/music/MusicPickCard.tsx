import type { MusicPick } from "@/lib/types";

export function MusicPickCard({
  pick,
  blurb,
}: {
  pick: MusicPick;
  blurb: string | undefined;
}) {
  const content = (
    <div className="rounded-2xl bg-brand-green p-6 text-brand-green-foreground">
      <h3 className="font-heading text-xl font-bold tracking-tight">
        {pick.title}
      </h3>
      <p className="mt-1 text-sm text-brand-green-foreground/60">
        {pick.artist}
        {pick.album ? ` — ${pick.album}` : ""}
        {pick.year ? ` (${pick.year})` : ""}
      </p>
      <p className="mt-4 leading-relaxed text-brand-green-foreground/85">
        {blurb ?? "Blurb not generated yet — run `npm run generate:blurbs`."}
      </p>
    </div>
  );

  if (pick.spotifyUrl) {
    return (
      <a
        href={pick.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-opacity hover:opacity-90"
      >
        {content}
      </a>
    );
  }

  return content;
}
