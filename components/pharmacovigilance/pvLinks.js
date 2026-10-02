// Reporting documents on the /pharmacovigilance page.
// Replace the '#' placeholders with the real PDF paths (e.g. '/docs/adr-form-hindi.pdf').
export const PV_LINKS = {
  // Patient (consumer) ADR reporting forms — shown in this order, two per row
  patientFormsByLanguage: {
    Assamese: '#',
    Bengali: '#',
    Gujarati: '#',
    Hindi: '#',
    Kannada: '#',
    Malayalam: '#',
    Marathi: '#',
    Odia: '#',
    Tamil: '#',
    Telugu: '#',
  },
  // Psychiatrist ADR form (IPC Version 1.4) and its guidance page
  adrForm: '#',
  adrInfo: '#',
  // Indian Pharmacopoeia Commission — PvPI portal and its ADR reporting forms
  ipcPortal: 'https://www.ipc.gov.in/',
  ipcAdrForms: 'https://www.ipc.gov.in/',
};

// Leiutis safety inbox and phone, and the national PvPI toll-free line
export const PV_RECIPIENT_EMAIL = 'write@canxiol.com';
export const PV_PHONE = '+91 40 23077365';
export const PVPI_TOLL_FREE = '1800-180-3024';
