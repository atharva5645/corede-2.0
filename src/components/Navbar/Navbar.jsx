import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '../../data/siteData';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Tracks',       href: '#tracks' },
  { label: 'Curriculum',   href: '#curriculum' },
  { label: 'About',        href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('');
  const mobileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      // Active section tracking
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = e => {
      if (menuOpen && mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.offsetTop - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleBookDemo = e => handleNavClick(e, '#contact');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="container navbar-inner">
          {/* Brand */}
          <a href="#" className="navbar-brand" aria-label="The Coding Zone home">
            <img
              src="/logo.png"
              alt="The Coding Zone - Think Create Code"
              className="navbar-brand-logo"
            />
          </a>

          {/* Desktop Nav */}
          <ul className="desktop-nav" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeId && link.href === `#${activeId}` ? 'active' : ''}`}
                  onClick={e => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar-actions">
            <a
              href="#contact"
              className="btn btn-primary btn-sm"
              onClick={handleBookDemo}
              aria-label="Book a free demo class"
            >
              Book Free Demo
            </a>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={mobileRef}
        className={`mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          onClick={handleBookDemo}
        >
          Book a Free Demo Class
        </a>
      </div>
    </>
  );
}
