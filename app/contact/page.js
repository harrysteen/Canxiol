import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
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
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <ContactHero />
        <ContactChannelsSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
