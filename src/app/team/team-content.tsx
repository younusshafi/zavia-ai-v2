"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Mail } from "lucide-react";

const founders = [
  {
    name: "Younus Shafi",
    initials: "YS",
    role: "Co-Founder · Head of AI / Solutions Architect",
    location: "Muscat, Oman",
    skills: ["AI/ML", "Telecom (23+ yrs)", "RAG systems", "n8n", "Strategy", "Enterprise Sales"],
    bio: "Leads AI architecture and system design. Owns enterprise client relationships, solution strategy, and commercial direction.",
    email: "younus@zavia-ai.com",
  },
  {
    name: "Ghaarib Khurshid",
    initials: "GK",
    role: "Co-Founder · AI Engineer / Product Lead",
    location: "Srinagar, J&K",
    skills: ["RAG", "LLM integrations", "LangChain", "AI system design", "Full-stack AI", "Product"],
    bio: "Builds and deploys AI systems end-to-end. Leads product development, technical execution, and prototyping.",
    email: "ghaarib.khurshid@zavia-ai.com",
  },
];

const engineers = [
  {
    name: "Abdullah Amir",
    initials: "AA",
    role: "Lead Developer (Contract)",
    skills: ["Full-stack", "WordPress", "APIs", "RAG integrations", "LangChain"],
    bio: "Leads client-facing development; builds and integrates AI-enabled websites and backend systems.",
  },
  {
    name: "Ahmed Ashfaq",
    initials: "AA",
    role: "Full-Stack AI Engineer (Contract)",
    skills: ["Full-stack", "AI integrations", "LangChain", "APIs", "Automation"],
    bio: "Supports development of AI systems, backend logic, and integrations across the stack.",
  },
  {
    name: "Faheem Fayaz",
    initials: "FF",
    role: "Full-Stack Developer (Contract)",
    skills: ["Backend systems", "APIs", "Databases", "Web development"],
    bio: "Backend development and system reliability; implements scalable architecture.",
  },
];

const governance = [
  {
    name: "Feroze Jalal",
    initials: "FJ",
    role: "AI Governance & Responsible AI Lead (Contract)",
    skills: ["AI ethics", "Model evaluation", "Compliance", "Risk management"],
    bio: "Ensures responsible AI use, evaluation standards, and compliance readiness.",
  },
  {
    name: "Moqeet ur Rab",
    initials: "MR",
    role: "Cybersecurity & Data Protection Lead (Contract)",
    skills: ["Data security", "Privacy", "Secure architecture", "Access control"],
    bio: "Oversees system security, data protection, and privacy compliance.",
  },
];

const planned = [
  {
    name: "Marwan Shamsan",
    role: "Automation & Integration Specialist (n8n) · Arabic Systems Support (Contract)",
    skills: ["Workflow automation", "APIs", "n8n", "Integrations", "Arabic localization", "RTL"],
    status: "Planned",
  },
  {
    name: "Growth & Marketing Lead",
    role: "Digital Marketing · Content Strategy · Branding",
    skills: ["Digital marketing", "Content strategy", "Branding", "Outbound"],
    status: "Planned (Open)",
  },
  {
    name: "QA & Testing Engineer",
    role: "Quality Assurance · System Validation",
    skills: ["QA", "System validation", "Testing frameworks", "Reliability engineering"],
    status: "Planned (Open)",
  },
];

export default function TeamContent() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] right-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Team</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Engineers who{" "}
              <span className="gradient-text-accent">ship.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              A focused team with deep domain expertise in telecoms, AI, and enterprise systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Founders */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn><span className="section-label mb-8 block">Founders</span></FadeIn>
          <StaggerContainer className="space-y-5" staggerDelay={0.15}>
            {founders.map((m) => (
              <StaggerItem key={m.name}>
                <div className="glass-card-hover rounded-2xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent-subtle flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-xl text-accent">{m.initials}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-h2 text-foreground">{m.name}</h3>
                      <p className="text-accent text-sm font-medium mt-0.5">{m.role}</p>
                      <p className="text-muted-dim text-xs font-mono mt-1">{m.location}</p>
                      <p className="text-muted text-body leading-relaxed mt-4">{m.bio}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {m.skills.map((s) => (<span key={s} className="tech-tag text-[10px]">{s}</span>))}
                      </div>
                      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light mt-4 transition-colors link-underline">
                        <Mail size={14} /> {m.email}
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Core Engineering */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn><span className="section-label mb-8 block">Core Engineering</span></FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.08}>
            {engineers.map((m) => (
              <StaggerItem key={m.name}>
                <div className="glass-card-hover rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-sm text-accent">{m.initials}</span>
                  </div>
                  <h3 className="font-heading text-h3 text-foreground">{m.name}</h3>
                  <p className="text-accent text-xs font-medium mt-0.5">{m.role}</p>
                  <p className="text-muted text-sm leading-relaxed mt-3">{m.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.skills.map((s) => (<span key={s} className="text-[10px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{s}</span>))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Governance & Security */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn><span className="section-label mb-8 block">Governance & Security</span></FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.08}>
            {governance.map((m) => (
              <StaggerItem key={m.name}>
                <div className="glass-card-hover rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-sm text-accent">{m.initials}</span>
                  </div>
                  <h3 className="font-heading text-h3 text-foreground">{m.name}</h3>
                  <p className="text-accent text-xs font-medium mt-0.5">{m.role}</p>
                  <p className="text-muted text-sm leading-relaxed mt-3">{m.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.skills.map((s) => (<span key={s} className="text-[10px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{s}</span>))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Planned Hires */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn><span className="section-label mb-8 block">Scaling the Team</span></FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.08}>
            {planned.map((m) => (
              <StaggerItem key={m.name}>
                <div className="rounded-2xl p-6 h-full border border-dashed border-border opacity-70">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                      <span className="font-heading font-bold text-sm text-muted-dim">?</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber bg-amber/10 px-2 py-0.5 rounded-full border border-amber/20">{m.status}</span>
                  </div>
                  <h3 className="font-heading text-h3 text-foreground">{m.name}</h3>
                  <p className="text-muted-dim text-xs font-medium mt-0.5">{m.role}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.skills.map((s) => (<span key={s} className="text-[10px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{s}</span>))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
