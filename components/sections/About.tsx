import { Sparkle } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="flex items-center gap-2 font-heading text-3xl font-bold tracking-tight">
        <Sparkle className="size-5 fill-brand-orange text-brand-orange" />
        About
      </h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        I&apos;m a Computer Science graduate from CSULA with a foundation
        spanning full-stack development, data analysis, and project
        management. I like building things that solve real, tangible
        problems — most recently, that meant helping the U.S. Army turn 3D
        models into laser-cuttable training materials. I&apos;m looking for
        opportunities in web development and data analysis where I can keep
        doing that.
      </p>
    </section>
  );
}
