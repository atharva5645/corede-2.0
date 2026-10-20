import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import BrochureModal from '../components/BrochureModal';
import QuoteModal from '../components/QuoteModal';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import '../pages.css';
import {
  Users,
  Lightbulb,
  Coffee,
  Code2,
  BookOpen,
  CheckCircle2,
  UploadCloud,
  Send,
  Sparkles,
  ArrowDown,
} from 'lucide-react';

const perks = [
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work alongside passionate engineers, designers, and mentors in an ego-free environment.',
    colorClass: 'perk-icon-blue',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Experiment with modern stacks, AI workflows, and scalable cloud architectures every day.',
    colorClass: 'perk-icon-amber',
  },
  {
    icon: Coffee,
    title: 'Excellent Perks & Growth',
    description: 'Flexible working hours, competitive compensation, and sponsored learning paths.',
    colorClass: 'perk-icon-emerald',
  },
];

const jobs = [
  {
    id: 1,
    title: 'IT Trainers',
    badge: 'IT Division',
    badgeClass: 'job-badge-blue',
    icon: Code2,
    position: 'Training Instructors (Full-time & Part-time)',
    skills: [
      'Python, Java, or JavaScript expertise',
      'Modern Web Development (HTML, CSS, React)',
      'Database Management (MySQL, MongoDB)',
      'API Development & RESTful Services',
      'Cloud Platforms (AWS, Azure)',
      'Prior teaching & student mentoring experience',
    ],
    offers: ['Competitive Salary', 'Flexible Hours', 'Career Growth', 'Ready Training Kits'],
  },
  {
    id: 2,
    title: 'Non-IT Trainers',
    badge: 'Business & Marketing',
    badgeClass: 'job-badge-purple',
    icon: BookOpen,
    position: 'Marketing & Business Instructors (Full-time & Part-time)',
    skills: [
      'Digital Marketing, SEO & Performance Analytics',
      'Meta Ads, Google Ads & PPC Optimization',
      'Social Media Strategy & Content Creation',
      'Business Communication & Soft Skills Coaching',
      'Hands-on campaign management experience',
    ],
    offers: ['Competitive Salary', 'Flexible Hours', 'Performance Bonuses', 'Certification Support'],
  },
];

export default function CareerPage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = formRef.current;
    const fd = new FormData(form);

    const required = { name: 'nameErr', email: 'emailErr', phone: 'phoneErr', position: 'positionErr' };
    let valid = true;
    Object.entries(required).forEach(([field, errId]) => {
      const el = form.querySelector(`[name="${field}"]`);
      const errEl = document.getElementById(errId);
      if (!el || !el.value.trim()) {
        if (errEl) errEl.textContent = 'This field is required.';
        valid = false;
      } else {
        if (errEl) errEl.textContent = '';
      }
    });
    if (!valid) { setFormStatus('error'); return; }

    try {
      const res = await fetch('/apply', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === 'success') {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="cp-page">
      <Navbar onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-glow" />
        <div className="cp-hero-inner">
          <div className="cp-now-hiring">
            <span className="cp-pulse" />
            Now Hiring
          </div>
          <h1 className="cp-hero-h1">Build the Future with Us</h1>
          <p className="cp-hero-p">
            At Corede Technologies, we're looking for passionate, driven individuals to join our team
            of innovators, builders, and mentors.
          </p>
          <a href="#open-positions" className="cp-hero-cta">
            View Open Positions <ArrowDown size={16} />
          </a>
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section className="cp-why-section">
        <div className="cp-section-inner">
          <div className="cp-section-header">
            <h2>Why Join Corede Technologies?</h2>
            <p>We offer more than just a job — a launchpad where you can innovate, lead, and grow.</p>
          </div>
          <div className="cp-perks-grid">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div className="cp-perk-card" key={perk.title}>
                  <div className={`cp-perk-icon ${perk.colorClass}`}>
                    <Icon size={28} />
                  </div>
                  <div className="cp-perk-text">
                    <h3>{perk.title}</h3>
                    <p>{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOBS + FORM ── */}
      <section className="cp-apply-section" id="open-positions">
        <div className="cp-apply-inner">

          {/* Left: vacancies */}
          <div className="cp-jobs-col">
            <div className="cp-jobs-header">
              <h2>Ready to take the next step?</h2>
              <p>Whether you are an industry veteran or a passionate educator, we want to hear from you.</p>
            </div>

            {jobs.map((job) => {
              const Icon = job.icon;
              return (
                <div className="cp-job-card" key={job.id}>
                  <div className="cp-job-top">
                    <div className="cp-job-title-row">
                      <div className="cp-job-icon-wrap">
                        <Icon size={20} className="cp-job-icon-svg" />
                      </div>
                      <div>
                        <h3 className="cp-job-title">{job.title}</h3>
                        <p className="cp-job-position">{job.position}</p>
                      </div>
                    </div>
                    <span className={`cp-job-badge ${job.badgeClass}`}>{job.badge}</span>
                  </div>

                  <div className="cp-skills-section">
                    <h4 className="cp-skills-label">Required Skills &amp; Competencies</h4>
                    <ul className="cp-skills-list">
                      {job.skills.map((skill) => (
                        <li key={skill}>
                          <CheckCircle2 size={15} className="cp-check-icon" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="cp-offers-section">
                    <h4 className="cp-skills-label">What We Offer</h4>
                    <div className="cp-offer-pills">
                      {job.offers.map((o) => (
                        <span className="cp-offer-pill" key={o}>{o}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Application form */}
          <div className="cp-form-col">
            <div className="cp-form-card">
              <div className="cp-form-badge">
                <Sparkles size={14} />
                Quick Application
              </div>
              <h3 className="cp-form-title">Application Form</h3>

              <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" className="cp-form">
                <div className="cp-field">
                  <label>Full Name</label>
                  <input name="name" type="text" placeholder="e.g. Rahul Sharma" />
                  <span className="lp-err" id="nameErr" />
                </div>

                <div className="cp-field-row">
                  <div className="cp-field">
                    <label>Email Address</label>
                    <input name="email" type="email" placeholder="you@example.com" />
                    <span className="lp-err" id="emailErr" />
                  </div>
                  <div className="cp-field">
                    <label>Phone Number</label>
                    <input name="phone" type="tel" placeholder="+91 98765 43210" />
                    <span className="lp-err" id="phoneErr" />
                  </div>
                </div>

                <div className="cp-field">
                  <label>Position Applying For</label>
                  <input name="position" type="text" placeholder="e.g. IT Trainer / Frontend Developer" />
                  <span className="lp-err" id="positionErr" />
                </div>

                <div className="cp-field">
                  <label>Cover Note / Message</label>
                  <textarea name="message" rows="3" placeholder="Tell us briefly about your experience..." />
                </div>

                <div className="cp-field">
                  <label>Upload Resume (PDF / DOCX)</label>
                  <label className="cp-dropzone">
                    <UploadCloud size={20} className="cp-upload-icon" />
                    <span>Click to upload or drag &amp; drop resume</span>
                    <input type="file" name="resume" className="hidden" />
                  </label>
                </div>

                {formStatus === 'success' && (
                  <div className="cp-status-success">✅ Application submitted! We'll be in touch soon.</div>
                )}
                {formStatus === 'error' && (
                  <div className="cp-status-error">❌ Please fill all required fields and try again.</div>
                )}

                <button type="submit" className="cp-submit-btn" disabled={formStatus === 'submitting'}>
                  <Send size={15} />
                  {formStatus === 'submitting' ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Footer onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />
      <WhatsAppButton />
    </div>
  );
}
