import AuthPageShell from '../../../components/auth/AuthPageShell';
import AuthForm from '../../../components/auth/AuthForm';

export const metadata = {
  title: 'Pharmacist Sign Up — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

export default function PharmacistSignupPage() {
  return (
    <AuthPageShell bare>
      <AuthForm mode="signup" role="pharmacist" />
    </AuthPageShell>
  );
}
