
import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox // Use Environment.Production for live transactions
});

export async function POST(request) {
  try {
    const { planType, userId } = await request.json();

    const amount = planType === 'pro' ? 18 : 0; // $0.18 for Pro plan
    const currencyCode = 'USD';

    const { result: { locations } } = await squareClient.locationsApi.listLocations();
    
    if (!locations || locations.length === 0) {
      throw new Error('No locations found for this Square account');
    }

    const locationId = locations[0].id;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flashcards-virid-five.vercel.app/';
    const redirectUrl = new URL(`/api/update-subscription?userId=${userId}&planType=${planType}`, baseUrl).toString();

    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: `${userId}-${Date.now()}`,
      quickPay: {
        name: `DoughLingo ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
        priceMoney: {
          amount,
          currency: currencyCode,
        },
        locationId,
      },
      checkoutOptions: {
        redirectUrl,
      },
    });

    if (response.result.paymentLink) {
      return NextResponse.json({ checkoutUrl: response.result.paymentLink.url });
    } else {
      throw new Error('Failed to create payment link');
    }
  } catch (error) {
    console.error('Square API error:', error);
    return NextResponse.json({ error: 'Failed to create payment', details: error.message }, { status: 500 });
  }
}