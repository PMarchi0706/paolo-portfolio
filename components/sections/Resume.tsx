import { Button } from "@/components/ui/button";

// TODO: replace with Paolo's real contact links.
const CONTACT_LINKS = [
  { label: "Email", href: "mailto:your.email@example.com" },
  { label: "GitHub", href: "https://github.com/your-username" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
];

export function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">Resume &amp; Contact</h2>
      <p className="mt-4 text-muted-foreground">
        Interested in working together? Reach out or download my resume below.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {/* TODO: add public/resume.pdf */}
        <Button nativeButton={false} render={<a href="/resume.pdf" download />}>
          Download Resume
        </Button>
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
