import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "";
const SECONDARY_COMPANY_EMAIL = process.env.NEXT_PUBLIC_SECONDARY_COMPANY_EMAIL || "";

const NOTIFICATION_EMAILS = [COMPANY_EMAIL, SECONDARY_COMPANY_EMAIL].filter(Boolean);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await req.json();

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const { error } = await resend.emails.send({
      from: `Tot Spot Contact Web Message <${COMPANY_EMAIL}>`,
      to: NOTIFICATION_EMAILS,
      subject: `${firstName} ${lastName} - ${subject || "New message"}`,
      replyTo: email,
      html,
    });

    if (error) {
      console.error("❌ Resend Email Error:", error);
      return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}