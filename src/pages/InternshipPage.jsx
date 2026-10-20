import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrochureModal from '../components/BrochureModal';
import QuoteModal from '../components/QuoteModal';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import '../pages.css';
import { Rocket, Clock, ArrowRight, Code, Briefcase } from 'lucide-react';

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSE_DETAILS = {
  frontend: {
    title: 'Frontend Developer Intern', duration: '45 Days', icon: '🎨',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    description: 'Work on modern responsive UI projects and real-time frontend applications.',
    outcomes: ['Master responsive UI design and modern CSS frameworks', 'Build interactive React applications with state management', 'Implement real-time features using WebSockets and APIs', 'Work with design systems and component libraries', 'Deploy frontend applications on cloud platforms'],
    prerequisites: 'Basic knowledge of HTML/CSS recommended',
    highlights: ['Live Projects', 'Hands-on Experience', 'Career Support'],
  },
  backend: {
    title: 'Backend Developer Intern', duration: '45 Days', icon: '⚙️',
    skills: ['Python', 'FastAPI', 'MySQL', 'APIs'],
    description: 'Build scalable backend systems, APIs, authentication, and secure server-side logic.',
    outcomes: ['Design and build RESTful APIs with FastAPI', 'Implement database design with MySQL optimization', 'Secure authentication and authorization systems', 'Deploy backend services on cloud infrastructure', 'Optimize database queries for high performance'],
    prerequisites: 'Basic Python knowledge recommended',
    highlights: ['Industry Standards', 'Real Databases', 'API Design'],
  },
  fullstack: {
    title: 'Full Stack Developer Intern', duration: '45 Days', icon: '🔒',
    skills: ['Python', 'React', 'MySQL', 'APIs'],
    description: 'Develop secure enterprise applications with payment-ready architecture and authentication best practices.',
    outcomes: ['Build end-to-end enterprise applications', 'Implement secure payment processing with Cashfree', 'Design scalable MySQL databases', 'Create production-ready APIs and microservices', 'Deploy applications with enterprise security standards'],
    prerequisites: 'Basic understanding of web development',
    highlights: ['Hands-on Experience', 'Payment Integration', 'Certificate of Completion'],
  },
  digitalmarketing: {
    title: 'Digital Marketing Internship', duration: '1 or 3 Months', icon: '📈',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Campaign Planning'],
    description: 'Learn comprehensive digital marketing strategies and campaign management.',
    outcomes: ['Create high-impact digital marketing campaigns', 'Analyze performance with analytics tools', 'Build content calendars and audience funnels', 'Optimize campaigns across channels', 'Produce measurable ROI-driven results'],
    prerequisites: 'Basic marketing familiarity or social media experience',
    highlights: ['Live Campaigns', 'Data-Driven Training', 'Performance Focus'],
  },
  googleads: {
    title: 'Meta & Google Ads Internship', duration: '1 or 3 Months', icon: '💡',
    skills: ['Google Ads', 'Meta Ads', 'PPC', 'Ad Optimization'],
    description: 'Master paid advertising platforms and optimize ad campaigns for maximum ROI.',
    outcomes: ['Build and scale search and social ad campaigns', 'Manage bidding, budgets, and targeting', 'Create conversion-focused ad creatives', 'Track campaign performance and optimize spend', 'Report results with clear ROI metrics'],
    prerequisites: 'Basic digital marketing or advertising interest',
    highlights: ['PPC Mastery', 'Ad Platform Skills', 'Revenue Growth'],
  },
  socialmedia: {
    title: 'Social Media Marketing Internship', duration: '1 or 3 Months', icon: '📱',
    skills: ['Social Strategy', 'Content Creation', 'Engagement', 'Brand Voice'],
    description: 'Build and manage social media presence across all major platforms.',
    outcomes: ['Develop social media strategies for growth', 'Create engaging content calendars', 'Engage audiences and build communities', 'Measure social performance with analytics', 'Run platform-specific campaigns and ads'],
    prerequisites: 'Familiarity with social media platforms',
    highlights: ['Content Strategy', 'Community Building', 'Brand Growth'],
  },
  aidesign: {
    title: 'AI Graphic Design Internship', duration: '1 or 3 Months', icon: '🎨',
    skills: ['AI Design', 'Branding', 'Canva', 'Figma'],
    description: 'Create stunning designs using AI-powered tools and modern design software.',
    outcomes: ['Design branded assets with AI workflows', 'Create social media and marketing graphics', 'Use design systems for consistent output', 'Collaborate on visual storytelling', 'Deliver polished design projects'],
    prerequisites: 'Basic graphic design or visual creativity',
    highlights: ['AI Design Tools', 'Portfolio Work', 'Creative Production'],
  },
  aivideo: {
    title: 'AI Video Design Internship', duration: '1 or 3 Months', icon: '🎬',
    skills: ['Video Editing', 'AI Tools', 'Motion Graphics', 'Storyboarding'],
    description: 'Master video production and AI-powered video design for marketing campaigns.',
    outcomes: ['Produce AI-enhanced marketing videos', 'Edit and animate video content', 'Apply motion graphics for storytelling', 'Optimize videos for social channels', 'Deliver professional video assets'],
    prerequisites: 'Basic video editing or storytelling interest',
    highlights: ['Video Automation', 'Creative Motion', 'Campaign Videos'],
  },
  seosem: {
    title: 'SEO & SEM Internship', duration: '1 or 3 Months', icon: '🔎',
    skills: ['SEO', 'SEM', 'Keywords', 'Analytics'],
    description: 'Learn search engine optimization and marketing to drive organic and paid traffic.',
    outcomes: ['Optimize websites for search visibility', 'Run SEM campaigns with targeted budgets', 'Conduct keyword research and audits', 'Measure search performance and growth', 'Build sustainable traffic strategies'],
    prerequisites: 'Basic understanding of search marketing',
    highlights: ['Search Growth', 'Organic & Paid', 'Traffic Strategy'],
  },
  operations: {
    title: 'Business Operations & Sales Internship', duration: '1 or 3 Months', icon: '💼',
    skills: ['Sales', 'CRM', 'Operations', 'Process'],
    description: 'Develop business operations and sales skills for enterprise growth and customer success.',
    outcomes: ['Support sales operations and CRM workflows', 'Learn business process optimization', 'Manage client relationships and sales pipelines', 'Improve operational efficiency', 'Deliver better customer experiences'],
    prerequisites: 'Interest in business operations or sales',
    highlights: ['Operations Excellence', 'Sales Support', 'Business Growth'],
  },
  hrhr: {
    title: 'HR Human Resource Internship', duration: '1 or 3 Months', icon: '🧑‍💼',
    skills: ['HR', 'Recruitment', 'Culture', 'Compliance'],
    description: 'Master HR functions including recruitment, compliance, and employee development.',
    outcomes: ['Manage hiring and onboarding workflows', 'Support employee engagement initiatives', 'Implement HR policies and compliance', 'Train and mentor team members', 'Coordinate talent development programs'],
    prerequisites: 'Basic HR interest or people management skills',
    highlights: ['People Operations', 'Talent Support', 'HR Best Practices'],
  },
  bizdev: {
    title: 'Business Development Internship', duration: '1 or 3 Months', icon: '🤝',
    skills: ['Strategy', 'Business Growth', 'Partnerships', 'Analysis'],
    description: 'Learn business development strategies, partnerships, and growth hacking techniques.',
    outcomes: ['Identify growth opportunities and partnerships', 'Support business outreach and negotiations', 'Analyze markets and customer needs', 'Build go-to-market strategies', 'Drive revenue initiatives'],
    prerequisites: 'Interest in business strategy and growth',
    highlights: ['Growth Strategy', 'Partnership Building', 'Revenue Focus'],
  },
};

