"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Younus Shafi",
    role: "Founder & Principal Engineer",
    location: "Muscat, Oman",
    bio: "23+ years in telecoms (2G–5G), MBA from University of Strathclyde. Background in radio network design, optimization, and technology strategy across multiple countries. Now focused on enterprise AI systems and strategic consulting.",
    email: "younus@zavia-ai.com",
  },
  {
    name: "Ghaarib Khurshid",
    role: "Co-founder & Engineering Lead",
    location: "Srinagar, J&K",
    bio: "Full-stack engineer and AI systems architect. Leads engineering delivery across all client projects, from RAG pipelines to production n8n workflows.",
    email: "ghaarib.khurshid@zavia-ai.com",
  },
];

export default function TeamPage() {
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
              A small, focused team with deep domain expertise in telecoms, AI, and enterprise systems.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <StaggerContainer className="space-y-5" staggerDelay={0.15}>
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="glass-card-hover rounded-2xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent-subtle flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-xl text-accent">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-h2 text-foreground">{member.name}</h3>
                      <p className="text-accent text-sm font-medium mt-0.5">{member.role}</p>
                      <p className="text-muted-dim text-xs font-mono mt-1">{member.location}</p>
                      <p className="text-muted text-body leading-relaxed mt-4">{member.bio}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light mt-4 transition-colors"
                      >
                        <Mail size={14} /> {member.email}
                      </a>
                    </div>
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
