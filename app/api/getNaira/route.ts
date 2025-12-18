import { NextResponse } from 'next/server';

const CURRENCY_API_URL = 'https://api.currencyapi.com/v3/latest';

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${CURRENCY_API_URL}?base_currency=USD&currencies=NGN`,
            {
                headers: {
                    apikey: process.env.CURRENCY_API_KEY!,
                },
                // Optional: cache FX rate for 1 hour
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
        }

        const data = await response.json();

        const rate = data.data.NGN.value; // USD → NGN
        const ngnAmount = Math.round(amount * rate);

        return NextResponse.json({
            usdAmount: amount,
            rate,
            ngnAmount,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Currency conversion failed' },
            { status: 500 }
        );
    }
}
