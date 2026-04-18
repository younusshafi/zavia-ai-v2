import type { Metadata } from "next";
import IndustriesContent from "./industries-content";

export const metadata: Metadata = {
  title: "Industries",
  description: "Enterprise AI solutions for telecom, tourism, education, and fleet management in the GCC.",
};

export default function IndustriesPage() {
  return <IndustriesContent />;
}
