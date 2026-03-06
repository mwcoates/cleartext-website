const GCS_BASE =
  process.env.NEXT_PUBLIC_GCS_BASE ||
  "https://storage.googleapis.com/cleartext-podcast";

export const FEED_URL = `${GCS_BASE}/feed.xml`;
export const LOGO_URL = `${GCS_BASE}/cleartext_podcast_logo.png`;

export interface Episode {
  date: string; // ISO 8601, e.g. "2026-03-06T12:25:59.472783+00:00"
  title: string;
  description: string;
  show_notes_html: string;
  show_notes_url: string;
  audio_url: string;
  audio_size_bytes: number;
  audio_format: string;
  duration_seconds: number;
}

/** Fetch all episodes from GCS, sorted newest first. */
export async function getEpisodes(): Promise<Episode[]> {
  const res = await fetch(`${GCS_BASE}/episodes.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch episodes: ${res.status}`);
  const episodes: Episode[] = await res.json();
  return episodes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Extract YYYY-MM-DD slug from an episode. */
export function getEpisodeSlug(episode: Episode): string {
  return episode.date.split("T")[0];
}

/** Format seconds as M:SS */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Format an ISO date string as "Friday, March 6, 2026" */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Short date: "Mar 6, 2026" */
export function formatDateShort(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Format file size as "5.8 MB" */
export function formatFileSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}
