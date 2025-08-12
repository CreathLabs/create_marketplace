import { NextResponse } from "next/server";
import { transferArtwork } from "@/actions/getPrivate";

export async function POST(req: Request) {
  try {
    const { exhibition_address, wallet_address, nft_id } = await req.json();

    if (!exhibition_address || !wallet_address || !nft_id) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await transferArtwork(exhibition_address, wallet_address, nft_id);

    return NextResponse.json({ success: true, data: { result }, error: null });
  } catch (err: any) {
    console.error("TransferArtwork Error:", err);
    return NextResponse.json(
      { success: false, data: null, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
