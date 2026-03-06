import Image from "next/image";
import { LOGO_URL } from "@/lib/episodes";
import SubscribeButtons from "@/components/SubscribeButtons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cleartext — daily AI-generated cybersecurity briefing for CISOs and security leaders.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-14">
        <Image
          src={LOGO_URL}
          alt="Cleartext"
          width={120}
          height={120}
          className="rounded-2xl shadow-2xl shadow-cyan-500/10 shrink-0"
        />
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">About Cleartext</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            A daily cybersecurity briefing for CISOs, security leaders, and
            anyone who needs to stay current on the threat landscape — without
            spending an hour reading headlines.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">What is Cleartext?</h2>
        <div className="text-slate-400 space-y-4 leading-relaxed">
          <p>
            Cleartext is an automated daily security podcast that monitors dozens
            of top cybersecurity news sources, curates the most relevant stories,
            and delivers a concise briefing every weekday morning. Each episode
            is produced fresh, so you always get today&apos;s news — not yesterday&apos;s.
          </p>
          <p>
            On Saturdays, we publish a <strong className="text-slate-300">Week in Review</strong> episode
            that synthesizes the major themes and developments from the past five
            days — ideal for busy executives who catch up on weekends.
          </p>
        </div>
      </section>

      {/* Format */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">Episode Format</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: "📰",
              title: "Daily Briefing",
              desc: "~10–12 minutes covering 6–9 curated stories. Monday–Friday, published at 4 AM PT.",
            },
            {
              icon: "📅",
              title: "Week in Review",
              desc: "~15 minutes synthesizing the week's major themes. Published Saturday mornings.",
            },
            {
              icon: "🎯",
              title: "CISO Lens",
              desc: "Every story includes why it matters to security leaders — not just what happened.",
            },
            {
              icon: "📝",
              title: "Full Show Notes",
              desc: "Each episode has complete show notes with links to all sources.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sources */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">Sources</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Cleartext monitors a curated set of top-tier security publications and
          feeds including Krebs on Security, Bleeping Computer, The Hacker News,
          Dark Reading, SANS Internet Storm Center, Infosecurity Magazine,
          BankInfoSecurity, and more.
        </p>
        <p className="text-slate-500 text-sm">
          Stories are ranked by relevance to enterprise security leaders using
          AI-assisted curation, then reviewed for accuracy and context.
        </p>
      </section>

      {/* Subscribe */}
      <section className="border border-slate-800 bg-slate-900/30 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Subscribe</h2>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto">
          Available on all major podcast platforms. Free, no account required.
        </p>
        <SubscribeButtons />
        <p className="text-slate-600 text-xs mt-6">
          Questions or feedback?{" "}
          <a
            href="mailto:podcast@sevenhillventures.com"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            podcast@sevenhillventures.com
          </a>
        </p>
      </section>
    </div>
  );
}
