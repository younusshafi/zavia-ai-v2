import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // For now, log to console — in production, replace with:
    // - n8n webhook: fetch("https://n8n.srv956863.hstgr.cloud/webhook/contact", { method: "POST", body: JSON.stringify(body) })
    // - Or SendGrid/Resend email API
    console.log("Contact form submission:", { name, email, company, type, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
