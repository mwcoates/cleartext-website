import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAiEpisodes,
  getEpisodeSlug,
  formatDate,
  formatDuration,
} from "@/lib/episodes";
import AudioPlayer from "@/components/AudioPlayer";
import SubscribeButtons from "@/components/SubscribeButtons";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: { date: string };
}

export async function generateStaticParams() {
  try {
    const episodes = await getAiEpisodes();
    return episodes.map((ep) => ({ date: getEpisodeSlug(ep) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const episodes = await getAiEpisodes();
  const episode = episodes.find((ep) => getEpisodeSlug(ep) === params.date);
  if (!episode) return { title: "Episode Not Found" };
  return {
    title: episode.title,
    description: episode.description.split("\n")[2] ?? episode.description.slice(0, 160),
  };
}

export default async function AiEpisodePage({ params }: Props) {
  const episodes = await getAiEpisodes();
  const episodeIndex = episodes.findIndex(
    (ep) => getEpisodeSlug(ep) === params.date
  );

  if (episodeIndex === -1) notFound();

  const episode = episodes[episodeIndex];
  const prevEpisode = episodes[episodeIndex + 1] ?? null;
  const nextEpisode = episodes[episodeIndex - 1] ?? null;

  const isWeekly = episode.title.toLowerCase().includes("week in review");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/?feed=ai"
          className="text-[#555] hover:text-[#aaa] text-sm transition-colors flex items-center gap-1"
        >
          ← AI Revolution
        </Link>
      </nav>

      {/* Episode header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {isWeekly ? (
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff87]/70 bg-[#00ff87]/5 border border-[#00ff87]/20 px-3 py-1 rounded-full">
              Week in Review
            </span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff87] bg-[#00ff87]/10 px-3 py-1 rounded-full">
              AI Briefing
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-[#e8e8e8] leading-tight mb-3">
          {episode.title}
        </h1>

        <p className="text-[#555] text-sm">
          {formatDate(episode.date)}
          <span className="mx-2">·</span>
          {formatDuration(episode.duration_seconds)}
        </p>
      </header>

      {/* Audio Player */}
      <div className="mb-10">
        <AudioPlayer
          audioUrl={episode.audio_url}
          durationSeconds={episode.duration_seconds}
          fileSizeBytes={episode.audio_size_bytes}
          episodeTitle={episode.title}
        />
      </div>

      {/* Subscribe CTA */}
      <div className="mb-10 p-4 border border-[#1a1a1a] rounded-xl bg-[#0f0f0f]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#666] text-sm">
          Enjoy the show? Subscribe to never miss an episode.
        </p>
        <SubscribeButtons compact />
      </div>

      {/* Show Notes */}
      {episode.show_notes_html && (
        <section>
          <h2 className="text-[#444] text-xs font-semibold uppercase tracking-widest mb-6">
            Show Notes
          </h2>
          <div
            className="prose prose-invert max-w-none show-notes-content"
            dangerouslySetInnerHTML={{ __html: episode.show_notes_html }}
          />
        </section>
      )}

      {/* Episode navigation */}
      <nav className="mt-16 pt-8 border-t border-[#1a1a1a] grid grid-cols-2 gap-4">
        <div>
          {prevEpisode && (
            <Link href={`/ai/episodes/${getEpisodeSlug(prevEpisode)}`} className="group block">
              <span className="text-xs text-[#444] uppercase tracking-wider">← Previous</span>
              <p className="text-[#666] text-sm mt-1 group-hover:text-[#e8e8e8] transition-colors line-clamp-2">
                {prevEpisode.title}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextEpisode && (
            <Link href={`/ai/episodes/${getEpisodeSlug(nextEpisode)}`} className="group block">
              <span className="text-xs text-[#444] uppercase tracking-wider">Next →</span>
              <p className="text-[#666] text-sm mt-1 group-hover:text-[#e8e8e8] transition-colors line-clamp-2">
                {nextEpisode.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
