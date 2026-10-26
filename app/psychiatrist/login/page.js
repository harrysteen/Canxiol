import AuthPageShell from '../../../components/auth/AuthPageShell';
import AuthForm from '../../../components/auth/AuthForm';

export const metadata = {
  title: 'Psychiatrist Log in — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

export default function PsychiatristLoginPage() {
  return (
    <AuthPageShell bare>
      <AuthForm mode="login" role="psychiatrist" />
    </AuthPageShell>
  );
}
