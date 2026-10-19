import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronDown, 
  Download, 
  Menu, 
  X, 
  FileText,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

export default function Navbar({ onOpenBrochure, onOpenQuote }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brochureDropdownOpen, setBrochureDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const activeDropdownRef = useRef(activeDropdown);
  activeDropdownRef.current = activeDropdown;
  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  mobileMenuOpenRef.current = mobileMenuOpen;

  const scrolledRef = useRef(false);
  const navHiddenRef = useRef(false);

  // Scroll direction detection — throttled with strict state-change guards
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          // At top of page — always show, transparent
          if (currentScrollY < 20) {
            if (navHiddenRef.current) {
              navHiddenRef.current = false;
              setNavHidden(false);
            }
            if (scrolledRef.current) {
              scrolledRef.current = false;
              setScrolled(false);
            }
          } else {
            if (!scrolledRef.current) {
              scrolledRef.current = true;
              setScrolled(true);
            }
            // Sensitive to scroll direction changes (> 8px) — do NOT hide if dropdown is open!
            if (diff > 8 && !mobileMenuOpenRef.current && !activeDropdownRef.current) {
              if (!navHiddenRef.current) {
                navHiddenRef.current = true;
                setNavHidden(true);
              }
            } else if (diff < -8) {
              if (navHiddenRef.current) {
                navHiddenRef.current = false;
                setNavHidden(false);
              }
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setBrochureDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setBrochureDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const servicesData = [
    {
      category: 'Digital Marketing',
      subsections: [
        {
          title: 'Digital Marketing',
          items: ['Influence Marketing', 'Creative Advertising', 'B2B Lead Generation', 'Affiliate Marketing - AMAZON ADS', 'Online Reputation Management', 'Email Marketing']
        },
        {
          title: 'Brand Performance',
          items: ['Performance Marketing', 'PPC Services', 'Media Buying', 'AI Adoption']
        },
        {
          title: 'Social Media & SEO',
          items: ['Instagram Marketing', 'Facebook & LinkedIn Marketing', 'YouTube Monetize', 'SEO Overview & Ecommerce SEO', 'AI SEO & Local SEO', 'Conversion Rate Optimization']
        }
      ]
    },
    {
      category: 'Design & UI/UX',
      subsections: [
        {
          title: 'Design & Identity',
          items: ['Graphic Design', 'Brand Identity', 'Marketing Collaterals', 'Packaging Design', 'Logo Design & Brand Guidelines']
        },
        {
          title: 'UI / UX Design',
          items: ['UI Design', 'UX Research', 'Wireframing & Prototyping', 'Usability Testing']
        },
        {
          title: 'Web & Visual',
          items: ['Website & Landing Page Design', 'E-commerce Design', 'Infographics & Presentations', 'Social Media Creatives']
        }
      ]
    },
    {
      category: 'Content Strategy',
      subsections: [
        {
          title: 'Content Strategy',
          items: ['Content Marketing Strategy', 'Editorial Planning', 'Brand Storytelling', 'Audience Research & Audits']
        },
        {
          title: 'Written & Creative',
          items: ['Website & Blog Writing', 'SEO & Technical Writing', 'Product Descriptions', 'Copywriting & Ad Copy', 'Email Campaign Content']
        },
        {
          title: 'Video & Optimization',
          items: ['Video & Concept Scripts', 'Reels & Shorts', 'Podcast Content', 'AI Content & Conversion Copywriting']
        }
      ]
    },
    {
      category: 'Production & Media',
      subsections: [
        {
          title: 'Video Production',
          items: ['Corporate Videos', 'Brand & Campaign Films', 'Product Videos', 'Testimonial Videos', 'TV Commercials & Digital Ads']
        },
        {
          title: 'Photography & Animation',
          items: ['Product & Corporate Photography', 'Lifestyle & Event Coverage', '2D & 3D Animation', 'Motion Graphics & Explainers']
        },
        {
          title: 'Post Production',
          items: ['Video Editing', 'Color Grading', 'Sound Design', 'Visual Effects (VFX)']
        }
      ]
    },
    {
      category: 'Technology & Dev',
      subsections: [
        {
          title: 'Web & Mobile Dev',
          items: ['Website & CMS Development', 'E-commerce Development', 'Web Applications', 'Android & iOS App Dev', 'Flutter & React Native']
        },
        {
          title: 'Backend & Cloud',
          items: ['API Development', 'Database Design', 'System Integration', 'AWS & Azure Solutions', 'CI/CD Pipelines']
        },
        {
          title: 'Emerging Tech',
          items: ['PowerBI Dashboard Development', 'AI & Machine Learning', 'Chatbot Development', 'IoT Applications']
        }
      ]
    }
  ];

  return (
    <header 
      className={`clay-navbar ${scrolled ? 'is-scrolled' : ''} ${navHidden ? 'is-hidden' : ''}`} 
      ref={navRef}
    >
      <div className="clay-container navbar-inner">
        {/* Brand Logo */}
        <a href="/" className="navbar-brand" aria-label="CoreDe Home">
          <img 
            src="/logo.png" 
            alt="CoreDe Logo" 
            className="navbar-logo-img" 
            style={{ filter: 'none' }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {/* Services with Mega Menu — Click to toggle, persistent and does not disappear on hover/mouse movement */}
          <div className="nav-item-dropdown">
            <button 
              type="button" 
              className={`nav-link-btn ${activeDropdown === 'services' ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setBrochureDropdownOpen(false);
                setActiveDropdown(prev => prev === 'services' ? null : 'services');
              }}
              aria-expanded={activeDropdown === 'services'}
              id="services-nav-trigger"
            >
              <span>Services</span>
              <ChevronDown size={17} className={`nav-caret ${activeDropdown === 'services' ? 'rotated' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div 
                className="mega-menu-full-window"
                onClick={(e) => e.stopPropagation()}
                role="region"
                aria-label="Services Directory"
              >
                <div className="mega-menu-inner-grid">
                  {servicesData.map((col, cIdx) => (
                    <div key={cIdx} className="mega-menu-col">
                      <h4 className="mega-col-title">{col.category}</h4>
                      {col.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="mega-sub-group">
                          <h5 className="mega-sub-title">{sub.title}</h5>
                          <ul className="mega-list">
                            {sub.items.map((item, iIdx) => (
                              <li key={iIdx}>
                                <a href="#services" onClick={() => setActiveDropdown(null)}>
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Careers */}
          <div className="nav-item-dropdown">
            <a href="/career" className="nav-link-btn">
              <span>Careers</span>
            </a>
          </div>

          {/* Internship */}
          <div className="nav-item-dropdown">
            <a href="/internship" className="nav-link-btn">
              <span>Internship</span>
            </a>
          </div>

          {/* Workshop */}
          <div className="nav-item-dropdown">
            <a href="/workshop/" className="nav-link-btn">
              <span>Workshop</span>
            </a>
          </div>
        </nav>

        {/* Right Actions: Brochure + Quote CTA */}
        <div className="navbar-actions">
          {/* Brochure Dropdown */}
          <div className="brochure-dropdown-container">
            <button 
              type="button" 
              className="navbar-brochure-btn"
              onClick={() => setBrochureDropdownOpen(!brochureDropdownOpen)}
              aria-label="Download Brochures"
              aria-expanded={brochureDropdownOpen}
            >
              <Download size={17} />
              <span>Brochure</span>
              <ChevronDown size={16} className={`nav-caret ${brochureDropdownOpen ? 'rotated' : ''}`} />
            </button>

            {brochureDropdownOpen && (
              <div className="brochure-dropdown-menu">
                <a 
                  href="/Booklet.pdf" 
                  download 
                  className="brochure-dropdown-item"
                  onClick={() => setBrochureDropdownOpen(false)}
                >
                  <FileText size={17} />
                  <span>📄 Booklet</span>
                </a>
                <a 
                  href="/Broucher.pdf" 
                  download 
                  className="brochure-dropdown-item"
                  onClick={() => setBrochureDropdownOpen(false)}
                >
                  <FileText size={17} />
                  <span>📄 Brochure</span>
                </a>
              </div>
            )}
          </div>

          {/* Primary CTA Button */}
          <button 
            type="button" 
            className="btn-primary navbar-cta-btn"
            onClick={onOpenQuote}
            id="nav-quote-btn"
          >
            <span>Request a Quote</span>
            <ArrowRight size={17} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Dark Mobile Menu Overlay */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <a href="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.png" alt="CoreDe Logo" className="mobile-logo" style={{ filter: 'none' }} />
              </a>
              <button 
                type="button" 
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <span className="mobile-nav-eyebrow">NAVIGATION</span>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="/career" onClick={() => setMobileMenuOpen(false)}>Careers</a>
              <a href="/internship" onClick={() => setMobileMenuOpen(false)}>Internship</a>
              <a href="/workshop/" onClick={() => setMobileMenuOpen(false)}>Workshop</a>
              
              <div className="mobile-nav-divider" />
              
              <span className="mobile-nav-eyebrow">SERVICES DIRECTORY</span>
              <a href="#services" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Digital Marketing</a>
              <a href="#services" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Design &amp; UI/UX</a>
              <a href="#services" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Content Strategy</a>
              <a href="#services" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Production &amp; Media</a>
              <a href="#services" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Technology &amp; Web</a>
            </nav>

            <div className="mobile-drawer-actions">
              <button 
                type="button" 
                className="btn-primary mobile-quote-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </button>

              <div className="mobile-brochure-row">
                <a href="/Booklet.pdf" download className="btn-secondary mobile-brochure-link">
                  <Download size={14} />
                  <span>Booklet</span>
                </a>
                <a href="/Broucher.pdf" download className="btn-secondary mobile-brochure-link">
                  <Download size={14} />
                  <span>Brochure</span>
                </a>
              </div>
            </div>

            <div className="mobile-drawer-footer">
              <div className="mobile-contact-item">
                <Phone size={14} />
                <span>+91 8951029849</span>
              </div>
              <div className="mobile-contact-item">
                <Mail size={14} />
                <span>info@corede.in</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
