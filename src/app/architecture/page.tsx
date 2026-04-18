import type { Metadata } from "next";
import ArchitectureContent from "./architecture-content";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Modular production-ready AI stack — frontend, orchestration, intelligence, memory, tools, and guardrails.",
};

export default function ArchitecturePage() {
  return <ArchitectureContent />;
}
