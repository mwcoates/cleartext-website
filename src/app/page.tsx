import Image from "next/image";
import Link from "next/link";
import { getEpisodes, LOGO_URL } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import SubscribeButtons from "@/components/SubscribeButtons";
import EmailSignup from "@/components/EmailSignup";
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
      {/* ── Hero + Radar ── */}
      <section className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">

          {/* Hero header */}
          <div className="flex items-start justify-between gap-6 mb-5">
            <div className="flex-1 min-w-0">
              {/* Live badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse inline-block" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
                  Live · 30-Day Global Coverage
                </span>
              </div>

              {/* Brand + value prop */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
                Cleartext
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mb-5 leading-relaxed">
                Daily cybersecurity briefing for CISOs and security leaders —
                synthesized from 16 leading publications every morning.
              </p>

              {/* Primary CTA: podcast apps */}
              <SubscribeButtons />

              {/* Secondary: email */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-xs text-slate-600">or get it in your inbox</span>
                <EmailSignup compact />
              </div>
            </div>

            {/* Full screen link — desktop only */}
            <Link
              href="/radar"
              className="flex-shrink-0 hidden sm:flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium pt-1"
            >
              Full screen
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          {/* Radar iframe */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-[300px] sm:h-[420px] lg:h-[520px]">
            <iframe
              src="/threat-radar-mockup.html?embed=1"
              className="w-full h-full border-0"
              title="30-Day Global Threat Radar"
            />
          </div>

          {/* Below-map caption */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-slate-600 text-xs">
              Each dot is a story tracked in the last 30 days · Mon–Fri + Week in Review Saturday
            </p>
            <Link
              href="/radar"
              className="text-xs text-slate-500 hover:text-white transition-colors sm:hidden"
            >
              Full screen →
            </Link>
          </div>

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

      {/* ── Bottom Subscribe CTA ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Never miss a briefing
          </h2>
          <p className="text-slate-400 text-sm mb-7 max-w-sm mx-auto">
            Subscribe on your favorite platform — new episodes every weekday morning.
          </p>
          <div className="flex flex-col items-center gap-4">
            <SubscribeButtons />
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">or get it in your inbox</span>
              <EmailSignup compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
