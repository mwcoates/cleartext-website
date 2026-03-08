import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Threat Radar",
  description:
    "30-day interactive global cybersecurity threat landscape. Track active threat actors, data breaches, and vulnerabilities by country — powered by Cleartext.",
};

export default function RadarPage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 57px)" }}>
      {/* Subscribe nudge bar */}
      <div className="flex items-center justify-between px-5 py-2 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm flex-shrink-0">
        <p className="text-xs text-slate-400">
          <span className="text-cyan-400 font-semibold">Cleartext</span>
          {" "}covers these threats daily — new briefing every weekday at 4 AM PT
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://podcasts.apple.com/us/podcast/cleartext/id1881767338"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Apple Podcasts
          </a>
          <a
            href="https://open.spotify.com/show/5aYVJheLNNZzkN3WnPXQSu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Spotify
          </a>
          <a
            href="https://storage.googleapis.com/cleartext-podcast/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors px-3 py-1 rounded-full font-medium"
          >
            Subscribe →
          </a>
        </div>
      </div>

      {/* Full-screen radar */}
      <iframe
        src="/threat-radar-mockup.html"
        className="flex-1 w-full border-0"
        title="30-Day Global Threat Radar"
      />
    </div>
  );
}
