import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body?.email ?? "").trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !AUDIENCE_ID) {
      console.error("RESEND_API_KEY or RESEND_AUDIENCE_ID not configured");
      return NextResponse.json({ error: "Subscription service unavailable." }, { status: 503 });
    }

    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Resend returns a specific error when contact already exists — treat as success
    if (message.toLowerCase().includes("already exists")) {
      return NextResponse.json({ success: true });
    }
    console.error("Subscribe error:", message);
    return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
  }
}
