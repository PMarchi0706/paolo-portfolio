export function Footer() {
  return (
    <footer className="bg-brand-black py-8 text-center text-sm text-brand-black-foreground/60">
      <p>&copy; {new Date().getFullYear()} Paolo Marchi. Built with Next.js.</p>
    </footer>
  );
}
