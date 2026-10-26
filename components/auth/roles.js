// The two professional portals. Patients / general public never need an account.
// Each role has its own login, sign-up and portal pages, but shares one Firebase project:
// the role is stored on the user's profile (Firestore users/{uid}.role).
export const ROLES = {
  psychiatrist: {
    id: 'psychiatrist',
    label: 'Psychiatrist',
    base: '/psychiatrist',
    // Sign-up: both optional
    workplaceLabel: 'Hospital / Clinic',
    workplacePlaceholder: 'Hospital or clinic name (not mandatory)',
    registrationLabel: 'Medical Council Registration Number',
    registrationPlaceholder: 'Your registration number (not mandatory)',
  },
  pharmacist: {
    id: 'pharmacist',
    label: 'Pharmacist',
    base: '/pharmacist',
    // Sign-up: both optional
    workplaceLabel: 'Pharmacy / Workplace',
    workplacePlaceholder: 'Pharmacy or workplace name (not mandatory)',
    registrationLabel: 'State Pharmacy Council Registration Number',
    registrationPlaceholder: 'Your registration number (not mandatory)',
  },
};

export const otherRole = (id) => (id === 'psychiatrist' ? ROLES.pharmacist : ROLES.psychiatrist);

// Friendlier messages for the Firebase error codes visitors are likely to hit
export function authErrorMessage(err) {
  const code = err?.code || '';
  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists. Please log in instead.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/user-not-found': 'Incorrect email or password.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Please choose a stronger password (at least 8 characters).',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'permission-denied': 'Your registration could not be completed. Please try again in a moment, or contact us if it keeps happening.',
  };
  return messages[code] || 'Something went wrong. Please try again.';
}
