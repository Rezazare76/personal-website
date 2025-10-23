import { NextRequest, NextResponse } from "next/server";

import { SsrFetch } from "@/lib/ssrFetch";

import { responseTemplate } from "./data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { form, formId } = body;
  if (!form || !formId)
    return NextResponse.json({ error: "اطلاعات اشتباه است" }, { status: 400 });
  try {
    const { error, status } = await SsrFetch({
      url: `https://formapi.pod.ir/responses/${formId}`,
      method: "POST",
      body: responseTemplate(form),
    });
    if (error) {
      return NextResponse.json(
        { message: error?.message || error.error },
        { status: status },
      );
    }
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
