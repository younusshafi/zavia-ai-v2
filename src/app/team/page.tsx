import type { Metadata } from "next";
import TeamContent from "./team-content";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the engineers, architects, and specialists behind Zavia-AI's production AI systems.",
};

export default function TeamPage() {
  return <TeamContent />;
}
