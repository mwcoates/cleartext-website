import Image from "next/image";
import Link from "next/link";
import { getEpisodes, LOGO_URL } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import SubscribeButtons from "@/components/SubscribeButtons";
import type { Metadata } from "next";

export const revalidate = 3600; // Re-fetch from GCS every hour

export const metadata: Metadata = {
  title: "Cleartext — Daily Cybersecurity Briefing",
};

export default async function Home() {
  const episodes = await getEpisodes();
  const [latest, ...rest] = episodes;

  return (
    <>
      {/* ── Threat Radar Hero ── */}
      <section className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
          {/* Section header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
                  Live · 30-Day Coverage
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                Global Threat Landscape
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Click any country to explore active threats, APT groups, and recent Cleartext stories
              </p>
            </div>
            <Link
              href="/radar"
              className="flex-shrink-0 hidden sm:flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium mt-1"
            >
              Full screen
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Radar iframe */}
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950"
            style={{ height: "58vh", minHeight: "400px" }}
          >
            <iframe
              src="/threat-radar-mockup.html"
              className="w-full h-full border-0"
              title="30-Day Threat Radar"
            />
          </div>

          {/* Below-map CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3">
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              Each dot represents stories Cleartext has covered in the last 30 days.
              Subscribe to hear them daily.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/radar"
                className="text-xs text-slate-400 hover:text-white transition-colors sm:hidden"
              >
                Full screen →
              </Link>
              <SubscribeButtons compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── Podcast Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-slate-950 to-slate-950 pointer-events-none"
        />
        <div className="relative max-w-3xl mx-auto px-6 py-14 text-center">
          <Image
            src={LOGO_URL}
            alt="Cleartext"
            width={80}
            height={80}
            className="rounded-2xl mx-auto mb-5 shadow-2xl shadow-cyan-500/20"
            priority
          />
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
            Cleartext
          </h1>
          <p className="text-lg text-slate-400 mb-2 leading-relaxed">
            Daily cybersecurity briefing for CISOs and security leaders.
          </p>
          <p className="text-slate-600 text-sm mb-8">
            New episodes Monday–Friday · Week in Review every Saturday
          </p>
          <SubscribeButtons />
        </div>
      </section>

      {/* ── Latest Episode ── */}
      <section id="episodes" className="max-w-5xl mx-auto px-6 pt-14">
        {latest && <EpisodeCard episode={latest} featured />}
      </section>

      {/* ── All Episodes ── */}
      {rest.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <h2 className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-5">
            Previous Episodes
          </h2>
          <div className="space-y-3">
            {rest.map((episode) => (
              <EpisodeCard key={episode.date} episode={episode} />
            ))}
          </div>
        </section>
      )}

      {/* ── Subscribe CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Never miss a briefing
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Subscribe on your favorite platform and get the security headlines
            that matter — delivered to your ears every morning.
          </p>
          <SubscribeButtons />
        </div>
      </section>
    </>
  );
}
