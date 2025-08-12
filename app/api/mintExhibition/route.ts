import { NextResponse } from "next/server";
import { MintExhibition } from "@/actions/getPrivate";

export async function POST(req: Request) {
  try {
    const { tokenURI, artistWallet, floor_price, exhibition_address } = await req.json();

    if (!tokenURI || !artistWallet || floor_price == null || !exhibition_address) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const nft_id = await MintExhibition(tokenURI, artistWallet, floor_price, exhibition_address);

    return NextResponse.json({ success: true, data: { nft_id }, error: null });
  } catch (err: any) {
    console.error("MintExhibition Error:", err);
    return NextResponse.json(
      { success: false, data: null, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
