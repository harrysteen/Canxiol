import CanxiolNavbar from '../CanxiolNavbar';
import CanxiolFooter from '../CanxiolFooter';

// Navbar + soft background + footer around the login / sign-up / portal cards
export default function AuthPageShell({ children }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAF8F7', '--cx-infobar-h': '0px' }}>
      <CanxiolNavbar />
      <section className="cx-auth-section">
        <div className="container">{children}</div>
      </section>
      <CanxiolFooter />
    </main>
  );
}
