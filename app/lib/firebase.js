// app/lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTfbmsOARYVm3XXvf-eD9gJxagEFfHfZY",
  authDomain: "autho-94a3e.firebaseapp.com",
  projectId: "autho-94a3e",
  storageBucket: "autho-94a3e.appspot.com",
  messagingSenderId: "556228833661",
  appId: "1:556228833661:web:555c43518f15dbfe49dc14",
  measurementId: "G-NYTT3EMDCR",
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);
export const auth = getAuth(firebase_app);

export const signInWithClerk = async (clerkUser) => {
  try {
    // Call your backend to get a Firebase custom token
    const response = await fetch('/api/get-firebase-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clerkUserId: clerkUser.id }),
    });

    if (!response.ok) {
      throw new Error('Failed to get Firebase token');
    }

    const { firebaseToken } = await response.json();

    // Sign in to Firebase with the custom token
    await signInWithCustomToken(auth, firebaseToken);

    console.log('Signed in to Firebase successfully');
  } catch (error) {
    console.error('Error signing in to Firebase:', error);
  }
};