import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
