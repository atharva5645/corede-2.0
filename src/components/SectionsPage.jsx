import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BrochureModal from './BrochureModal';
import QuoteModal from './QuoteModal';
import WhatsAppButton from './WhatsAppButton';
import ServicesSection from './ServicesSection';
import CareersSection from './CareersSection';
import InternshipSection from './InternshipSection';
import WorkshopSection from './WorkshopSection';

const SECTIONS = ['services', 'careers', 'internship', 'workshop'];

export default function SectionsPage({ defaultSection = 'services' }) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const observerRef = useRef(null);
  const scrolledRef = useRef(false);

  // Inject Cashfree globals placeholder (user must set CASHFREE_APP_ID via env)
  useEffect(() => {
    if (!window.CASHFREE_APP_ID) window.CASHFREE_APP_ID = '';
    if (!window.CASHFREE_MODE) window.CASHFREE_MODE = 'production';
  }, []);

  // Scroll to default section on mount
  useEffect(() => {
    if (!scrolledRef.current) {
      scrolledRef.current = true;
      // Also check URL hash override
      const hash = window.location.hash.replace('#', '');
      const target = (hash && SECTIONS.includes(hash)) ? hash : defaultSection;
      setActiveSection(target);
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
    }
  }, [defaultSection]);

  // IntersectionObserver to sync sticky nav highlight with scroll position
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', '#' + id);
  };

  return (
    <div className="app-layout">
      <Navbar
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Sticky Section Navigation Bar */}
      <nav className="section-nav" id="sectionNav" aria-label="Page Sections">
        <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>💻 Services</a>
        <a href="#careers"  className={activeSection === 'careers'  ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('careers'); }}>💼 Careers</a>
        <a href="#internship" className={activeSection === 'internship' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('internship'); }}>🚀 Internship</a>
        <a href="#workshop"  className={activeSection === 'workshop'  ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('workshop'); }}>🎓 Workshop</a>
      </nav>

      {/* All Four Sections */}
      <main>
        <ServicesSection />
        <div className="section-divider"></div>
        <CareersSection />
        <div className="section-divider"></div>
        <InternshipSection />
        <div className="section-divider"></div>
        <WorkshopSection />
      </main>

      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Footer
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />
      <WhatsAppButton />
    </div>
  );
}
