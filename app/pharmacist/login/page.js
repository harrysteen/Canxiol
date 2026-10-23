import AuthPageShell from '../../../components/auth/AuthPageShell';
import AuthForm from '../../../components/auth/AuthForm';

export const metadata = {
  title: 'Pharmacist Log in — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

export default function PharmacistLoginPage() {
  return (
    <AuthPageShell>
      <AuthForm mode="login" role="pharmacist" />
    </AuthPageShell>
  );
}
