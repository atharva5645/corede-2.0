import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarketEvidence from './components/MarketEvidence';
import ServiceMatrix from './components/ServiceMatrix';
import Methodology from './components/Methodology';
import TechStack from './components/TechStack';
import MobileFirstBanner from './components/MobileFirstBanner';
import PillarDiscovery from './components/PillarDiscovery';
import FaqSection from './components/FaqSection';
import Testimonials from './components/Testimonials';
import ClientLogoMarquee from './components/ClientLogoMarquee';
import Footer from './components/Footer';
import BrochureModal from './components/BrochureModal';
import QuoteModal from './components/QuoteModal';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Floating Pill Navbar matching Image 2 design & Image 1 content */}
      <Navbar onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* Main Base Website Structure with Complete Content from http://127.0.0.1:5000/ */}
      <main className="main-content">
        <Hero 
          onOpenBrochure={() => setIsBrochureOpen(true)} 
          onOpenQuote={() => setIsQuoteOpen(true)}
        />
        <ClientLogoMarquee />
        <MarketEvidence />
        <ServiceMatrix />
        <Methodology />
        <TechStack />
        <MobileFirstBanner onOpenQuote={() => setIsQuoteOpen(true)} />
        <PillarDiscovery onOpenQuote={() => setIsQuoteOpen(true)} />
        <FaqSection />
        <Testimonials />
      </main>

      {/* Global Interactive Brochure Download Modal */}
      <BrochureModal 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
      />

      {/* Global Request a Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      {/* Base Structure Footer */}
      <Footer onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
