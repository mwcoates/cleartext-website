"use client";

// Update these URLs once your show is live on each platform
const SPOTIFY_URL =
  "https://open.spotify.com/show/cleartext"; // TODO: replace with real Spotify URL
const APPLE_URL =
  "https://podcasts.apple.com/us/podcast/cleartext/id1881767338";
const RSS_URL =
  "https://storage.googleapis.com/cleartext-podcast/feed.xml";

interface Props {
  compact?: boolean;
}

export default function SubscribeButtons({ compact = false }: Props) {
  const base = compact
    ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
    : "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Spotify */}
      <a
        href={SPOTIFY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#1DB954] text-black hover:bg-[#1ed760] hover:scale-105`}
      >
        <SpotifyIcon />
        {!compact && "Spotify"}
        {compact && "Spotify"}
      </a>

      {/* Apple Podcasts */}
      <a
        href={APPLE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-[#9333EA] text-white hover:bg-[#a855f7] hover:scale-105`}
      >
        <AppleIcon />
        Apple Podcasts
      </a>

      {/* RSS */}
      <a
        href={RSS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700`}
      >
        <RssIcon />
        RSS
      </a>
    </div>
  );
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function RssIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
    </svg>
  );
}
