import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";
import GradientMesh from "@/components/gradient-mesh";
import NavigationProgress from "@/components/navigation-progress";

export const metadata: Metadata = {
  metadataBase: new URL("https://zavia-ai.com"),
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
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zavia-AI",
  url: "https://zavia-ai.com",
  logo: "https://zavia-ai.com/favicon.svg",
  description: "AI engineering studio building production-grade Claude-powered systems for enterprises across the GCC.",
  foundingDate: "2023",
  founders: [
    { "@type": "Person", name: "Younus Shafi" },
    { "@type": "Person", name: "Ghaarib Khurshid" },
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "Muscat", addressCountry: "OM" },
    { "@type": "PostalAddress", addressLocality: "Srinagar", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "younus@zavia-ai.com",
    contactType: "sales",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script defer data-domain="zavia-ai.com" src="https://plausible.io/js/script.js" />
      </head>
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
