import { Sparkle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-green text-brand-green-foreground">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
        <div className="relative">
          <p
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-8 z-0 select-none whitespace-nowrap font-heading text-7xl font-black text-transparent opacity-50 sm:text-9xl [-webkit-text-stroke:1.5px_var(--brand-orange)]"
          >
            DEVELOPER
          </p>
          <h1 className="relative z-10 font-heading text-5xl font-bold tracking-tight sm:text-7xl">
            Paolo Marchi
          </h1>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-black/30 px-4 py-1.5 text-sm text-brand-green-foreground/80">
          <Sparkle className="size-3.5 fill-brand-orange text-brand-orange" />
          Computer Science graduate — Web Development &amp; Data Analysis
          <Sparkle className="size-3.5 fill-brand-orange text-brand-orange" />
        </p>
      </div>
    </section>
  );
}
