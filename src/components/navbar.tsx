"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Architecture", href: "/architecture" },
  { label: "Industries", href: "/industries" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-heading font-bold text-sm text-white group-hover:shadow-[0_0_20px_rgba(94,106,210,0.4)] transition-shadow">
              Z
            </div>
            <span className="font-heading font-semibold text-foreground text-sm tracking-tight">
              Zavia-AI
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full border border-accent/20">
              Anthropic Partner
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-surface-bright rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex glow-button px-4 py-2 text-[13px] font-medium rounded-lg"
            >
              Book a consultation
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-deep/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-6 py-3 text-xl font-heading font-medium transition-colors ${
                      pathname === item.href ? "text-accent" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="glow-button px-8 py-3 rounded-lg font-medium"
                >
                  Book a consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
