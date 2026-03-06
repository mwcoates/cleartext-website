import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold">Cleartext</p>
          <p className="text-slate-500 text-sm mt-1">
            Daily cybersecurity briefing for security leaders.
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Episodes
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-300 transition-colors"
          >
            About
          </Link>
          <a
            href="https://storage.googleapis.com/cleartext-podcast/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            RSS Feed
          </a>
          <a
            href="mailto:podcast@sevenhillventures.com"
            className="hover:text-slate-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800/50 py-4 text-center text-slate-600 text-xs">
        © {new Date().getFullYear()} Cleartext. New episodes Monday–Saturday.
      </div>
    </footer>
  );
}
