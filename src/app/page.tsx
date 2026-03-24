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
      <section className="border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">

          {/* Hero — centered */}
          <div className="text-center mb-8">

            {/* Live badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse inline-block" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff87]">
                live · 30-day global coverage
              </span>
            </div>

            {/* Brand */}
            <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e8e8] leading-tight mb-3">
              cleartext<span className="text-[#00ff87] animate-pulse">_</span>
            </h1>

            {/* Value prop */}
            <p className="text-base sm:text-lg text-[#666] mb-8 leading-relaxed max-w-lg mx-auto">
              Daily cybersecurity briefing for CISOs and security leaders —
              synthesized from 16 leading publications every morning.
            </p>

            {/* Primary CTA: podcast apps */}
            <SubscribeButtons />

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-xs mx-auto my-5">
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="text-xs text-[#444] whitespace-nowrap">or get it in your inbox</span>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
            </div>

            {/* Secondary CTA: email */}
            <div className="flex justify-center">
              <EmailSignup />
            </div>

          </div>

          {/* Radar iframe */}
          <div className="relative rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#080808] h-[300px] sm:h-[420px] lg:h-[520px]">
            <iframe
              src="/threat-radar-mockup.html?embed=1"
              className="w-full h-full border-0"
              title="30-Day Global Threat Radar"
            />
          </div>

          {/* Below-map caption */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[#444] text-xs">
              Each dot is a story tracked in the last 30 days · Mon–Fri + Week in Review Saturday
            </p>
            <Link
              href="/radar"
              className="text-xs text-[#555] hover:text-[#e8e8e8] transition-colors"
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
          <h2 className="text-[#444] text-xs font-semibold uppercase tracking-widest mb-5">
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
        <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-[#e8e8e8] mb-2">
            never miss a briefing
          </h2>
          <p className="text-[#666] text-sm mb-7 max-w-sm mx-auto">
            New episodes every weekday morning — subscribe wherever you listen.
          </p>
          <SubscribeButtons />
          <div className="flex items-center gap-4 max-w-xs mx-auto my-5">
            <div className="flex-1 h-px bg-[#1a1a1a]" />
            <span className="text-xs text-[#444] whitespace-nowrap">or get it in your inbox</span>
            <div className="flex-1 h-px bg-[#1a1a1a]" />
          </div>
          <div className="flex justify-center">
            <EmailSignup />
          </div>
        </div>
      </section>
    </>
  );
}
