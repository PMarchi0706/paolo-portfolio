import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:paolomarchi070600@gmail.com" },
  { label: "GitHub", href: "https://github.com/PMarchi0706" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/paolo-m-97b310138" },
];

export function Resume() {
  return (
    <section
      id="resume"
      className="bg-brand-green text-brand-green-foreground"
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="flex items-center gap-2 font-heading text-3xl font-bold tracking-tight">
          <Sparkle className="size-5 fill-brand-orange text-brand-orange" />
          Resume &amp; Contact
        </h2>
        <p className="mt-4 text-brand-green-foreground/75">
          Interested in working together? Reach out or download my resume
          below.
        </p>

        <div className="mt-8 rounded-2xl bg-brand-black p-6 text-brand-black-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              nativeButton={false}
              render={<a href="/resume.pdf" download />}
              className="rounded-full bg-brand-orange text-brand-orange-foreground hover:bg-brand-orange/85"
            >
              Download Resume
            </Button>
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline-offset-4 hover:text-brand-orange hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
