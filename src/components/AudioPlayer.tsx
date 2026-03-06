"use client";

import { formatDuration, formatFileSize } from "@/lib/episodes";

interface Props {
  audioUrl: string;
  durationSeconds: number;
  fileSizeBytes: number;
  episodeTitle: string;
}

export default function AudioPlayer({
  audioUrl,
  durationSeconds,
  fileSizeBytes,
  episodeTitle,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">
            {episodeTitle}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span>{formatDuration(durationSeconds)}</span>
          <span>·</span>
          <span>{formatFileSize(fileSizeBytes)}</span>
        </div>
      </div>

      <audio
        controls
        src={audioUrl}
        className="w-full h-10"
        preload="metadata"
        style={{ colorScheme: "dark" }}
      >
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-4 mt-3">
        <a
          href={audioUrl}
          download
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.84v4h5.66V9h3.84L12 2z" />
          </svg>
          Download MP3
        </a>
      </div>
    </div>
  );
}
