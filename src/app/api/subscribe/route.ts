import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CYBER_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? "";
const AI_AUDIENCE_ID = process.env.AI_RESEND_AUDIENCE_ID ?? "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HEADER_BANNER_URL = "https://storage.googleapis.com/cleartext-podcast/cleartext_email_header.png";
const RADAR_SCREENSHOT_URL = "https://storage.googleapis.com/cleartext-podcast/cleartext_radar_screenshot.png";

// ── Cyber welcome email ────────────────────────────────────────────────────────
const CYBER_WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="display:none;font-size:1px;color:#0f172a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    Welcome to Cleartext — your daily cybersecurity briefing for CISOs and security leaders starts tomorrow morning.
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="padding:16px 0 12px;text-align:center;">
              <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:#22d3ee;text-transform:uppercase;margin-bottom:2px;">Cleartext</div>
              <div style="font-size:13px;color:#94a3b8;font-weight:500;">Daily Cybersecurity Briefing</div>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:28px;border-bottom:1px solid #1e293b;">
              <a href="https://cleartext.fm" style="display:block;text-decoration:none;">
                <img src="${HEADER_BANNER_URL}" alt="Cleartext — Daily Cybersecurity Briefing" width="600" style="display:block;width:100%;max-width:600px;border-radius:12px;border:0;" />
              </a>
            </td>
          </tr>

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

// ── AI Revolution welcome email ────────────────────────────────────────────────
const AI_WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'IBM Plex Mono',-apple-system,BlinkMacSystemFont,monospace;">
  <div style="display:none;font-size:1px;color:#080808;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    Welcome to cleartext:AI — your daily briefing on frontier models, research breakthroughs, and the infrastructure powering it all.
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td style="padding:24px 0 20px;text-align:center;border-bottom:1px solid #1a1a1a;">
              <div style="font-size:22px;font-weight:700;letter-spacing:-.01em;color:#e8e8e8;font-family:'IBM Plex Mono',monospace;">
                cleartext<span style="color:#00ff87;">:AI</span><span style="color:#00ff87;">_</span>
              </div>
              <div style="font-size:11px;font-weight:600;letter-spacing:.1em;color:#00ff87;text-transform:uppercase;margin-top:6px;">
                Daily AI Briefing
              </div>
            </td>
          </tr>

          <!-- You're in -->
          <tr>
            <td style="padding:28px 0 20px;">
              <div style="font-size:26px;font-weight:800;color:#e8e8e8;line-height:1.3;margin-bottom:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                You&rsquo;re in. 🎉
              </div>
              <p style="margin:0 0 14px;font-size:15px;color:#888;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Every weekday morning you&rsquo;ll get the cleartext:AI briefing in your inbox &mdash; frontier model releases, research breakthroughs, and the infrastructure developments shaping where AI is going.
              </p>
              <p style="margin:0;font-size:15px;color:#888;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                Synthesized from MIT Technology Review, VentureBeat, Ars Technica, The Decoder, Hugging Face, and more &mdash; the real signal, without the hype.
              </p>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td style="padding:20px 0 24px;border-top:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;">
              <div style="font-size:11px;font-weight:700;letter-spacing:.1em;color:#555;text-transform:uppercase;margin-bottom:14px;">
                What you&rsquo;ll get
              </div>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#00ff87;font-family:monospace;margin-right:10px;">▸</span>
                    <span style="font-size:14px;color:#aaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Frontier model releases &amp; capability benchmarks</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#00ff87;font-family:monospace;margin-right:10px;">▸</span>
                    <span style="font-size:14px;color:#aaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Research breakthroughs explained clearly</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#00ff87;font-family:monospace;margin-right:10px;">▸</span>
                    <span style="font-size:14px;color:#aaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Chips, compute, and data center developments</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="color:#00ff87;font-family:monospace;margin-right:10px;">▸</span>
                    <span style="font-size:14px;color:#aaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Industry moves &amp; AI policy</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="padding:28px 0 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#00ff87;border-radius:10px;">
                    <a href="https://cleartext.fm/?feed=ai" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:700;color:#080808;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                      Listen to the latest episode &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px;border-top:1px solid #1a1a1a;">
              <p style="margin:0;font-size:12px;color:#333;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                You subscribed at <a href="https://cleartext.fm/?feed=ai" style="color:#00ff87;text-decoration:none;">cleartext.fm</a>.
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
    const podcast: string = body?.podcast === "ai" ? "ai" : "cyber";
    const audienceId = podcast === "ai" ? AI_AUDIENCE_ID : CYBER_AUDIENCE_ID;

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !audienceId) {
      console.error(`RESEND_API_KEY or audience ID not configured for podcast=${podcast}`);
      return NextResponse.json({ error: "Subscription service unavailable." }, { status: 503 });
    }

    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    // Send podcast-specific welcome email (best-effort — don't fail the subscribe if this errors)
    try {
      const isAi = podcast === "ai";
      await resend.emails.send({
        from: isAi ? "cleartext:AI <daily@cleartext.fm>" : "Cleartext <daily@cleartext.fm>",
        to: email,
        subject: isAi
          ? "Welcome to cleartext:AI — your daily AI briefing"
          : "Welcome to Cleartext — your daily security briefing",
        html: isAi ? AI_WELCOME_HTML : CYBER_WELCOME_HTML,
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
