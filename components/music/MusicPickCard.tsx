import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { MusicPick } from "@/lib/types";

export function MusicPickCard({
  pick,
  blurb,
}: {
  pick: MusicPick;
  blurb: string | undefined;
}) {
  const content = (
    <Card>
      <CardHeader>
        <CardTitle>{pick.title}</CardTitle>
        <CardDescription>
          {pick.artist}
          {pick.album ? ` — ${pick.album}` : ""}
          {pick.year ? ` (${pick.year})` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">
          {blurb ?? "Blurb not generated yet — run `npm run generate:blurbs`."}
        </p>
      </CardContent>
    </Card>
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
