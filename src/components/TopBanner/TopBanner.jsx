import { SITE } from '../../data/siteData';
import './TopBanner.css';

export default function TopBanner() {
  return (
    <section className="top-banner-section" aria-label="Promotional Banner">
      <a
        href={SITE.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="top-banner-link"
        aria-label="Connect with The Coding Zone on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <picture className="top-banner-picture">
          <source
            media="(max-width: 768px)"
            srcSet="/images/The%20Coding%20Zone_%20Build%20Together%20(1).png"
          />
          <img
            src="/images/The%20Coding%20Zone%20Learning%20Banner%20(1).png"
            alt="The Coding Zone - Think Create Code"
            className="top-banner-img"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </a>
    </section>
  );
}
