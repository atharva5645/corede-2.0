import React from 'react';
import { Quote, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import './testimonial-card.css';

export function TestimonialCard({ author, text, href, className }) {
  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? {
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={cn(
        'testimonial-marquee-card',
        href && 'testimonial-card-clickable',
        className
      )}
    >
      <div className="card-quote-header">
        <Quote className="quote-icon" size={20} aria-hidden="true" />
        {href && <ExternalLink size={14} className="external-link-icon" />}
      </div>

      <p className="card-text">"{text}"</p>

      <div className="card-author-row">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="author-avatar-img"
          />
        ) : (
          <div
            className="author-avatar-initials"
            style={{ backgroundColor: author.color || 'var(--color-primary)' }}
          >
            {author.initials || author.name?.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="author-details">
          <div className="author-name">{author.name}</div>
          <div className="author-handle">
            {author.handle || (author.role ? `${author.role} · ${author.location || ''}` : '')}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
