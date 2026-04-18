import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Services",
  description: "AI system development, agents, automation, consulting, and AI-native platforms for enterprises.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
