"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

interface Props {
  compact?: boolean;
}

export default function EmailSignup({ compact = false }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
        // LinkedIn conversion tracking
        if (typeof window !== "undefined" && (window as any).lintrk) {
          (window as any).lintrk('track', { conversion_id: 24824540 });
        }
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-[#00ff87]">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        subscribed — first briefing lands tomorrow morning.
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={state === "loading"}
          className="w-44 px-3 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] text-[#e8e8e8] placeholder-[#444] text-xs focus:outline-none focus:border-[#00ff87]/50 disabled:opacity-50 transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#888] text-xs font-medium transition-all disabled:opacity-50 flex-shrink-0"
        >
          {state === "loading" ? "…" : "subscribe"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={state === "loading"}
        className="flex-1 px-4 py-2.5 rounded-xl bg-[#0f0f0f] border border-[#2a2a2a] text-[#e8e8e8] placeholder-[#444] text-sm focus:outline-none focus:border-[#00ff87]/50 focus:ring-1 focus:ring-[#00ff87]/20 disabled:opacity-50 transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="px-5 py-2.5 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/90 text-[#080808] text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 flex-shrink-0"
      >
        {state === "loading" ? "subscribing…" : "get daily briefing"}
      </button>
      {state === "error" && (
        <p className="text-xs text-red-400 sm:col-span-2 mt-1">{errorMsg}</p>
      )}
    </form>
  );
}
