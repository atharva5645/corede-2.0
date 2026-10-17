import React from 'react';
import { Phone, Mail, MapPin, ArrowRight, Download } from 'lucide-react';

export default function Footer({ onOpenBrochure, onOpenQuote }) {
  return (
    <footer className="footer-site-wrap" id="contact" aria-label="Site Footer">
      <div className="clay-container">
        
        {/* Monumental Closing Statement Banner (Clay Signature) */}
        <div className="footer-monumental-callout glass-surface">
          <div className="callout-content-left">
            <span className="clay-eyebrow">LET'S BUILD SOMETHING EXCEPTIONAL</span>
            <h2 className="callout-headline">
              Ready to accelerate your <br />
              <span className="callout-accent">digital growth?</span>
            </h2>
          </div>
          <div className="callout-actions-right">
            <button 
              type="button" 
              className="btn-primary callout-cta-btn"
              onClick={onOpenQuote}
            >
              <span>Request a Quote</span>
              <ArrowRight size={16} />
            </button>
            <button 
              type="button" 
              className="btn-secondary callout-brochure-btn"
              onClick={onOpenBrochure}
            >
              <Download size={14} />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <a href="/" className="footer-brand-logo-link" aria-label="CoreDe Home">
              <img src="/logo.png" alt="CoreDe Logo" className="footer-brand-logo" />
            </a>
            <p className="footer-brand-summary">
              Leading Software Development &amp; Digital Marketing LLP, providing innovative solutions for global clients.
            </p>

            <div className="footer-social-strip">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/corede.co" 
                target="_blank" 
                rel="noreferrer"
                className="social-brand-link" 
                title="Instagram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                  alt="Instagram" 
                  className="social-logo-img" 
                />
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com/@coredeproduction?si=AOtM0aXHtrDuknqD" 
                target="_blank" 
                rel="noreferrer"
                className="social-brand-link" 
                title="YouTube"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
                  alt="YouTube" 
                  className="social-logo-img" 
                />
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61587823431523" 
                target="_blank" 
                rel="noreferrer"
                className="social-brand-link" 
                title="Facebook"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                  alt="Facebook" 
                  className="social-logo-img" 
                />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/corede" 
                target="_blank" 
                rel="noreferrer"
                className="social-brand-link" 
                title="LinkedIn"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                  alt="LinkedIn" 
                  className="social-logo-img" 
                />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/internship">Internship</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
              <li><a href="/refund-policy">Refund Policy</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Services</h4>
            <ul className="footer-nav-list">
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">UI/UX Design</a></li>
              <li><a href="#services">SEO</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Contact</h4>
            <div className="footer-contact-items">
              <p className="contact-line">
                <Phone size={14} className="contact-icon text-blue" />
                <a href="tel:+919008110807" className="footer-contact-link">+91 9008110807</a>
              </p>
              <p className="contact-line">
                <svg className="contact-icon whatsapp-green-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a href="https://wa.me/918951029849" target="_blank" rel="noreferrer" className="footer-contact-link">+91 8951029849</a>
              </p>
              <p className="contact-line">
                <Mail size={14} className="contact-icon" />
                <a href="mailto:info@corede.in" className="footer-contact-link">info@corede.in</a>
              </p>
            </div>
          </div>
        </div>

        {/* Location & Google Map Embed */}
        <div className="footer-location-block">
          <div className="location-heading-box">
            <h3 className="location-title">📍 Our Location</h3>
            <p className="location-sub">CoreDe, Belagavi</p>
          </div>
          <div className="map-embed-wrapper glass-surface">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.410695143532!2d74.5332216!3d15.8850559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf61dfee22fc19%3A0x1d962ce845020b5c!2sCoreDe!5e0!3m2!1sen!2sin!4v1707210000000"
              width="100%"
              height="340"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CoreDe Location Map"
            ></iframe>
          </div>
        </div>

        {/* Footer Bottom Legal Copyright */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 CoreDe Software Development and Digital Marketing LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
