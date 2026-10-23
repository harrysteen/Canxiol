'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../../lib/firebase';

// Signed-in user plus their Firestore profile (users/{uid}), kept live so an
// approval shows up without a refresh.
// profile: undefined = still loading, null = no profile document, object = profile
export function useAuthProfile() {
  const [user, setUser] = useState(undefined);
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    let stopProfile = () => {};
    const stopAuth = onAuthStateChanged(firebaseAuth(), (u) => {
      stopProfile();
      setUser(u);
      if (!u) {
        setProfile(null);
        return;
      }
      setProfile(undefined);
      stopProfile = onSnapshot(
        doc(firestore(), 'users', u.uid),
        (snap) => setProfile(snap.exists() ? snap.data() : null),
        () => setProfile(null)
      );
    });
    return () => {
      stopProfile();
      stopAuth();
    };
  }, []);

  const loading = user === undefined || (user && profile === undefined);
  return { user, profile, loading };
}
