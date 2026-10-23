// The two professional portals. Patients / general public never need an account.
// Each role has its own login, sign-up and portal pages, but shares one Firebase project:
// the role is stored on the user's profile (Firestore users/{uid}.role).
export const ROLES = {
  psychiatrist: {
    id: 'psychiatrist',
    label: 'Psychiatrist',
    base: '/psychiatrist',
    registrationLabel: 'Medical council registration number',
    registrationPlaceholder: 'NMC / State Medical Council reg. no.',
    councilPlaceholder: 'e.g. Telangana State Medical Council',
    namePlaceholder: 'Dr. Rajesh Mehra',
  },
  pharmacist: {
    id: 'pharmacist',
    label: 'Pharmacist',
    base: '/pharmacist',
    registrationLabel: 'Pharmacy council registration number',
    registrationPlaceholder: 'State Pharmacy Council reg. no.',
    councilPlaceholder: 'e.g. Telangana State Pharmacy Council',
    namePlaceholder: 'Priya Sharma',
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
    'permission-denied': 'Your details could not be saved. Please contact us so we can complete your registration.',
  };
  return messages[code] || 'Something went wrong. Please try again.';
}
