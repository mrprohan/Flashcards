// app/api/update-subscription/route.js
import { NextResponse } from 'next/server';
import { initAdmin } from '../../lib/firebase-admin';

export async function GET(request) {
  return handleUpdateSubscription(request);
}

export async function POST(request) {
  return handleUpdateSubscription(request);
}

async function handleUpdateSubscription(request) {
  let userId, planType;

  if (request.method === 'GET') {
    const { searchParams } = new URL(request.url);
    userId = searchParams.get('userId');
    planType = searchParams.get('planType');
  } else if (request.method === 'POST') {
    const body = await request.json();
    userId = body.userId;
    planType = body.planType;
  }

  if (!userId || !planType) {
    return NextResponse.json({ error: 'Missing userId or planType' }, { status: 400 });
  }

  try {
    const admin = initAdmin();
    const db = admin.firestore();
    
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      subscriptionStatus: planType,
      subscriptionDate: new Date().toISOString()
    });

    // Use a fallback URL if the origin is not available
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'https://flashcards-virid-five.vercel.app/';
    const redirectUrl = new URL('/home', origin).toString();

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription', details: error.message }, { status: 500 });
  }
}