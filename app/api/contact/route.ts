import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    // In production, forward to an email service here
    console.log("Contact form submission:", { name, email, phone, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
