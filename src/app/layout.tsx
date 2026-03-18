import type { Metadata } from "next";
import Script from "next/script";
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
    url: "https://cleartext.fm",
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
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1KEC10Z0WH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1KEC10Z0WH');
        `}</Script>
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id = "8972604";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript"; b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{display:"none"}} alt="" src="https://px.ads.linkedin.com/collect/?pid=8972604&fmt=gif" />
        </noscript>
      </body>
    </html>
  );
}
