import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, company, phone, service, message } = data;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.contactSubmission.create({
      data: { name, email, company, phone, service, message },
    });

    if (resend) {
      await resend.emails.send({
        from: "U-Class Cargo <onboarding@resend.dev>",
        to: "uclasscargologistics@ukr.net",
        replyTo: email,
        subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
            <h2 style="color:#0a1628;margin-bottom:4px">New Contact Form Submission</h2>
            <p style="color:#6a80a0;font-size:13px;margin-top:0">U-Class Cargo Logistics website</p>
            <hr style="border:none;border-top:1px solid #e2e8f4;margin:20px 0"/>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="color:#6a80a0;padding:6px 0;width:130px">Name</td><td style="color:#0a1628;font-weight:600">${name}</td></tr>
              <tr><td style="color:#6a80a0;padding:6px 0">Email</td><td><a href="mailto:${email}" style="color:#0055ff">${email}</a></td></tr>
              ${company ? `<tr><td style="color:#6a80a0;padding:6px 0">Company</td><td style="color:#0a1628">${company}</td></tr>` : ""}
              ${phone ? `<tr><td style="color:#6a80a0;padding:6px 0">Phone</td><td style="color:#0a1628">${phone}</td></tr>` : ""}
              ${service ? `<tr><td style="color:#6a80a0;padding:6px 0">Service</td><td style="color:#0a1628">${service}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f4;margin:20px 0"/>
            <p style="color:#6a80a0;font-size:13px;margin-bottom:6px">Message</p>
            <p style="color:#0a1628;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p>
            <hr style="border:none;border-top:1px solid #e2e8f4;margin:20px 0"/>
            <p style="color:#a0b0c8;font-size:11px">Reply directly to this email to respond to ${name}.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
