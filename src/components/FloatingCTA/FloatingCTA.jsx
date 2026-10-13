import { MessageSquare, Phone } from 'lucide-react';
import { SITE } from '../../data/siteData';
import './FloatingCTA.css';

export default function FloatingCTA() {
  return (
    <div className="floating-cta-container">
      <a
        href={`tel:+91${SITE.phone}`}
        className="floating-btn floating-btn-phone"
        aria-label="Call The Coding Zone"
        title="Call Now"
      >
        <Phone size={20} />
      </a>

      <a
        href={SITE.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageSquare size={22} />
        <span className="floating-text">Chat with Founder</span>
      </a>
    </div>
  );
}
