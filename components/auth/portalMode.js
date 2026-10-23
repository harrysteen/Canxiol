'use client';
import { useEffect, useState } from 'react';

// Remembers, in this browser, that an approved professional is logged in, so every page
// (navbar, footer, home link, welcome popup) can switch to that portal's look without
// loading Firebase on the public pages. It only changes presentation — access to the
// portals themselves is still checked by PortalGate.
const KEY = 'cx-portal-role';
const EVENT = 'cx-portal-role-change';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

// { role, name } or null
function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!saved || Date.now() - saved.at > MAX_AGE_MS) return null;
    return { role: saved.role, name: saved.name || '' };
  } catch {
    return null;
  }
}

export function setPortalRole(role, name = '') {
  try {
    if (role) localStorage.setItem(KEY, JSON.stringify({ role, name, at: Date.now() }));
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked — pages just keep the public look
  }
  window.dispatchEvent(new Event(EVENT));
}

// { role: 'pharmacist' | 'psychiatrist', name } or null
export function usePortalAccount() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const sync = () => setAccount(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return account;
}

// 'pharmacist' | 'psychiatrist' | null
export function usePortalRole() {
  return usePortalAccount()?.role ?? null;
}

// Logs out from any page. Firebase is loaded only now, so public pages stay light.
export async function portalLogOut() {
  setPortalRole(null);
  const [{ signOut }, { firebaseAuth }] = await Promise.all([
    import('firebase/auth'),
    import('../../lib/firebase'),
  ]);
  await signOut(firebaseAuth());
}
