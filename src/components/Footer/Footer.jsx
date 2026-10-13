import { Code2, Heart, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { SITE, TRACKS } from '../../data/siteData';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo" aria-label="The Coding Zone home">
              <div className="footer-logo-badge">
                <img
                  src="/logo.png"
                  alt="The Coding Zone - Think Create Code"
                  className="footer-brand-logo"
                />
              </div>
            </a>
            <p className="footer-brand-bio">
              A premier coding institute in Belagavi, Karnataka dedicated to mentoring Grade 9–12 and Diploma students into proficient software developers through 100% practical, project-based training.
            </p>
            <div className="footer-badge-pill">
              📍 Belagavi, Karnataka – 590005
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#tracks">Course Tracks</a></li>
              <li><a href="#curriculum">15-Module Curriculum</a></li>
              <li><a href="#about">About Founder & Center</a></li>
              <li><a href="#certifications">Certifications & Tools</a></li>
              <li><a href="#testimonials">Student Reviews</a></li>
              <li><a href="#contact">Book Free Demo</a></li>
            </ul>
          </div>

          {/* Tracks */}
          <div className="footer-col">
            <h4 className="footer-heading">Specialized Tracks</h4>
            <ul className="footer-links-list">
              {TRACKS.map(t => (
                <li key={t.id}>
                  <a href="#tracks">
                    <strong>{t.number}:</strong> {t.title}
                  </a>
                </li>
              ))}
              <li><a href="#tracks">Python, Tkinter & GUI Apps</a></li>
              <li><a href="#tracks">Machine Learning & TensorFlow</a></li>
              <li><a href="#tracks">Full-Stack HTML, CSS & JS</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h4 className="footer-heading">Reach Us</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <MapPin size={16} className="text-teal" />
                <span>{SITE.address.line1}, Belgaum – {SITE.address.pin}</span>
              </div>
              <a href={`tel:+91${SITE.phone}`} className="footer-contact-row">
                <Phone size={16} className="text-primary" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="footer-contact-row">
                <Mail size={16} className="text-teal" />
                <span>{SITE.email}</span>
              </a>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-btn"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved. Founded by {SITE.founder.name} ({SITE.founder.credentials}).
          </p>
          <div className="footer-credit">
            <span>Built with care for young creators</span>
            <button
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll to top of page"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
