import Link from "next/link";
import {
  Episode,
  formatDate,
  formatDuration,
  getEpisodeSlug,
} from "@/lib/episodes";

interface Props {
  episode: Episode;
  featured?: boolean;
}

export default function EpisodeCard({ episode, featured = false }: Props) {
  const slug = getEpisodeSlug(episode);
  const isWeekly = episode.title.toLowerCase().includes("week in review");

  // Extract bullet points from description (lines starting with •)
  const bullets = episode.description
    .split("\n")
    .filter((l) => l.trim().startsWith("•"))
    .map((l) => l.replace(/^•\s*/, "").trim())
    .slice(0, 4);

  if (featured) {
    return (
      <article className="border border-[#00ff87]/20 bg-[#0f0f0f] rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff87] bg-[#00ff87]/10 px-3 py-1 rounded-full">
            latest episode
          </span>
          {isWeekly && (
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff87]/70 bg-[#00ff87]/5 border border-[#00ff87]/20 px-3 py-1 rounded-full">
              week in review
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[#e8e8e8] mb-2 leading-tight">
          {episode.title}
        </h2>
        <p className="text-[#555] text-sm mb-5">
          {formatDate(episode.date)} &nbsp;·&nbsp;{" "}
          {formatDuration(episode.duration_seconds)}
        </p>

        {bullets.length > 0 && (
          <ul className="space-y-1.5 mb-6">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[#888] text-sm">
                <span className="text-[#00ff87] mt-0.5 shrink-0">▸</span>
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <Link
            href={`/episodes/${slug}`}
            className="inline-flex items-center gap-2 bg-[#00ff87] hover:bg-[#00ff87]/90 text-[#080808] font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 text-sm"
          >
            <PlayIcon /> listen &amp; read show notes
          </Link>

          <a
            href={episode.audio_url}
            className="text-[#555] hover:text-[#e8e8e8] text-sm transition-colors"
          >
            download mp3 ↓
          </a>
        </div>
      </article>
    );
  }

  // Compact list card
  return (
    <article className="border border-[#1a1a1a] bg-[#0f0f0f]/60 hover:bg-[#0f0f0f] hover:border-[#2a2a2a] rounded-xl p-5 transition-all group">
      <Link href={`/episodes/${slug}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isWeekly && (
                <span className="text-xs text-[#00ff87]/70 font-medium">
                  week in review ·{" "}
                </span>
              )}
              <span className="text-[#555] text-xs">
                {formatDate(episode.date)}
              </span>
            </div>
            <h3 className="text-[#e8e8e8] font-semibold group-hover:text-[#00ff87] transition-colors leading-snug">
              {episode.title}
            </h3>
            {bullets.length > 0 && (
              <p className="text-[#555] text-sm mt-1.5 line-clamp-2">
                {bullets.join(" · ")}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-[#444] text-xs font-mono">
              {formatDuration(episode.duration_seconds)}
            </span>
            <span className="text-[#00ff87] text-sm group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
