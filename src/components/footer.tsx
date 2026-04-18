import Link from "next/link";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Architecture", href: "/architecture" },
];

const moreLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-base/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-heading font-bold text-sm text-white">
                Z
              </div>
              <span className="font-heading font-semibold text-foreground">Zavia-AI</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm mb-4">
              An AI engineering studio building production-grade AI systems, agents, and automations for enterprises across the GCC and South Asia.
            </p>
            <p className="text-muted-dim text-xs">
              Muscat, Oman · Srinagar, J&K · Kuala Lumpur, Malaysia
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted text-sm hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-foreground text-sm mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:younus@zavia-ai.com" className="text-muted text-sm hover:text-foreground transition-colors">
                  younus@zavia-ai.com
                </a>
              </li>
              <li>
                <a href="mailto:ghaarib.khurshid@zavia-ai.com" className="text-muted text-sm hover:text-foreground transition-colors">
                  ghaarib.khurshid@zavia-ai.com
                </a>
              </li>
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted text-sm hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-dim text-xs">© 2026 Zavia-AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full border border-accent/20">
              Anthropic Claude Partner Network
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
