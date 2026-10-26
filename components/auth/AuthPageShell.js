import CanxiolNavbar from '../CanxiolNavbar';
import CanxiolFooter from '../CanxiolFooter';

// Navbar + soft background + footer around the portal status cards.
// bare: the children bring their own sections (login / sign-up page)
export default function AuthPageShell({ children, bare = false }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAF8F7', '--cx-infobar-h': '0px' }}>
      <CanxiolNavbar />
      {bare ? (
        children
      ) : (
        <section className="cx-auth-section">
          <div className="container">{children}</div>
        </section>
      )}
      <CanxiolFooter />
    </main>
  );
}
