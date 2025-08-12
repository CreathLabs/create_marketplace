import { NextResponse } from "next/server";
import { MintAndList } from "@/actions/getPrivate";

export async function POST(req: Request) {
  try {
    const { tokenURI, artistWallet, floor_price } = await req.json();

    if (!tokenURI || !artistWallet || floor_price == null) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const nft_id = await MintAndList(tokenURI, artistWallet, floor_price);

    return NextResponse.json({ success: true, data: { nft_id }, error: null });
  } catch (err: any) {
    console.error("MintAndList Error:", err);
    return NextResponse.json(
      { success: false, data: null, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
