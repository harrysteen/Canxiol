import PsychiatristInquiryProvider from '../PsychiatristInquiryProvider';
import CanxiolNavbar from '../CanxiolNavbar';
import ProHero from './ProHero';
import CanxiolAnxietySection from '../CanxiolAnxietySection';
import CanxiolStatsSection from '../CanxiolStatsSection';
import CanxiolGettingHelpSection from '../CanxiolGettingHelpSection';
import CanxiolMeetSection from '../CanxiolMeetSection';
import CanxiolKnowMoreSection from '../CanxiolKnowMoreSection';
import CanxiolBlogSection from '../CanxiolBlogSection';
import CanxiolPerspectiveSection from '../CanxiolPerspectiveSection';
import CanxiolInfoBar from '../CanxiolInfoBar';
import ProFooter from './ProFooter';
import { ROLES } from '../auth/roles';

// Home page an approved professional sees after logging in — the product-focused Canxiol home.
// Shared by the pharmacist and psychiatrist portals; the navbar differs slightly per role.
export default function ProHome({ role }) {
  const base = ROLES[role].base;
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar variant="classic" homeHref={base} />
        <ProHero role={role} />
        <CanxiolAnxietySection />
        <CanxiolStatsSection />
        <CanxiolGettingHelpSection />
        <CanxiolMeetSection />
        <CanxiolKnowMoreSection />
        <CanxiolBlogSection />
        <CanxiolPerspectiveSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <ProFooter homeHref={base} />
      </main>
    </PsychiatristInquiryProvider>
  );
}
