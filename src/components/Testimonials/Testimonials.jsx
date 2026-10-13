import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { TESTIMONIALS } from "@/data/siteData";
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}) {
  const sectionRef = useRef(null);
  const marqueeWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.testimonials-header-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Responsive tilt/skew on the marquee track based on user scrolling velocity (nickho style dynamic feel)
      if (marqueeWrapperRef.current) {
        ScrollTrigger.create({
          trigger: marqueeWrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const skew = Math.max(-4, Math.min(4, self.getVelocity() / 300));
            gsap.to(marqueeWrapperRef.current, {
              skewX: skew,
              overwrite: 'auto',
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-0",
        "testimonials-marquee-section",
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8 testimonials-header-block">
          <span className="section-eyebrow">Student Stories</span>
          <h2
            id="testimonials-heading"
            className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight"
          >
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div ref={marqueeWrapperRef} className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
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

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}

export default function Testimonials() {
  const formattedTestimonials = TESTIMONIALS.map((t) => ({
    author: {
      name: t.name,
      handle: `${t.role} · ${t.location}`,
      initials: t.initials,
      color: t.color,
      role: t.role,
      location: t.location,
      avatar: t.avatar,
    },
    text: t.quote,
  }));

  return (
    <TestimonialsSection
      title="What Our Students & Parents Say"
      description="Real feedback from students and parents in Australia and across Karnataka — the impact of The Coding Zone speaks for itself."
      testimonials={formattedTestimonials}
    />
  );
}
