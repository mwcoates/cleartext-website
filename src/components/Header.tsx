import Link from "next/link";
import Image from "next/image";
import { LOGO_URL } from "@/lib/episodes";

export default function Header() {
  return (
    <header className="border-b border-[#1a1a1a] bg-[#080808]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={LOGO_URL}
            alt="Cleartext logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-[#00ff87] font-semibold text-lg tracking-tight">
            cleartext<span className="animate-pulse">_</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-[#666]">
          <Link href="/#episodes" className="hover:text-[#e8e8e8] transition-colors">
            episodes
          </Link>
          <Link
            href="/radar"
            className="flex items-center gap-1.5 hover:text-[#e8e8e8] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            radar
          </Link>
          <Link href="/about" className="hover:text-[#e8e8e8] transition-colors">
            about
          </Link>
        </nav>
      </div>
    </header>
  );
}
