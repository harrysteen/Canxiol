import AuthPageShell from '../../../components/auth/AuthPageShell';
import AuthForm from '../../../components/auth/AuthForm';

export const metadata = {
  title: 'Psychiatrist Registration — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

export default function PsychiatristSignupPage() {
  return (
    <AuthPageShell bare>
      <AuthForm mode="signup" role="psychiatrist" />
    </AuthPageShell>
  );
}
