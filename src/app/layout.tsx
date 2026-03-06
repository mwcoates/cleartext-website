import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Cleartext",
    default: "Cleartext — Daily Cybersecurity Briefing",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Daily cybersecurity news and analysis for CISOs and security leaders. New episodes every weekday morning.",
  openGraph: {
    type: "website",
    siteName: "Cleartext",
    images: [
      {
        url: "https://storage.googleapis.com/cleartext-podcast/cleartext_podcast_logo.png",
        width: 3000,
        height: 3000,
        alt: "Cleartext Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://storage.googleapis.com/cleartext-podcast/cleartext_podcast_logo.png",
    ],
  },
  alternates: {
    types: {
      "application/rss+xml":
        "https://storage.googleapis.com/cleartext-podcast/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
