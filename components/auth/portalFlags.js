// Pharmacist portal on/off. While false:
//   - the Pharmacist options are hidden (welcome pop-up, home "Choose Your Path",
//     the "Pharmacist portal" link on the psychiatrist login page)
//   - every /pharmacist page (portal, login, sign-up) redirects to the home page (middleware.js)
// Set to true to bring the pharmacist portal back.
export const PHARMACIST_PORTAL_ENABLED = false;
