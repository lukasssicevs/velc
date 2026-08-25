import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAILS = ["dan.kalnins@gmail.com", "lukass.sicevs@gmail.com"];
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "VELC Agency <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const buildType = typeof body.buildType === "string" ? body.buildType.trim() : "";
  const platform = typeof body.platform === "string" ? body.platform.trim() : "";
  const timeframe = typeof body.timeframe === "string" ? body.timeframe.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const rows: [string, string][] = [
    ["From", email],
    ["What they're trying to build", buildType || "—"],
    ["Platform", platform || "—"],
    ["Timeframe", timeframe || "—"],
    ["Approximate budget", budget || "—"],
  ];

  const textBody = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    details || "(no additional details)",
  ].join("\n");

  const htmlBody = `
    <table style="font-family: sans-serif; font-size: 14px; border-collapse: collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding: 4px 12px 4px 0; color: #6E6E6B;">${escapeHtml(
              label
            )}</td><td style="padding: 4px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family: sans-serif; font-size: 14px; white-space: pre-wrap; margin-top: 16px;">${escapeHtml(
      details || "(no additional details)"
    )}</p>
  `;

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAILS,
      replyTo: email,
      subject: "New project inquiry — VELC",
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
