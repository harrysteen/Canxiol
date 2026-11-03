// Reporting documents on the /pharmacovigilance page.
// Replace the '#' placeholders with the real PDF paths. Patient forms are the official
// IPC/PvPI consumer ADR forms hosted on ipc.gov.in (they open in a new tab).
export const PV_LINKS = {
  // Patient (consumer) ADR reporting forms — shown in this order, two per row
  patientFormsByLanguage: {
    Assamese: 'https://www.ipc.gov.in/images/pdf/File491.pdf',
    Bengali: 'https://www.ipc.gov.in/images/pdf/File341.pdf',
    Gujarati: 'https://www.ipc.gov.in/images/pdf/File336.pdf',
    Hindi: 'https://www.ipc.gov.in/images/pdf/File335.pdf',
    Kannada: 'https://www.ipc.gov.in/images/pdf/File337.pdf',
    Malayalam: 'https://www.ipc.gov.in/images/pdf/File338.pdf',
    Marathi: 'https://www.ipc.gov.in/images/pdf/File492.pdf',
    Odia: 'https://www.ipc.gov.in/images/pdf/File339.pdf',
    Tamil: 'https://www.ipc.gov.in/images/pdf/File340.pdf',
    Telugu: 'https://www.ipc.gov.in/images/pdf/File493.pdf',
  },
  // Psychiatrist ADR form (IPC Version 1.4) and its guidance page
  adrForm: '#',
  adrInfo: '#',
  // Indian Pharmacopoeia Commission — PvPI portal and its ADR reporting forms
  ipcPortal: 'https://www.ipc.gov.in/',
  ipcAdrForms: 'https://www.ipc.gov.in/',
};

// Leiutis safety inbox and phone, and the national PvPI toll-free line
export const PV_RECIPIENT_EMAIL = 'write@leiutis.com';
export const PV_PHONE = '+91 40 23077365';
export const PVPI_TOLL_FREE = '1800-180-3024';
