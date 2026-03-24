import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#080808] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[#00ff87] font-semibold">cleartext_</p>
          <p className="text-[#555] text-sm mt-1">
            Daily cybersecurity briefing for security leaders.
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm text-[#555]">
          <Link href="/" className="hover:text-[#e8e8e8] transition-colors">
            episodes
          </Link>
          <Link href="/about" className="hover:text-[#e8e8e8] transition-colors">
            about
          </Link>
          <a
            href="https://storage.googleapis.com/cleartext-podcast/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e8e8e8] transition-colors"
          >
            rss
          </a>
          <a
            href="mailto:podcast@sevenhillventures.com"
            className="hover:text-[#e8e8e8] transition-colors"
          >
            contact
          </a>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a] py-4 text-center text-[#444] text-xs">
        © {new Date().getFullYear()} Cleartext. New episodes Monday–Saturday.
      </div>
    </footer>
  );
}
