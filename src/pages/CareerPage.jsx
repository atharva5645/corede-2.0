import React, { useState, useRef, useMemo } from 'react';
import Navbar from '../components/Navbar';
import BrochureModal from '../components/BrochureModal';
import QuoteModal from '../components/QuoteModal';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import '../pages.css';
import {
  Search,
  MapPin,
  X,
  UploadCloud,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Sparkles,
  Mail,
  MessageCircle
} from 'lucide-react';

const JOBS_DATA = [
  {
    id: 1,
    title: 'IT Trainers & Mentors',
    badge: 'Actively Hiring',
    badgeType: 'active',
    department: 'Training & Faculty',
    type: 'Full time',
    experience: '1-2 years',
    location: 'Bengaluru, Karnataka, India',
    date: '28/10/2026',
    snippetExperience: '1-2 years of experience in Python, Java, or JavaScript web development.',
    snippetRoles: 'Lead instructor-led interactive sessions, guide real-world projects, mentor college students, and review coding challenges.',
    skills: [
      'Python, Java, or Modern JavaScript expertise',
      'Full Stack Web Development (React, HTML5, CSS3, Node.js)',
      'Database Management (MySQL, MongoDB, PostgreSQL)',
      'REST APIs & Cloud Deployment (AWS / Azure basics)',
      'Strong student mentorship and public presentation skills',
    ],
    offers: ['Competitive Salary & Incentives', 'Flexible Working Hours', 'Structured Curriculum Kits', 'Sponsored Certifications'],
  },
  {
    id: 2,
    title: 'Creative Strategist & Non-IT Trainer',
    badge: 'Actively Hiring',
    badgeType: 'active',
    department: 'Training & Faculty',
    type: 'Full time',
    experience: '1-2 years',
    location: 'Bengaluru, Karnataka, India',
    date: '26/10/2026',
    snippetExperience: '1-2 years of experience in digital marketing, social media branding, or ad management.',
    snippetRoles: 'Deliver structured workshops on Meta & Google Ads, organic growth hacking, content marketing, and coach candidates in business communication.',
    skills: [
      'Performance Marketing, Google Ads & Meta Ads Manager',
      'Content Marketing Strategy & Social Media Planning',
      'SEO & SEM optimization principles',
      'Brand positioning & campaign attribution analytics',
      'Interactive coaching and corporate communication',
    ],
    offers: ['Competitive Compensation', 'Performance Bonuses', 'Corporate Workshop Exposure', 'Rapid Career Growth'],
  },
  {
    id: 3,
    title: 'Full Stack Web Developer',
    badge: 'Immediate',
    badgeType: 'urgent',
    department: 'Engineering & Tech',
    type: 'Full time',
    experience: '2-4 years',
    location: 'Bengaluru, Karnataka, India',
    date: '25/10/2026',
    snippetExperience: '2-4 years developing robust, scalable enterprise web applications.',
    snippetRoles: 'Collaborate with cross-functional teams to engineer high-performance web applications, architect serverless APIs, and maintain high code quality standards.',
    skills: [
      'React 18+, Next.js, TypeScript, and modern state management',
      'Node.js / Express backend microservices',
      'Database schema design (PostgreSQL, Redis, Prisma)',
      'Tailwind CSS, responsive design, and Web Vitals optimization',
      'CI/CD workflows and automated testing',
    ],
    offers: ['Competitive Tech Package', 'Latest MacBook / Gear', 'Health Insurance', 'Collaborative Team Culture'],
  },
  {
    id: 4,
    title: 'Performance Marketing Specialist',
    badge: 'Actively Hiring',
    badgeType: 'active',
    department: 'Marketing & Strategy',
    type: 'Full time',
    experience: '1-2 years',
    location: 'Bengaluru, Karnataka, India',
    date: '24/10/2026',
    snippetExperience: '1-2 years handling paid ad budgets, media buying, and ROI optimization.',
    snippetRoles: 'Build, audit, and scale high-conversion paid search and social campaigns across Google, Meta, and LinkedIn with data attribution.',
    skills: [
      'Hands-on expertise with Google Ads, Meta Ads Manager, GA4',
      'A/B testing ad copies, creative angles, and landing page funnels',
      'Conversion tracking, pixel configuration, and CAPI setup',
      'Data analysis using Looker Studio / Excel',
    ],
    offers: ['Performance Incentives', 'Client Portfolio Variety', 'Sponsored Growth Courses', 'Flexible Work Culture'],
  },
  {
    id: 5,
    title: 'UI/UX & Visual Designer',
    badge: 'Actively Hiring',
    badgeType: 'active',
    department: 'Design & Creative',
    type: 'Remote / Hybrid',
    experience: '1-2 years',
    location: 'Bengaluru, Karnataka, India',
    date: '22/10/2026',
    snippetExperience: '1-2 years crafting user-centered web and mobile interfaces.',
    snippetRoles: 'Design wireframes, high-fidelity prototypes, design systems, and collaborate closely with frontend developers for pixel-perfect implementations.',
    skills: [
      'Mastery of Figma, Auto Layout, and Design Systems',
      'User journey mapping, wireframing, and interactive prototyping',
      'Modern typography, responsive grids, and micro-interactions',
      'Understanding of HTML/CSS frontend constraints',
    ],
    offers: ['Design Freedom', 'Hybrid / Remote Flexibility', 'Annual Design Tool Subscriptions', 'Generous PTO'],
  },
  {
    id: 6,
    title: 'Business Development Executive',
    badge: 'Actively Hiring',
    badgeType: 'active',
    department: 'Marketing & Strategy',
    type: 'Full time',
    experience: '0-1 years',
    location: 'Bengaluru, Karnataka, India',
    date: '20/10/2026',
    snippetExperience: '0-1 years in sales, business development, or client relationship management.',
    snippetRoles: 'Identify B2B partnership opportunities, conduct discovery calls, pitch CoreDe enterprise services, and manage sales pipeline in CRM.',
    skills: [
      'Exceptional verbal and written communication skills',
      'Consultative selling and active listening',
      'Lead qualification, cold outreach, and CRM pipeline hygiene',
      'Goal-driven attitude and perseverance',
    ],
    offers: ['Attractive Base + High Commissions', 'Rapid Promotion Track', 'Mentorship from Senior Leadership'],
  },
];

