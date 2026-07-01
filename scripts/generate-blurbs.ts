// Regenerates data/music-blurbs.generated.json from data/music-picks.ts.
// Run with `npm run generate:blurbs` whenever picks are added or edited.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { generateBlurb } from "../lib/anthropic";
import { musicPicks } from "../data/music-picks";
import type { MusicBlurb } from "../lib/types";

config({ path: ".env.local" });

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Missing ANTHROPIC_API_KEY in .env.local");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const results: MusicBlurb[] = [];

  for (const pick of musicPicks) {
    process.stdout.write(`Generating blurb for "${pick.title}"... `);
    try {
      const blurb = await generateBlurb(client, pick);
      results.push({ id: pick.id, blurb });
      console.log("done");
    } catch (err) {
      console.log("FAILED");
      console.error(err);
    }
  }

  const outputPath = path.join(
    process.cwd(),
    "data",
    "music-blurbs.generated.json"
  );
  await writeFile(outputPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${results.length} blurbs to ${outputPath}`);
}

main();
