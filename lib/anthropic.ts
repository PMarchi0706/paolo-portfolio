import Anthropic from "@anthropic-ai/sdk";
import type { MusicPick } from "./types";

const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `You are writing short, personality-driven blurbs for a developer's personal "Music" page, covering songs/albums this person has personally chosen to feature. Each blurb should sound like a smart, slightly wry friend explaining why a song matters to them, not like a music critic or a press release.

Rules:
- 2 to 4 sentences, no more.
- No bullet points, no headers, no emoji.
- Include exactly one concrete, specific detail (a lyric, a moment, a memory, a technical detail about the production) — avoid vague praise ("this song is amazing") in favor of specificity.
- It's fine to be a little funny or a little nerdy (this is a software engineer's site) but never forced or cringe.
- Do not just restate the song title/artist/genre back — say something a Spotify algorithm couldn't.
- Write in second-or-third-person about the song, not first-person diary voice (e.g. "This one sneaks up on you" rather than "I remember when...") UNLESS a personal note is provided, in which case lightly incorporate that angle.`;

function buildUserMessage(pick: MusicPick): string {
  const lines = [
    `Title: ${pick.title}`,
    `Artist: ${pick.artist}`,
    pick.album ? `Album: ${pick.album}` : null,
    pick.year ? `Year: ${pick.year}` : null,
    pick.tags?.length ? `Tags: ${pick.tags.join(", ")}` : null,
    pick.personalNote
      ? `Owner's own words (use lightly, don't quote verbatim): ${pick.personalNote}`
      : null,
  ].filter(Boolean);

  return `${lines.join("\n")}\n\nWrite the blurb now.`;
}

export async function generateBlurb(
  client: Anthropic,
  pick: MusicPick
): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 250,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserMessage(pick) }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text.trim() ?? "";
}