export default function CareerPage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Search & Filters State
  const [searchWhat, setSearchWhat] = useState('');
  const [searchWhere, setSearchWhere] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Expanded details toggle for individual job cards
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeApplyingJob, setActiveApplyingJob] = useState(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [selectedFileName, setSelectedFileName] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const formRef = useRef(null);

  // Handle filter checkbox toggles
  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClearFilters = () => {
    setSearchWhat('');
    setSearchWhere('');
    setSelectedJobTypes([]);
    setSelectedExperiences([]);
    setSelectedDepartments([]);
  };

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // What query
      if (searchWhat.trim()) {
        const q = searchWhat.toLowerCase();
        const matchesWhat =
          job.title.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)) ||
          job.snippetRoles.toLowerCase().includes(q);
        if (!matchesWhat) return false;
      }

      // Where query
      if (searchWhere.trim()) {
        const q = searchWhere.toLowerCase();
        if (!job.location.toLowerCase().includes(q)) return false;
      }

      // Job Type
      if (selectedJobTypes.length > 0) {
        if (!selectedJobTypes.includes(job.type)) return false;
      }

      // Experience
      if (selectedExperiences.length > 0) {
        if (!selectedExperiences.includes(job.experience)) return false;
      }

      // Department
      if (selectedDepartments.length > 0) {
        if (!selectedDepartments.includes(job.department)) return false;
      }

      return true;
    });
  }, [searchWhat, searchWhere, selectedJobTypes, selectedExperiences, selectedDepartments]);

  // Counts for checkboxes
  const counts = useMemo(() => {
    const jobTypeCounts = {};
    const expCounts = {};
    const deptCounts = {};

    JOBS_DATA.forEach((job) => {
      jobTypeCounts[job.type] = (jobTypeCounts[job.type] || 0) + 1;
      expCounts[job.experience] = (expCounts[job.experience] || 0) + 1;
      deptCounts[job.department] = (deptCounts[job.department] || 0) + 1;
    });

    return { jobTypeCounts, expCounts, deptCounts };
  }, []);

  const handleOpenApplyModal = (job = null) => {
    setActiveApplyingJob(job);
    setFormStatus('idle');
    setSelectedFileName('');
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
    setActiveApplyingJob(null);
    setFormStatus('idle');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

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

    if (!valid) {
      setFormStatus('error');
      return;
    }

    const name = form.querySelector('[name="name"]')?.value?.trim() || '';
    const email = form.querySelector('[name="email"]')?.value?.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value?.trim() || '';
    const position = form.querySelector('[name="position"]')?.value?.trim() || (activeApplyingJob?.title || 'General Application');
    const message = form.querySelector('[name="message"]')?.value?.trim() || '';
    const resumeName = selectedFileName || 'Resume file';

    // Construct pre-filled email to official CoreDe email
    const emailSubject = `Job Application: ${position} - ${name}`;
    const emailBody = `Dear CoreDe Hiring Team,

I am writing to apply for the position of "${position}" at CoreDe Technologies.

Applicant Details:
• Full Name: ${name}
• Email Address: ${email}
• Phone Number: ${phone}
• Position Applied For: ${position}
• Resume File Name: ${resumeName}

Cover Note / Intro:
${message ? message : 'Please review my resume for this opening.'}

I have attached my resume to this email. Looking forward to hearing from you.

Best regards,
${name}
${phone}
${email}`;

    const mailtoUrl = `mailto:info@corede.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const whatsappUrl = `https://wa.me/918951029849?text=${encodeURIComponent(
      `Hi CoreDe, I have applied for the *${position}* role.\n\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n• Resume: ${resumeName}\n\nNote: ${message || 'Please review my application.'}`
    )}`;

    setSubmittedData({
      name,
      email,
      phone,
      position,
      message,
      resumeName,
      mailtoUrl,
      whatsappUrl,
    });

    // Optional background sync with server
    try {
      fetch('/apply', { method: 'POST', body: fd }).catch(() => {});
    } catch {
      // Ignore network errors in static preview
    }

    // Automatically trigger email client redirection to CoreDe email
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback handled by the interactive buttons in the modal
    }

    setFormStatus('success');
  };

  const scrollToOpenings = () => {
    const el = document.getElementById('openings-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sb-careers-page">
      <Navbar theme="dark" onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* ── SCHBANG-STYLE HERO ── */}
      <section className="sb-hero">
        <div className="sb-hero-overlay" />
        <div className="sb-hero-container">
          <p className="sb-hero-eyebrow">Find the career of your dreams</p>
          <h1 className="sb-hero-title">Not just a job, but a journey together</h1>
          <p className="sb-hero-description">
            We know that finding a meaningful and rewarding job can be a long journey. Our goal is to make that process
            as easy as possible for you, and to create a work environment that's satisfying - one where you'll look
            forward to coming to every day. Start your journey with us by browsing available jobs.
          </p>
          <button type="button" onClick={scrollToOpenings} className="sb-hero-btn">
            View Openings
          </button>
        </div>
      </section>

      {/* ── CURRENT OPENINGS & FILTERS SECTION ── */}
      <section className="sb-openings-section" id="openings-section">
        <div className="sb-container">
          {/* Section Header */}
          <div className="sb-section-heading-wrap">
            <h2 className="sb-main-heading">Join us</h2>
            <p className="sb-sub-heading">Current Openings</p>
          </div>

          {/* Search Bar matching Schbang: What / Where / Search */}
          <div className="sb-search-card">
            <div className="sb-search-fields">
              <div className="sb-search-field">
                <label className="sb-field-label">What</label>
                <div className="sb-input-icon-wrap">
                  <input
                    type="text"
                    value={searchWhat}
                    onChange={(e) => setSearchWhat(e.target.value)}
                    placeholder="Job title or skill"
                    className="sb-search-input"
                  />
                  <Search size={17} className="sb-input-icon" />
                </div>
              </div>

              <div className="sb-search-field">
                <label className="sb-field-label">Where</label>
                <div className="sb-input-icon-wrap">
                  <input
                    type="text"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    placeholder="City, Province or Country"
                    className="sb-search-input"
                  />
                  <MapPin size={17} className="sb-input-icon" />
                </div>
              </div>

              <div className="sb-search-btn-wrap">
                <button
                  type="button"
                  onClick={scrollToOpenings}
                  className="sb-search-submit-btn"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* 2-Column Split: Left Filters & Right Job Cards */}
          <div className="sb-content-layout">
            {/* Left Column: Filters */}
            <aside className="sb-filters-sidebar">
              <div className="sb-filters-header-row">
                <h3 className="sb-filters-title">Filters</h3>
                {(selectedJobTypes.length > 0 ||
                  selectedExperiences.length > 0 ||
                  selectedDepartments.length > 0 ||
                  searchWhat ||
                  searchWhere) && (
                  <button type="button" onClick={handleClearFilters} className="sb-clear-filters-btn">
                    Reset all
                  </button>
                )}
              </div>

              <div className="sb-filter-card">
                <div className="sb-filter-group-header">
                  <span className="sb-filter-group-title">Smart Filters</span>
                </div>

                <div className="sb-filter-divider" />

                {/* Job Type Filter */}
                <div className="sb-filter-group">
                  <h4 className="sb-filter-label">Job Type</h4>
                  <div className="sb-checkbox-list">
                    {['Full time', 'Part time', 'Remote / Hybrid'].map((type) => {
                      const count = counts.jobTypeCounts[type] || 0;
                      const checked = selectedJobTypes.includes(type);
                      return (
                        <label key={type} className="sb-checkbox-item">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFilter(selectedJobTypes, setSelectedJobTypes, type)}
                          />
                          <span className="sb-checkbox-text">
                            {type} {count > 0 && <span className="sb-filter-count">({count})</span>}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="sb-filter-divider" />

                {/* Work Experience Filter */}
                <div className="sb-filter-group">
                  <h4 className="sb-filter-label">Work Experience</h4>
                  <div className="sb-checkbox-list">
                    {['0-1 years', '1-2 years', '2-4 years'].map((exp) => {
                      const count = counts.expCounts[exp] || 0;
                      const checked = selectedExperiences.includes(exp);
                      return (
                        <label key={exp} className="sb-checkbox-item">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFilter(selectedExperiences, setSelectedExperiences, exp)}
                          />
                          <span className="sb-checkbox-text">
                            {exp} {count > 0 && <span className="sb-filter-count">({count})</span>}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="sb-filter-divider" />

                {/* Department Filter */}
                <div className="sb-filter-group">
                  <h4 className="sb-filter-label">Department</h4>
                  <div className="sb-checkbox-list">
                    {['Training & Faculty', 'Engineering & Tech', 'Marketing & Strategy', 'Design & Creative'].map(
                      (dept) => {
                        const count = counts.deptCounts[dept] || 0;
                        const checked = selectedDepartments.includes(dept);
                        return (
                          <label key={dept} className="sb-checkbox-item">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleFilter(selectedDepartments, setSelectedDepartments, dept)}
                            />
                            <span className="sb-checkbox-text">
                              {dept} {count > 0 && <span className="sb-filter-count">({count})</span>}
                            </span>
                          </label>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Job Cards List */}
            <main className="sb-jobs-list-col">
              <div className="sb-results-meta">
                <span className="sb-results-count">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenApplyModal(null)}
                  className="sb-general-apply-link"
                >
                  Can't find your role? Drop your resume &rarr;
                </button>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="sb-empty-state">
                  <p className="sb-empty-title">No matching job openings found</p>
                  <p className="sb-empty-desc">
                    Try adjusting your search terms or clearing some filters to see all available opportunities.
                  </p>
                  <button type="button" onClick={handleClearFilters} className="sb-empty-reset-btn">
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="sb-job-cards-wrapper">
                  {filteredJobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    return (
                      <article key={job.id} className="sb-job-card">
                        {/* Header Row: Title + Badge on left, Type + Date on right */}
                        <div className="sb-card-top-row">
                          <div className="sb-card-title-group">
                            <button
                              type="button"
                              className="sb-job-title-btn"
                              onClick={() => handleOpenApplyModal(job)}
                            >
                              {job.title}
                            </button>
                            <span
                              className={`sb-badge ${
                                job.badgeType === 'urgent' ? 'sb-badge-urgent' : 'sb-badge-active'
                              }`}
                            >
                              {job.badge}
                            </span>
                          </div>

                          <div className="sb-card-date-group">
                            <span className="sb-job-type-pill">{job.type}</span>
                            <span className="sb-job-date">{job.date}</span>
                          </div>
                        </div>

                        {/* Sub Row: Location & Experience */}
                        <div className="sb-card-meta-row">
                          <span className="sb-meta-item">
                            <MapPin size={14} className="sb-meta-icon" />
                            {job.location}
                          </span>
                          <span className="sb-meta-dot">•</span>
                          <span className="sb-meta-item">
                            <Briefcase size={14} className="sb-meta-icon" />
                            {job.experience}
                          </span>
                          <span className="sb-meta-dot">•</span>
                          <span className="sb-meta-item">
                            <Building2 size={14} className="sb-meta-icon" />
                            {job.department}
                          </span>
                        </div>

                        {/* Description snippet matching Schbang structure */}
                        <div className="sb-card-snippet">
                          <p>
                            <strong>Experience Required:</strong> • {job.snippetExperience}
                          </p>
                          <p>
                            <strong>Major Roles &amp; Responsibilities:</strong> • {job.snippetRoles}
                          </p>
                        </div>

                        {/* Expandable Skills and Perks */}
                        {isExpanded && (
                          <div className="sb-card-expanded-content">
                            <div className="sb-expanded-section">
                              <h5 className="sb-expanded-title">Key Competencies &amp; Skills:</h5>
                              <ul className="sb-skills-checklist">
                                {job.skills.map((skill, idx) => (
                                  <li key={idx}>
                                    <CheckCircle2 size={14} className="sb-check-icon" />
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="sb-expanded-section">
                              <h5 className="sb-expanded-title">What We Offer:</h5>
                              <div className="sb-offer-chips">
                                {job.offers.map((offer, idx) => (
                                  <span key={idx} className="sb-offer-chip">
                                    {offer}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bottom Actions Row */}
                        <div className="sb-card-actions-row">
                          <button
                            type="button"
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="sb-toggle-details-btn"
                          >
                            {isExpanded ? (
                              <>
                                Hide details <ChevronUp size={15} />
                              </>
                            ) : (
                              <>
                                View details &amp; skills <ChevronDown size={15} />
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenApplyModal(job)}
                            className="sb-apply-now-btn"
                          >
                            Apply Now
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ── SCHBANG-STYLE BOTTOM BAR ── */}
      <div className="sb-bottom-bar">
        <div className="sb-container sb-bottom-bar-inner">
          <div className="sb-bottom-links">
            <a href="/" className="sb-sub-link">
              Visit website
            </a>
            <span className="sb-dot">•</span>
            <button
              type="button"
              className="sb-sub-link sb-cookie-btn"
              onClick={() => alert('All cookies on CoreDe are securely managed.')}
            >
              Manage cookies
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="sb-floating-scroll-top"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

      {/* ── APPLICATION POPUP MODAL ── */}
      {isApplyModalOpen && (
        <div className="sb-modal-backdrop" onClick={handleCloseApplyModal}>
          <div className="sb-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="sb-modal-header">
              <div>
                <span className="sb-modal-badge">
                  <Sparkles size={13} /> Job Application
                </span>
                <h3 className="sb-modal-title">
                  {activeApplyingJob ? activeApplyingJob.title : 'General Application'}
                </h3>
                <p className="sb-modal-subtitle">
                  CoreDe Technologies • {activeApplyingJob ? activeApplyingJob.location : 'Bengaluru, India'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseApplyModal}
                className="sb-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sb-modal-body">
              {formStatus === 'success' ? (
                <div className="sb-apply-success-box">
                  <div className="sb-success-icon-wrap">
                    <CheckCircle2 size={46} className="sb-success-check-icon" />
                  </div>
                  <h4>Application Ready to Send!</h4>
                  <p>
                    Your application for <strong>{submittedData?.position}</strong> has been prepared for{' '}
                    <strong style={{ color: '#5b6ef5' }}>info@corede.in</strong>.
                  </p>

                  <div className="sb-resume-reminder-box">
                    <strong>📎 Important:</strong> Please attach your resume file (
                    <em>{submittedData?.resumeName}</em>) to the email draft before clicking Send.
                  </div>

                  <div className="sb-success-actions">
                    <a
                      href={submittedData?.mailtoUrl || 'mailto:info@corede.in'}
                      className="sb-modal-primary-btn"
                      style={{ textDecoration: 'none', justifyContent: 'center' }}
                    >
                      <Mail size={16} />
                      Open Email Client (info@corede.in)
                    </a>

                    {submittedData?.whatsappUrl && (
                      <a
                        href={submittedData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sb-whatsapp-btn"
                        style={{ textDecoration: 'none' }}
                      >
                        <MessageCircle size={16} />
                        Also Send via WhatsApp
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseApplyModal}
                    className="sb-modal-cancel-btn"
                    style={{ marginTop: '16px', width: '100%' }}
                  >
                    Done &amp; Close
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" className="sb-form">
                  <div className="sb-form-group">
                    <label>Full Name *</label>
                    <input name="name" type="text" placeholder="e.g. Rahul Sharma" />
                    <span className="lp-err" id="nameErr" />
                  </div>

                  <div className="sb-form-row">
                    <div className="sb-form-group">
                      <label>Email Address *</label>
                      <input name="email" type="email" placeholder="you@example.com" />
                      <span className="lp-err" id="emailErr" />
                    </div>
                    <div className="sb-form-group">
                      <label>Phone Number *</label>
                      <input name="phone" type="tel" placeholder="+91 98765 43210" />
                      <span className="lp-err" id="phoneErr" />
                    </div>
                  </div>

                  <div className="sb-form-group">
                    <label>Position Applying For *</label>
                    <input
                      name="position"
                      type="text"
                      defaultValue={activeApplyingJob ? activeApplyingJob.title : ''}
                      placeholder="e.g. IT Trainer / Frontend Developer"
                    />
                    <span className="lp-err" id="positionErr" />
                  </div>

                  <div className="sb-form-group">
                    <label>Cover Note / Brief Intro</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Share a brief overview of your background, experience, or portfolio links..."
                    />
                  </div>

                  <div className="sb-form-group">
                    <label>Upload Resume (PDF / DOCX)</label>
                    <label className="sb-file-dropzone">
                      <UploadCloud size={24} className="sb-dropzone-icon" />
                      <div className="sb-dropzone-text">
                        {selectedFileName ? (
                          <span className="sb-selected-file">📄 {selectedFileName}</span>
                        ) : (
                          <>
                            <span className="sb-dropzone-highlight">Click to upload</span> or drag and drop your file
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sb-file-input-hidden"
                      />
                    </label>
                  </div>

                  {formStatus === 'error' && (
                    <div className="sb-form-err-msg">
                      Please check the required fields highlighted above and try again.
                    </div>
                  )}

                  <div className="sb-modal-footer">
                    <button
                      type="button"
                      onClick={handleCloseApplyModal}
                      className="sb-modal-cancel-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="sb-modal-primary-btn"
                    >
                      <Send size={15} />
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals & Components */}
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Footer onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />
      <WhatsAppButton />
    </div>
  );
}
