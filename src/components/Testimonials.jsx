import React from 'react';
import { cn } from '@/lib/utils';
import { TestimonialCard } from '@/components/ui/testimonial-card';

export function TestimonialsSection({ 
  title = "What Our Clients Say.",
  description = "Happy clients are the reason we grow stronger every day.",
  testimonials = [],
  className = ""
}) {
  return (
    <section 
      className={cn(
        "testimonials-section",
        "bg-background text-foreground",
        className
      )}
      id="testimonials"
      aria-label="Client Testimonials"
    >
      <div className="clay-container testimonials-header-wrap">
        <div className="testimonials-header">
          <span className="clay-eyebrow">CLIENT ENDORSEMENTS</span>
          <h2 className="testimonials-heading">
            {title}
          </h2>
          <p className="testimonials-subtitle">
            {description}
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Carousel with Edge Fades */}
      <div className="testimonials-marquee-wrapper relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex overflow-hidden p-2 [--gap:1.25rem] [gap:var(--gap)] flex-row [--duration:40s]">
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, setIndex) => (
              testimonials.map((testimonial, i) => (
                <TestimonialCard 
                  key={`${setIndex}-${i}`}
                  {...testimonial}
                />
              ))
            ))}
          </div>
        </div>

        {/* Gradient edge masks that blend seamlessly into canvas background */}
        <div className="testimonial-fade-left pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
        <div className="testimonial-fade-right pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
      </div>
    </section>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      author: {
        name: 'Nakul',
        location: 'Canada',
        role: 'Ethereal Voretex Solutions.ca',
        image: '/Canada.jpg',
        rating: 5,
      },
      text: 'CoreDe has been an exceptional digital partner for our business in Canada. Their expertise in Google Ads, Meta Ads, SEO, and social media helped us significantly improve our online visibility and lead generation.'
    },
    {
      author: {
        name: 'Arsalan K.',
        location: 'Canada',
        role: 'Real Estate Client',
        image: '/Arsalan.jpg',
        rating: 5,
      },
      text: 'CoreDe has done an excellent job managing our social media and paid advertising campaigns in Canada. Their Google Ads and Meta Ads strategies helped us increase our reach, engagement, and lead generation.'
    },
    {
      author: {
        name: 'Thanu',
        location: 'India',
        role: 'Founder – Organic Products',
        image: '/Thanuorg.jpg',
        rating: 5,
      },
      text: 'CoreDe has been a complete digital growth partner for our business. From branding and graphic design to SEO, SEM, and paid campaigns, their team handled everything with great professionalism.'
    },
    {
      author: {
        name: 'Sunil G.',
        location: 'India',
        role: 'Vinish Foundation Trust',
        image: '/Sunil.jpg',
        rating: 5,
      },
      text: 'Their strategies are simple, clear, and effective. Highly recommended for digital marketing, performance ads, and high-impact software growth with CoreDe.'
    }
  ];

  const stats = [
    { count: '350+', label: 'Clients Served' },
    { count: '25+', label: 'Enterprise Subscribers' },
    { count: '12+', label: 'Global Markets Served' }
  ];

  return (
    <div className="testimonials-aggregate-section">
      {/* 1. Client Testimonials Infinite Horizontal Marquee Section */}
      <TestimonialsSection 
        title="What Our Clients Say."
        description="Happy clients are the reason we grow stronger every day."
        testimonials={testimonials}
      />

      {/* 2. Impact Statistics Section — Inverted Dark Architectural Panel */}
      <section className="stats-section">
        <div className="clay-container">
          <div className="stats-panel-inverted">
            <div className="stats-header-clean">
              <span className="stats-eyebrow-dark">VERIFIED OUTCOMES</span>
              <h3 className="stats-executive-subheading">
                Their success helps us scale stronger. We focus on results, relationships, and long-term impact.
              </h3>
            </div>

            <div className="stats-hairline-grid">
              {stats.map((item, idx) => (
                <div key={idx} className="stat-item-cell">
                  <span className="stat-number-display">{item.count}</span>
                  <span className="stat-label-display">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
