import { NextResponse } from "next/server";
import { createExhibition } from "@/actions/getPrivate";

export async function POST(req: Request) {
  try {
    const { name, random } = await req.json();

    if (!name || !random) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const address = await createExhibition(name, random);

    return NextResponse.json({ success: true, data: { address }, error: null });
  } catch (err: any) {
    console.error("CreateExhibition Error:", err);
    return NextResponse.json(
      { success: false, data: null, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
