'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Public web config from .env.local (safe to ship to the browser — access is
// controlled by Firebase Auth and the Firestore rules in /firestore.rules)
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Created on first use, in the browser only
function app() {
  return getApps().length ? getApp() : initializeApp(config);
}

export const firebaseAuth = () => getAuth(app());
export const firestore = () => getFirestore(app());

// A second, separate connection used only on the team page to create a psychiatrist's
// login. Creating an account signs that account in, so it happens here instead of on the
// main connection — the team member stays logged in.
const PROVISIONING = 'provisioning';
export const provisioningAuth = () =>
  getAuth(getApps().find((a) => a.name === PROVISIONING) || initializeApp(config, PROVISIONING));
