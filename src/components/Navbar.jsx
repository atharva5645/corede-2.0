import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Download, 
  Menu, 
  X, 
  FileText
} from 'lucide-react';

export default function Navbar({ onOpenBrochure }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brochureDropdownOpen, setBrochureDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setBrochureDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className={`navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
      <div className="navbar-pill">
        {/* Brand Logo */}
        <a href="/" className="navbar-brand" aria-label="CoreDe Home">
          <img 
            src="/logo.png" 
            alt="CoreDe Logo" 
            className="navbar-logo-img" 
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {/* Services with Mega Menu */}
          <div 
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              type="button" 
              className={`nav-link-btn ${activeDropdown === 'services' ? 'active' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
            >
              <span>Services</span>
              <ChevronDown size={14} className={`nav-caret ${activeDropdown === 'services' ? 'rotated' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div className="mega-menu-full-window">
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

        {/* Right CTA Actions: Brochure Dropdown */}
        <div className="navbar-actions">
          <div className="brochure-dropdown-container">
            <button 
              type="button" 
              className="navbar-cta-pill"
              onClick={() => setBrochureDropdownOpen(!brochureDropdownOpen)}
              aria-label="Download Brochures"
            >
              <Download size={15} />
              <span>Brochure ⬇</span>
            </button>

            {brochureDropdownOpen && (
              <div className="brochure-dropdown-menu">
                <a 
                  href="/Booklet.pdf" 
                  download 
                  className="brochure-dropdown-item"
                  onClick={() => setBrochureDropdownOpen(false)}
                >
                  <FileText size={16} />
                  <span>📄 Booklet</span>
                </a>
                <a 
                  href="/Broucher.pdf" 
                  download 
                  className="brochure-dropdown-item"
                  onClick={() => setBrochureDropdownOpen(false)}
                >
                  <FileText size={16} />
                  <span>📄 Broucher</span>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slideout */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <img src="/logo.png" alt="CoreDe Logo" className="mobile-logo" />
              <button 
                type="button" 
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Digital Marketing</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Design &amp; UI/UX</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Content Strategy</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Production &amp; Media</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Technology &amp; Web</a>
              <a href="/career" onClick={() => setMobileMenuOpen(false)}>Careers</a>
              <a href="/internship" onClick={() => setMobileMenuOpen(false)}>Internship</a>
              <a href="/workshop/" onClick={() => setMobileMenuOpen(false)}>Workshop</a>
            </nav>

            <div className="mobile-drawer-footer">
              <a href="/Booklet.pdf" download className="btn-primary-pill" style={{ marginBottom: '10px' }}>
                <Download size={14} />
                <span>Download Booklet</span>
              </a>
              <a href="/Broucher.pdf" download className="btn-secondary-pill">
                <Download size={14} />
                <span>Download Brochure</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
