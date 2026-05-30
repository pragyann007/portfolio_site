// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, type, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const typeLabels: Record<string, string> = {
      project:   'Project / Freelance',
      fulltime:  'Full-time Role',
      collab:    'Open Source / Collab',
      codeghar:  'CodeGhar / Teaching',
      other:     'Just saying hi',
    }
    const typeLabel = typeLabels[type] || type

    // ── 1. Notify YOU (the owner) ──────────────────────────────────────────
    await resend.emails.send({
      from:    'Contact Form <onboarding@resend.dev>', // change to your verified domain later
      to:      ['pragyanthapaliya2007@gmail.com'],
      replyTo: email,
      subject: `[pragyann.com.np] New message from ${name} — ${typeLabel}`,
      html: ownerEmailHtml({ name, email, type: typeLabel, message }),
    })

    // ── 2. Auto-reply to the sender ────────────────────────────────────────
    await resend.emails.send({
      from:    'Pragyan Thapaliya <onboarding@resend.dev>', // change after domain verification
      to:      [email],
      subject: `Got your message, ${name.split(' ')[0]}!`,
      html: autoReplyHtml({ name }),
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[contact/route] Error:', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }
}

// ── Email templates ────────────────────────────────────────────────────────

function ownerEmailHtml({
  name,
  email,
  type,
  message,
}: {
  name: string
  email: string
  type: string
  message: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:10px;">
                      <div style="width:32px;height:32px;background:#00ff8815;border:1px solid #00ff8840;border-radius:8px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:32px;">
                        <span style="color:#00ff88;font-weight:700;font-size:14px;font-family:monospace;">P</span>
                      </div>
                      <span style="color:#ffffff;font-weight:700;font-size:16px;letter-spacing:-0.3px;">Pragyan<span style="color:#00ff88;">.</span></span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="color:#444;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;">New Message</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#111111;border:1px solid #1f1f1f;border-radius:16px;padding:36px;">

              <!-- Type badge -->
              <div style="display:inline-block;padding:4px 12px;background:#00ff8810;border:1px solid #00ff8830;border-radius:100px;margin-bottom:24px;">
                <span style="color:#00ff88;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;">${type}</span>
              </div>

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;border-bottom:1px solid #1a1a1a;">
                    <span style="color:#555;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;display:block;margin-bottom:6px;">From</span>
                    <span style="color:#ffffff;font-size:15px;font-weight:500;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="color:#555;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;display:block;margin-bottom:6px;">Email</span>
                    <a href="mailto:${email}" style="color:#00ff88;font-size:14px;text-decoration:none;font-family:monospace;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;">
                    <span style="color:#555;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;display:block;margin-bottom:12px;">Message</span>
                    <p style="color:#cccccc;font-size:14px;line-height:1.8;margin:0;font-weight:300;">${message.replace(/\n/g, '<br/>')}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <div style="margin-top:32px;padding-top:24px;border-top:1px solid #1a1a1a;">
                <a href="mailto:${email}?subject=Re: Your message on pragyann.com.np"
                  style="display:inline-block;background:#00ff88;color:#000000;font-weight:700;font-size:13px;padding:12px 24px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">
                  Reply to ${name.split(' ')[0]} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <span style="color:#333;font-size:11px;font-family:monospace;">Sent via pragyann.com.np contact form</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

function autoReplyHtml({ name }: { name: string }) {
  const firstName = name.split(' ')[0]
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Got your message!</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px;text-align:center;">
              <div style="display:inline-block;width:48px;height:48px;background:#00ff8812;border:1px solid #00ff8840;border-radius:50%;text-align:center;line-height:48px;">
                <span style="color:#00ff88;font-size:22px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#111111;border:1px solid #1f1f1f;border-radius:16px;padding:40px 36px;text-align:center;">
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 12px;letter-spacing:-0.5px;">
                Message received, ${firstName}!
              </h1>
              <p style="color:#666;font-size:14px;line-height:1.8;margin:0 0 28px;font-weight:300;max-width:400px;margin-left:auto;margin-right:auto;">
                Thanks for reaching out. I read every message personally and will get back to you as soon as I can — usually within a day or two.
              </p>

              <!-- Divider -->
              <div style="width:40px;height:1px;background:linear-gradient(to right, transparent, #00ff8840, transparent);margin:0 auto 28px;"></div>

              <p style="color:#555;font-size:13px;line-height:1.7;margin:0 0 32px;font-weight:300;">
                While you wait, feel free to check out what I've been building at <a href="https://www.instagram.com/codeghar/" style="color:#00ff88;text-decoration:none;">@codeghar</a> or read some of my <a href="https://pragyann.com.np/blogs" style="color:#00ff88;text-decoration:none;">blog posts</a>.
              </p>

              <a href="https://pragyann.com.np"
                style="display:inline-block;border:1px solid #00ff8840;color:#00ff88;font-size:12px;font-family:monospace;padding:10px 22px;border-radius:8px;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                Visit pragyann.com.np
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <span style="color:#2a2a2a;font-size:11px;font-family:monospace;">— Pragyan Thapaliya · Kathmandu, Nepal</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}