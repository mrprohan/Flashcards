
import { NextResponse } from 'next/server';
import { auth } from 'firebase-admin';
import { initAdmin } from '../../lib/firebase-admin';

initAdmin();

export async function POST(request) {
  try {
    const { clerkUserId } = await request.json();

    // Generate a Firebase custom token
    const firebaseToken = await auth().createCustomToken(clerkUserId);

    return NextResponse.json({ firebaseToken });
  } catch (error) {
    console.error('Error creating Firebase token:', error);
    return NextResponse.json({ error: 'Failed to create Firebase token' }, { status: 500 });
  }
}