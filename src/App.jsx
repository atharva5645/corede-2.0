import Navbar from './components/Navbar/Navbar';
import TopBanner from './components/TopBanner/TopBanner';
import Hero from './components/Hero/Hero';
import HighlightStrip from './components/HighlightStrip/HighlightStrip';
import Tracks from './components/Tracks/Tracks';
import Curriculum from './components/Curriculum/Curriculum';
import LearningJourney from './components/LearningJourney/LearningJourney';
import About from './components/About/About';
import Certifications from './components/Certifications/Certifications';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingCTA from './components/FloatingCTA/FloatingCTA';

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main id="main-content">
        <TopBanner />
        <Hero />
        <HighlightStrip />
        <Tracks />
        <Curriculum />
        <LearningJourney />
        <About />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
