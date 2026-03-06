import Image from "next/image";
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-800">
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <Image
            src={LOGO_URL}
            alt="Cleartext"
            width={96}
            height={96}
            className="rounded-2xl mx-auto mb-6 shadow-2xl shadow-cyan-500/20"
            priority
          />
          <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
            Cleartext
          </h1>
          <p className="text-xl text-slate-400 mb-2 leading-relaxed">
            Daily cybersecurity briefing for CISOs and security leaders.
          </p>
          <p className="text-slate-600 text-sm mb-10">
            New episodes Monday–Friday · Week in Review every Saturday
          </p>
          <SubscribeButtons />
        </div>
      </section>

      {/* ── Latest Episode ── */}
      <section className="max-w-5xl mx-auto px-6 pt-14">
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
