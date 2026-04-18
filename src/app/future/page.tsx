import type { Metadata } from "next";
import FutureContent from "./future-content";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Zavia-AI is building next — RAG-as-a-Service, voice agents, tourism pipeline, and neuro-AI research.",
};

export default function FuturePage() {
  return <FutureContent />;
}
