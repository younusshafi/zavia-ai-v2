import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Zavia-AI. Both founders read every message. Reply within one business day.",
};

export default function ContactPage() {
  return <ContactContent />;
}
