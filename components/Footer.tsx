import Container from "./Container";

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" }
];

export default function Footer() {
  return (
    <footer className="bg-dark text-bg">
      <Container className="py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              Let&apos;s create something revolutionary.
            </h2>
            <p className="mt-4 max-w-md text-sm text-bg/70">
              本質的な価値のみを追求する、終わりのない実験と実装。
            </p>
          </div>
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-bg/60">
              {socials.map((social) => (
                <a key={social.label} href={social.href} className="hover:text-bg">
                  {social.label}
                </a>
              ))}
            </div>
            <div className="text-xs text-bg/50">© 2026 EITO PORTFOLIO. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
