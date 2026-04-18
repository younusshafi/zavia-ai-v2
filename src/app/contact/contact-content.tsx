"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FadeIn } from "@/components/motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Suspense } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    type: intent === "prototype" ? "prototype" : "consultation",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at younus@zavia-ai.com");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <CheckCircle size={48} className="text-emerald mx-auto mb-4" />
        <h3 className="font-heading text-h2 text-foreground mb-2">Message sent</h3>
        <p className="text-muted">Both founders read every message. We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 md:p-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-muted mb-2">Name *</label>
          <input id="name" type="text" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
            placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-muted mb-2">Email *</label>
          <input id="email" type="email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
            placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm text-muted mb-2">Company</label>
        <input id="company" type="text" value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          placeholder="Your company" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm text-muted mb-2">Subject</label>
        <input id="subject" type="text" value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors"
          placeholder="What's this about?" />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm text-muted mb-2">How can we help?</label>
        <select id="type" value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors appearance-none">
          <option value="consultation">Book a consultation</option>
          <option value="prototype">Request a prototype</option>
          <option value="partnership">Partnership inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-muted mb-2">Message *</label>
        <textarea id="message" rows={5} required value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-muted-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
          placeholder="Tell us about your project, challenge, or idea..." />
      </div>

      <button type="submit" disabled={loading}
        className="glow-button w-full px-8 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Sending..." : "Send message"} {!loading && <Send size={16} />}
      </button>

      {error && <p className="text-sm text-red-400 text-center mt-2">{error}</p>}
    </form>
  );
}

export default function ContactContent() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] left-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Contact</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Let&apos;s build{" "}
              <span className="gradient-text-accent">something real.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              Tell us your problem. We&apos;ll come back with a prototype plan within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <FadeIn>
                <Suspense fallback={<div className="glass-card rounded-2xl p-10 min-h-[400px] animate-pulse" />}>
                  <ContactForm />
                </Suspense>
              </FadeIn>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <FadeIn delay={0.1}>
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-heading text-h3 text-foreground mb-4">Founders</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-foreground font-medium">Younus Shafi</p>
                      <p className="text-xs text-muted-dim">Co-Founder · Head of AI</p>
                      <a href="mailto:younus@zavia-ai.com" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mt-1 link-underline">
                        <Mail size={14} className="text-accent" /> younus@zavia-ai.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium">Ghaarib Khurshid</p>
                      <p className="text-xs text-muted-dim">Co-Founder · AI Engineer</p>
                      <a href="mailto:ghaarib.khurshid@zavia-ai.com" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mt-1 link-underline">
                        <Mail size={14} className="text-accent" /> ghaarib.khurshid@zavia-ai.com
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-heading text-h3 text-foreground mb-4">Offices</h3>
                  <div className="space-y-4">
                    {[
                      { city: "Muscat", region: "Oman", note: "HQ" },
                      { city: "Srinagar", region: "J&K", note: "Engineering" },
                      { city: "Kuala Lumpur", region: "Malaysia", note: "APAC" },
                    ].map((o) => (
                      <div key={o.city} className="flex items-start gap-3">
                        <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm text-foreground">{o.city}, {o.region}</p>
                          <p className="text-xs text-muted-dim">{o.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-heading text-h3 text-foreground mb-2">Response time</h3>
                  <p className="text-muted text-sm">Both founders read every message — we reply within one business day. Prototype plans delivered within 48 hours of initial call.</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="glass-card rounded-2xl p-8">
                  <h3 className="font-heading text-h3 text-foreground mb-3">Why teams trust us</h3>
                  <div className="space-y-3 text-sm text-muted">
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">—</span> Anthropic Claude Partner Network</div>
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">—</span> 17+ AI systems shipped to production</div>
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">—</span> Active deployments across GCC enterprises</div>
                    <div className="flex items-start gap-2"><span className="text-accent mt-0.5">—</span> Both founders respond within 1 business day</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
