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
      <article className="border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-900/50 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
            Latest Episode
          </span>
          {isWeekly && (
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
              Week in Review
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
          {episode.title}
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          {formatDate(episode.date)} &nbsp;·&nbsp;{" "}
          {formatDuration(episode.duration_seconds)}
        </p>

        {bullets.length > 0 && (
          <ul className="space-y-1.5 mb-6">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <Link
            href={`/episodes/${slug}`}
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 text-sm"
          >
            <PlayIcon /> Listen &amp; Read Show Notes
          </Link>

          <a
            href={episode.audio_url}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Download MP3 ↓
          </a>
        </div>
      </article>
    );
  }

  // Compact list card
  return (
    <article className="border border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700 rounded-xl p-5 transition-all group">
      <Link href={`/episodes/${slug}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isWeekly && (
                <span className="text-xs text-purple-400 font-medium">
                  Week in Review ·{" "}
                </span>
              )}
              <span className="text-slate-500 text-xs">
                {formatDate(episode.date)}
              </span>
            </div>
            <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors leading-snug">
              {episode.title}
            </h3>
            {bullets.length > 0 && (
              <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">
                {bullets.join(" · ")}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-slate-600 text-xs font-mono">
              {formatDuration(episode.duration_seconds)}
            </span>
            <span className="text-cyan-500 text-sm group-hover:translate-x-1 transition-transform">
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
