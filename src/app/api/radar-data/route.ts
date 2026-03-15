import { NextResponse } from "next/server";

const GCS_URL =
  "https://storage.googleapis.com/cleartext-podcast/radar_data.json";

export const revalidate = 3600; // cache for 1 hour on Vercel

export async function GET() {
  try {
    const res = await fetch(GCS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
