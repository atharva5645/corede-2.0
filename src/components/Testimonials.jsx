import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Nakul',
      location: 'Canada',
      role: 'Ethereal Voretex Solutions.ca',
      image: '/Canada.jpg',
      rating: 5,
      quote: 'CoreDe has been an exceptional digital partner for our business in Canada. Their expertise in Google Ads, Meta Ads, SEO, and social media helped us significantly improve our online visibility and lead generation.'
    },
    {
      name: 'Arsalan K.',
      location: 'Canada',
      role: 'Real Estate Client',
      image: '/Arsalan.jpg',
      rating: 5,
      quote: 'CoreDe has done an excellent job managing our social media and paid advertising campaigns in Canada. Their Google Ads and Meta Ads strategies helped us increase our reach, engagement, and lead generation.'
    },
    {
      name: 'Thanu',
      location: 'India',
      role: 'Founder – Organic Products',
      image: '/Thanuorg.jpg',
      rating: 5,
      quote: 'CoreDe has been a complete digital growth partner for our business. From branding and graphic design to SEO, SEM, and paid campaigns, their team handled everything with great professionalism.'
    },
    {
      name: 'Sunil G.',
      location: 'India',
      role: 'Vinish Foundation Trust',
      image: '/Sunil.jpg',
      rating: 5,
      quote: 'Their strategies are simple, clear, and effective. Highly recommended for digital marketing, performance ads, and high-impact software growth with CoreDe.'
    }
  ];

  const stats = [
    { count: '350+', label: 'Clients Served' },
    { count: '25+', label: 'Enterprise Subscribers' },
    { count: '12+', label: 'Global Markets Served' }
  ];

  return (
    <div className="testimonials-aggregate-section">
      {/* 1. Client Testimonials Speech-Bubble Cards Section */}
      <section className="testimonials-section speech-bubble-theme" id="testimonials">
        <div className="section-container">
          <div className="testimonials-header">
            <h2 className="section-heading">What Our Clients Say</h2>
            <p className="testimonials-subtitle">
              Happy clients are the reason we grow stronger every day
            </p>
          </div>

          {/* Compact Speech Bubble Reviews Grid */}
          <div className="speech-bubbles-grid">
            {testimonials.map((client, cIdx) => (
              <div key={cIdx} className="bubble-card-wrapper">
                <div className="speech-bubble-card">
                  {/* Overflowing Top Circular Avatar */}
                  <div className="bubble-avatar-box">
                    <img 
                      src={client.image} 
                      alt={client.name} 
                      className="bubble-avatar-img" 
                    />
                  </div>

                  {/* Floating Sky Blue Accent Dot on Right */}
                  <span className="bubble-accent-dot" aria-hidden="true"></span>

                  {/* Author Name and Location */}
                  <h4 className="bubble-author-title">
                    – {client.name}, {client.location}
                  </h4>

                  {/* 5 Golden Yellow Stars */}
                  <div className="bubble-stars-row">
                    {[...Array(client.rating)].map((_, sIdx) => (
                      <Star 
                        key={sIdx} 
                        size={15} 
                        fill="#f59e0b" 
                        color="#f59e0b" 
                        className="bubble-star-icon"
                      />
                    ))}
                  </div>

                  {/* Review Text inside Quotes */}
                  <p className="bubble-quote-text">
                    "{client.quote}"
                  </p>

                  {/* Curved Speech Bubble Tail Pointer at Bottom */}
                  <div className="bubble-tail-anchor" aria-hidden="true">
                    <svg 
                      className="bubble-tail-svg" 
                      viewBox="0 0 44 28" 
                      width="44" 
                      height="28"
                    >
                      <path 
                        d="M0 0 C12 0 24 10 28 28 C30 16 36 6 44 0 Z" 
                        fill="#ffffff" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Counter Section with Vibrant Mesh Gradient Container */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-mesh-container">
            <div className="stats-header-clean">
              <h3 className="stats-executive-subheading">
                Their success helps us scale stronger. We focus on results, relationships, and long-term impact.
              </h3>
            </div>

            <div className="stats-cards-grid-vibrant">
              {stats.map((item, idx) => (
                <div key={idx} className="stat-card-vibrant">
                  <h3 className="stat-number-display">{item.count}</h3>
                  <p className="stat-label-display">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
