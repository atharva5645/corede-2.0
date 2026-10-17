import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TestimonialCard({ 
  author, 
  text, 
  quote, 
  href, 
  className = '' 
}) {
  const content = text || quote;
  const rating = author?.rating || 5;
  const authorImage = author?.image || author?.avatar;
  const subtitle = [author?.role, author?.location || author?.handle].filter(Boolean).join(' • ');

  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href 
    ? { href, target: '_blank', rel: 'noopener noreferrer' } 
    : {};

  return (
    <CardWrapper 
      className={cn(
        "testimonial-marquee-card",
        "glass-surface",
        className
      )}
      {...wrapperProps}
    >
      <div className="testimonial-author-row">
        {authorImage && (
          <div className="testimonial-avatar-wrap">
            <img 
              src={authorImage} 
              alt={author?.name || 'Client Avatar'} 
              className="testimonial-avatar-img" 
              loading="lazy"
            />
          </div>
        )}
        <div className="testimonial-author-meta">
          <h4 className="testimonial-name">{author?.name}</h4>
          {subtitle && (
            <span className="testimonial-role">{subtitle}</span>
          )}
        </div>
        <div className="testimonial-stars" aria-label={`${rating} stars`}>
          {[...Array(rating)].map((_, sIdx) => (
            <Star 
              key={sIdx} 
              size={15} 
              fill="#f59e0b" 
              color="#f59e0b" 
              className="testimonial-star-icon"
            />
          ))}
        </div>
      </div>

      <p className="testimonial-quote-body">
        "{content}"
      </p>
    </CardWrapper>
  );
}

export default TestimonialCard;
