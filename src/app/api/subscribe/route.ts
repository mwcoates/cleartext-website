import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HEADER_BANNER_URL = "https://storage.googleapis.com/cleartext-podcast/cleartext_email_header.png";
const RADAR_SCREENSHOT_URL = "https://storage.googleapis.com/cleartext-podcast/cleartext_radar_screenshot.png";

const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <!-- Hidden preheader -->
  <div style="display:none;font-size:1px;color:#0f172a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    Welcome to Cleartext — your daily cybersecurity briefing for CISOs and security leaders starts tomorrow morning.
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td style="padding:16px 0 12px;text-align:center;">
              <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:#22d3ee;text-transform:uppercase;margin-bottom:2px;">Cleartext</div>
              <div style="font-size:13px;color:#94a3b8;font-weight:500;">Daily Cybersecurity Briefing</div>
            </td>
          </tr>

          <!-- Header banner -->
          <tr>
            <td style="padding-bottom:28px;border-bottom:1px solid #1e293b;">
              <a href="https://cleartext.fm" style="display:block;text-decoration:none;">
                <img src="${HEADER_BANNER_URL}" alt="Cleartext — Daily Cybersecurity Briefing" width="600" style="display:block;width:100%;max-width:600px;border-radius:12px;border:0;" />
              </a>
            </td>
          </tr>

          <!-- You're in -->
          <tr>
            <td style="padding:28px 0 20px;">
              <div style="font-size:28px;font-weight:800;color:#f8fafc;line-height:1.3;margin-bottom:16px;">
                You&rsquo;re in. 🎉
              </div>
              <p style="margin:0 0 14px;font-size:16px;color:#94a3b8;line-height:1.6;">
                Every weekday morning you&rsquo;ll get the Cleartext daily briefing in your inbox &mdash; the top security stories, what they mean for CISOs, and links to go deeper.
              </p>
              <p style="margin:0;font-size:16px;color:#94a3b8;line-height:1.6;">
                Synthesized from 16 leading publications including Krebs, Wired, BleepingComputer, and CISA &mdash; so you don&rsquo;t have to read them all.
              </p>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0e7490;border-radius:10px;">
                    <a href="https://cleartext.fm" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:700;color:#f8fafc;text-decoration:none;">
                      Visit Cleartext &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Radar preview -->
          <tr>
            <td style="padding:24px 0;border-top:1px solid #1e293b;">
              <div style="font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px;">
                Global Threat Radar
              </div>
              <div style="font-size:14px;color:#94a3b8;margin-bottom:16px;line-height:1.5;">
                Cleartext tracks 30 days of global cybersecurity incidents on an interactive threat map &mdash; updated daily.
              </div>
              <a href="https://cleartext.fm" style="display:block;text-decoration:none;">
                <img src="${RADAR_SCREENSHOT_URL}" alt="Global Threat Radar — 30-day cybersecurity incident map" width="600" style="display:block;width:100%;max-width:600px;border-radius:10px;border:1px solid #1e293b;" />
              </a>
              <div style="margin-top:10px;text-align:center;">
                <a href="https://cleartext.fm" style="font-size:13px;color:#22d3ee;text-decoration:none;font-weight:600;">Explore the live threat radar →</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;border-top:1px solid #1e293b;">
              <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">
                You subscribed at <a href="https://cleartext.fm" style="color:#22d3ee;text-decoration:none;">cleartext.fm</a>.
                You can unsubscribe at any time from any email we send.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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

    // Send welcome email (best-effort — don't fail the subscribe if this errors)
    try {
      await resend.emails.send({
        from: "Cleartext <daily@cleartext.fm>",
        to: email,
        subject: "Welcome to Cleartext — your daily security briefing",
        html: WELCOME_HTML,
      });
    } catch (emailErr) {
      console.error("Welcome email failed (non-fatal):", emailErr);
    }

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
