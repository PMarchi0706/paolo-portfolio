import Link from "next/link";
import { Sparkle } from "lucide-react";
import { NowPlayingWidget } from "@/components/now-playing/NowPlayingWidget";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#resume", label: "Resume" },
  { href: "/music", label: "Music" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-cream/10 bg-brand-green text-brand-green-foreground">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-heading text-lg font-bold tracking-tight"
        >
          <Sparkle className="size-4 fill-brand-orange text-brand-orange" />
          Paolo Marchi
        </Link>

        <nav className="flex items-center gap-5 text-sm text-brand-green-foreground/70">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <NowPlayingWidget />
      </div>
    </header>
  );
}
