import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import ContactHero from '../../components/contact/ContactHero';
import ContactChannelsSection from '../../components/contact/ContactChannelsSection';

export const metadata = {
  title: 'Contact Us — Canxiol | Leiutis',
  description: 'Reach the Leiutis team for general enquiries, healthcare partner communications or product support.',
};

export default function ContactPage() {
  return (
    <PsychiatristInquiryProvider>
      {/* No bottom info bar on this page, so the hero takes the full screen height */}
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', '--cx-infobar-h': '0px' }}>
        <CanxiolNavbar />
        <ContactHero />
        <ContactChannelsSection />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
