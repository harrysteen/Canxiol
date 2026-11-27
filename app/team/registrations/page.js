import AuthPageShell from '../../../components/auth/AuthPageShell';
import TeamRegistrations from '../../../components/team/TeamRegistrations';

// Leiutis team only: review psychiatrist registration requests and create their logins.
export const metadata = {
  title: 'Team — Psychiatrist Registrations | Canxiol',
  robots: { index: false, follow: false },
};

export default function TeamRegistrationsPage() {
  return (
    <AuthPageShell>
      <TeamRegistrations />
    </AuthPageShell>
  );
}
