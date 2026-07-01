import type { Metadata } from "next";
import { Sparkle } from "lucide-react";
import { MusicGrid } from "@/components/music/MusicGrid";

export const metadata: Metadata = {
  title: "Music — Paolo Marchi",
  description: "A few songs I like, with AI-generated blurbs on why.",
};

export default function MusicPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="flex items-center gap-2 font-heading text-4xl font-bold tracking-tight">
        <Sparkle className="size-6 fill-brand-orange text-brand-orange" />
        Music
      </h1>
      <p className="mt-3 text-muted-foreground">
        A handful of songs I keep coming back to. The blurbs below are
        written by Claude, seeded with a short note from me on why each one
        matters — generated once and cached, not re-run per visitor.
      </p>
      <div className="mt-8">
        <MusicGrid />
      </div>
    </section>
  );
}