const CARD_IMAGES = {
  frontend: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
  backend: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  fullstack: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  digitalmarketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  googleads: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  socialmedia: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
  aidesign: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  aivideo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  seosem: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  operations: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  hrhr: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  bizdev: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
};

const IT_INTERNSHIPS = ['frontend', 'backend', 'fullstack'];
const NONIT_INTERNSHIPS = ['digitalmarketing', 'googleads', 'socialmedia', 'aidesign', 'aivideo', 'seosem', 'operations', 'hrhr', 'bizdev'];

// ─── Internship Card ──────────────────────────────────────────────────────────
function InternCard({ courseKey, onDetails, onApply }) {
  const c = COURSE_DETAILS[courseKey];
  return (
    <div className="ip-intern-card">
      <div className="ip-card-img-wrap">
        <img
          className="ip-card-img"
          src={CARD_IMAGES[courseKey]}
          alt={c.title}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80'; }}
        />
        <div className="ip-card-img-overlay" />
        <span className="ip-card-dur-badge">
          <Clock size={13} />
          {c.duration}
        </span>
      </div>
      <div className="ip-card-body">
        <h3 className="ip-card-title">{c.title}</h3>
        <div className="ip-skill-pills">
          {c.skills.map((s) => (
            <span className="ip-skill-pill" key={s}>{s}</span>
          ))}
        </div>
        <p className="ip-card-text">{c.description}</p>
        <div className="ip-card-footer">
          <button className="ip-details-btn" onClick={() => onDetails(courseKey)}>
            View Details <ArrowRight size={14} />
          </button>
          <button className="ip-apply-btn" onClick={() => onApply(c.title)}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Course Details Modal ─────────────────────────────────────────────────────
function CourseDetailsModal({ courseKey, onClose, onApply }) {
  const c = COURSE_DETAILS[courseKey];
  if (!c) return null;
  return (
    <div className="lp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lp-details-modal">
        <button className="lp-modal-close" onClick={onClose}>✕</button>
        <div className="lp-modal-head">
          <span className="lp-modal-icon">{c.icon}</span>
          <div>
            <h2>{c.title}</h2>
            <span className="lp-dur-tag">⏳ {c.duration}</span>
          </div>
        </div>
        <div className="lp-modal-section">
          <h3>📚 About This Program</h3>
          <p>{c.description}</p>
        </div>
        <div className="lp-modal-section">
          <h3>🛠️ Tech Stack</h3>
          <div className="lp-skill-tags">
            {c.skills.map((s) => <span key={s} className="lp-skill-tag">{s}</span>)}
          </div>
        </div>
        <div className="lp-modal-section">
          <h3>🎯 What You'll Learn</h3>
          <ul className="lp-outcome-list">
            {c.outcomes.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </div>
        <div className="lp-modal-section">
          <h3>⭐ Program Highlights</h3>
          <div className="lp-highlight-tags">
            {c.highlights.map((h) => <span key={h} className="lp-highlight-tag">{h}</span>)}
          </div>
        </div>
        <div className="lp-modal-section">
          <h3>📋 Prerequisites</h3>
          <p>{c.prerequisites}</p>
        </div>
        <button className="lp-modal-apply-btn" onClick={() => { onClose(); onApply(c.title); }}>
          Apply Now →
        </button>
      </div>
    </div>
  );
}

// ─── Apply Modal (OTP + Cashfree) ─────────────────────────────────────────────
function ApplyModal({ title, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('form');
  const [fd, setFd] = useState({ full_name: '', email: '', mobile: '' });
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setFd((p) => ({ ...p, [k]: v }));

  const sendOtp = async () => {
    if (!fd.full_name.trim() || !fd.email.trim() || fd.mobile.length < 10) {
      setMsg('Please fill all fields with a valid 10-digit mobile number.'); return;
    }
    setLoading(true); setMsg('');
    try {
      const r = await fetch('/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: fd.mobile }) });
      const d = await r.json();
      if (d.status === 'success') { setStep('otp'); setMsg('OTP sent to your mobile.'); }
      else setMsg(d.message || 'Failed to send OTP.');
    } catch { setMsg('Network error. Try again.'); }
    finally { setLoading(false); }
  };

  const verifyAndPay = async () => {
    if (!otp || otp.length < 6) { setMsg('Enter the 6-digit OTP.'); return; }
    setLoading(true); setMsg('');
    try {
      const vr = await fetch('/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: fd.mobile, otp }) });
      const vd = await vr.json();
      if (vd.status !== 'success') { setMsg(vd.message || 'Invalid OTP.'); setLoading(false); return; }
      const sr = await fetch('/save-internship', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ full_name: fd.full_name, email: fd.email, mobile: fd.mobile, internship_role: title }) });
      const sd = await sr.json();
      const or = await fetch('/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: 999, name: fd.full_name, email: fd.email, phone: fd.mobile, type: 'internship', internship_id: sd.id }) });
      const od = await or.json();
      if (window.Cashfree && (od.payment_session_id || od.order_token)) {
        const cf = window.Cashfree({ mode: window.CASHFREE_MODE || 'production', appId: window.CASHFREE_APP_ID });
        const result = await cf.checkout({ paymentSessionId: od.order_token || od.payment_session_id, redirectTarget: '_modal', returnUrl: `${window.location.origin}/internship-success` });
        if (result && !result.error) navigate('/internship-success');
        else setMsg('Payment not completed. Please try again.');
      } else { setMsg('Payment gateway not available. Contact support.'); }
    } catch (err) { setMsg('Error: ' + (err.message || 'Something went wrong.')); }
    finally { setLoading(false); }
  };

  return (
    <div className="lp-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lp-apply-modal-box">
        <div className="lp-modal-left">
          <h2>Secure Internship Application</h2>
          <p>Your details are protected with OTP verification and secure payment processing.</p>
          <ul>
            <li>✅ Secure OTP Verification</li>
            <li>✅ Cashfree Secure Payment</li>
            <li>✅ Enterprise Level Security</li>
          </ul>
        </div>
        <div className="lp-modal-right">
          <h3>{title}</h3>
          <input placeholder="Full Name" value={fd.full_name} onChange={(e) => update('full_name', e.target.value)} disabled={step === 'otp'} />
          <input type="email" placeholder="Email Address" value={fd.email} onChange={(e) => update('email', e.target.value)} disabled={step === 'otp'} />
          <input type="tel" placeholder="Mobile Number" maxLength="10" value={fd.mobile} onChange={(e) => update('mobile', e.target.value)} disabled={step === 'otp'} />
          {step === 'otp' && (
            <>
              <input placeholder="Enter 6-digit OTP" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className="lp-modal-action-btn" onClick={verifyAndPay} disabled={loading}>{loading ? 'Processing...' : 'Verify OTP & Pay ₹999'}</button>
              <button className="lp-modal-cancel-btn" onClick={() => setStep('form')} disabled={loading}>← Back</button>
            </>
          )}
          {step === 'form' && (
            <button className="lp-modal-action-btn" onClick={sendOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Submit Application'}</button>
          )}
          {msg && <div className="lp-modal-status">{msg}</div>}
          <button className="lp-modal-cancel-btn" style={{ marginTop: '8px' }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InternshipPage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [detailsKey, setDetailsKey] = useState(null);
  const [applyTitle, setApplyTitle] = useState(null);
  const [filter, setFilter] = useState('all');

  return (
    <div className="cp-page">
      <Navbar onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />

      <section className="ip-section">
        <div className="ip-section-inner">

          {/* Header */}
          <div className="ip-header">
            <div className="ip-badge">
              <Rocket size={15} />
              Internship Program
            </div>
            <h1>Kickstart Your Career With Real-Time Industry Projects</h1>
            <p>
              Learn from industry experts, build production-ready live projects, and gain hands-on
              experience with enterprise development standards.
            </p>

            {/* Filter tabs */}
            <div className="ip-filter-tabs">
              <button
                className={`ip-tab ${filter === 'all' ? 'ip-tab-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Tracks
              </button>
              <button
                className={`ip-tab ${filter === 'it' ? 'ip-tab-active' : ''}`}
                onClick={() => setFilter('it')}
              >
                <Code size={13} /> IT Programs
              </button>
              <button
                className={`ip-tab ${filter === 'non-it' ? 'ip-tab-active' : ''}`}
                onClick={() => setFilter('non-it')}
              >
                <Briefcase size={13} /> Non-IT Programs
              </button>
            </div>
          </div>

          {/* IT Internships */}
          {(filter === 'all' || filter === 'it') && (
            <div className="ip-grid-wrap">
              <div className="ip-cards-grid">
                {IT_INTERNSHIPS.map((k) => (
                  <InternCard key={k} courseKey={k} onDetails={setDetailsKey} onApply={setApplyTitle} />
                ))}
              </div>
            </div>
          )}

          {/* Non-IT Internships */}
          {(filter === 'all' || filter === 'non-it') && (
            <div className="ip-grid-wrap">
              <div className="ip-sub-header">
                <h2>Non-IT Internship Programs</h2>
                <p>Master digital marketing, growth analytics, brand design, and core business skills.</p>
              </div>
              <div className="ip-cards-grid">
                {NONIT_INTERNSHIPS.map((k) => (
                  <InternCard key={k} courseKey={k} onDetails={setDetailsKey} onApply={setApplyTitle} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Modals */}
      {detailsKey && (
        <CourseDetailsModal courseKey={detailsKey} onClose={() => setDetailsKey(null)} onApply={(t) => { setDetailsKey(null); setApplyTitle(t); }} />
      )}
      {applyTitle && <ApplyModal title={applyTitle} onClose={() => setApplyTitle(null)} />}

      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Footer onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />
      <WhatsAppButton />
    </div>
  );
}
