import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: "AI engineering studio in Muscat, Srinagar, and Kuala Lumpur building production-grade Claude-powered systems.",
};

export default function AboutPage() {
  return <AboutContent />;
}
