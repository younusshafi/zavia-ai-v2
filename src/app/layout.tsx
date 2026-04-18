import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";
import GradientMesh from "@/components/gradient-mesh";
import NavigationProgress from "@/components/navigation-progress";

export const metadata: Metadata = {
  title: {
    default: "Zavia-AI — Enterprise AI Systems, Engineered",
    template: "%s | Zavia-AI",
  },
  description:
    "We design, build, and deploy production-grade Claude-powered AI systems — agents, RAG, and automation — for enterprises shaping the GCC.",
  keywords: [
    "AI engineering",
    "Claude",
    "RAG",
    "AI agents",
    "enterprise AI",
    "GCC",
    "Oman",
    "n8n automation",
    "Anthropic partner",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zavia-ai.com",
    siteName: "Zavia-AI",
    title: "Zavia-AI — Enterprise AI Systems, Engineered",
    description:
      "Production-grade Claude-powered AI systems for enterprises across the GCC and South Asia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zavia-AI — Enterprise AI Systems, Engineered",
    description:
      "Production-grade Claude-powered AI systems for enterprises across the GCC.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-deep text-foreground font-body noise-overlay">
        <GradientMesh />
        <CustomCursor />
        <NavigationProgress />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-[1] min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
