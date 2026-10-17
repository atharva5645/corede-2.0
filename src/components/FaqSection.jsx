import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Wrench } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(1); // Default open second item matching reference

  const faqs = [
    {
      q: 'Why choose an India-based Offshore Development Team for my software?',
      a: 'Cost-efficiency without compromising engineering quality, access to top-tier developer talent, overlapping time-zone communication, and robust Agile delivery models.'
    },
    {
      q: 'What exactly is AI Engine Optimization (AIEO)?',
      a: 'AIEO ensures your brand is optimized for AI-driven search engines like ChatGPT, Gemini, and SGE.'
    },
    {
      q: 'How does CoreDe Technologies handle data security in Development?',
      a: 'We adhere to strict NDA protocols, OWASP Top 10 security audits, encrypted code repositories, and compliant cloud deployment pipelines.'
    },
    {
      q: 'What is your typical project delivery timeline?',
      a: 'Timelines range from 4–6 weeks for targeted MVPs to 3–6 months for full-scale enterprise software platforms, managed through bi-weekly sprint deliverables.'
    }
  ];

  return (
    <section className="faq-section" id="faqs">
      <div className="section-container">
        
        <div className="faq-header">
          <span className="section-eyebrow">COMMON ENQUIRIES</span>
          <h2 className="section-heading">
            FAQs &amp; <span className="text-highlight-green">Expert Insights.</span>
          </h2>
          <div className="faq-quick-triggers">
            <a 
              href="https://wa.me/918951029849?text=Hello%20CoreDe%20Innovation,%20I%20want%20sales%20information" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="faq-trigger-pill"
            >
              <MessageSquare size={15} />
              <span>💼 Sales Inquiry</span>
            </a>
            <a 
              href="https://wa.me/919008110807?text=Hello%20CoreDe%20Innovation,%20I%20need%20support" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="faq-trigger-pill"
            >
              <Wrench size={15} />
              <span>🛠 Technical Support</span>
            </a>
          </div>
        </div>

        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
