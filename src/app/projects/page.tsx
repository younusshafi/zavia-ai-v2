import type { Metadata } from "next";
import ProjectsContent from "./projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description: "17+ AI systems shipped across telecom, tourism, education, fleet management, and procurement.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
