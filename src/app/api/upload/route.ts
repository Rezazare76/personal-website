import { NextRequest, NextResponse } from "next/server";

import { errorResponse } from "@/types/api";

export async function POST(req: NextRequest) {
  const formDataReq = await req.formData();
  const file = formDataReq.get("file") as Blob;
  const formId = formDataReq.get("formId") as string;
  const formFileId = formDataReq.get("formFileId") as string;
  if (!file || !formId || !formFileId)
    return NextResponse.json({ error: "اطلاعات اشتباه است" }, { status: 400 });

  try {
    let response: NextResponse;
    const formData = new FormData();
    formData.append("file", file);
    const uploadResponse = await fetch(
      `https://formapi.pod.ir/responses/${formId}/field/${formFileId}`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!uploadResponse.ok) {
      const error: errorResponse = await uploadResponse.json();
      response = NextResponse.json(
        {
          error: error.message,
        },
        { status: error.status || 400 },
      );
      return response;
    }
    const data = await uploadResponse.text();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
