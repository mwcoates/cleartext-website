import Link from "next/link";
import Image from "next/image";
import { LOGO_URL } from "@/lib/episodes";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={LOGO_URL}
            alt="Cleartext logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-white font-semibold text-lg tracking-tight group-hover:text-cyan-400 transition-colors">
            Cleartext
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/#episodes" className="hover:text-white transition-colors">
            Episodes
          </Link>
          <Link
            href="/radar"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Radar
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <a
            href="https://storage.googleapis.com/cleartext-podcast/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            RSS
          </a>
        </nav>
      </div>
    </header>
  );
}
