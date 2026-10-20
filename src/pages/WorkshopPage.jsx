import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BrochureModal from '../components/BrochureModal';
import QuoteModal from '../components/QuoteModal';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import '../pages.css';
import { Calendar, Users, Award, ArrowUpRight, Sparkles, CheckCircle, Bookmark } from 'lucide-react';

const WS_TYPES = {
  IT: ['Web Development Workshop', 'Full Stack Development', 'Python & Data Science', 'React & Frontend Development', 'Backend API Development', 'Cloud Computing (AWS/Azure)', 'AI & Machine Learning', 'Mobile App Development', 'Cybersecurity Fundamentals'],
  'Non-IT': ['Digital Marketing Workshop', 'Social Media Marketing', 'Google & Meta Ads', 'Content Creation & Strategy', 'SEO & SEM Workshop', 'Business Development', 'HR & Talent Management', 'Graphic Design with AI', 'Video Editing & Production'],
};

const FEATURED_WORKSHOPS = [
  {
    title: 'Full-Stack GenAI & RAG Bootcamp',
    mode: 'Live Hybrid • 2 Days',
    audience: 'Engineering Students & Developers',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    highlights: ['Build custom AI Agents', 'Vector Databases & APIs', 'Live Project Deployment'],
  },
  {
    title: 'Modern Cloud & DevOps Masterclass',
    mode: 'Hands-On Lab • 3 Days',
    audience: 'CS/IT Students & Freshers',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    highlights: ['Docker & CI/CD Pipelines', 'AWS Deployment Architecture', 'Industry Case Studies'],
  },
  {
    title: 'Performance Marketing & Growth Hacking',
    mode: 'Interactive Workshop • 2 Days',
    audience: 'Management & Marketing Enthusiasts',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    highlights: ['Live Meta & Google Ad Setup', 'Conversion Funnel Audits', 'Analytics & Attribution'],
  },
];

export default function WorkshopPage() {
  const navigate = useNavigate();
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({ name: '', phone: '', email: '', category: '', type: '', date: '', hours: '', time: '', terms: false });
  const [types, setTypes] = useState([]);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState({ msg: '', kind: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTypes(WS_TYPES[form.category] || []);
    setForm((f) => ({ ...f, type: '' }));
  }, [form.category]);

  useEffect(() => {
    setPrice(form.hours === '1 Day' ? 999 : form.hours === '2 Days' ? 1499 : 0);
  }, [form.hours]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) { setStatus({ msg: 'Please agree to the Terms & Conditions.', kind: 'error' }); return; }
    setLoading(true); setStatus({ msg: '', kind: '' });
    try {
      const or = await fetch('/create-order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: price, name: form.name, email: form.email, phone: form.phone, type: 'workshop' }) });
      const od = await or.json();
      if (!od.order_token && !od.payment_session_id) { setStatus({ msg: 'Payment gateway error. Try again.', kind: 'error' }); setLoading(false); return; }
      await fetch('/save-workshop', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, workshop_mode: form.hours, workshop_category: form.category, workshop_type: form.type, workshop_date: form.date, workshop_time: form.time, amount: price, order_id: od.order_id || '' }) });
      if (window.Cashfree) {
        const cf = window.Cashfree({ mode: window.CASHFREE_MODE || 'production', appId: window.CASHFREE_APP_ID });
        const result = await cf.checkout({ paymentSessionId: od.order_token || od.payment_session_id, redirectTarget: '_modal', returnUrl: `${window.location.origin}/workshop-success` });
        if (result && !result.error) navigate('/workshop-success');
        else setStatus({ msg: '❌ Payment not completed. Please try again.', kind: 'error' });
      } else {
        setStatus({ msg: 'Payment gateway not loaded. Refresh and try again.', kind: 'error' });
      }
    } catch (err) {
      setStatus({ msg: 'Error: ' + (err.message || 'Something went wrong.'), kind: 'error' });
    } finally { setLoading(false); }
  };

  return (
    <div className="cp-page">
      <Navbar onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />

      <div className="wp-outer">

        {/* ── Hero Banner ── */}
        <div className="wp-hero-banner">
          <div className="wp-hero-glow" />
          <div className="wp-hero-content">
            <span className="wp-hero-badge">
              <Sparkles size={13} />
              Institutional &amp; Corporate Workshops
            </span>
            <h1>Empower Your Campus With Hands-On Tech Workshops</h1>
            <p>
              We partner with colleges and organizations to deliver intensive, project-driven workshops
              led by practicing engineers and industry mentors.
            </p>
            <div className="wp-hero-actions">
              <a href="#book-workshop" className="wp-hero-cta">
                Host a Workshop at Your College
              </a>
              <div className="wp-hero-cert">
                <Award size={15} className="wp-cert-icon" />
                Verified Participation Certificates Included
              </div>
            </div>
          </div>
        </div>

        {/* ── Featured Workshop Cards ── */}
        <div className="wp-cards-grid">
          {FEATURED_WORKSHOPS.map((ws, i) => (
            <div className="wp-card" key={i}>
              <div className="wp-card-img-wrap">
                <img src={ws.image} alt={ws.title} className="wp-card-img" />
                <span className="wp-card-mode-badge">
                  <Calendar size={13} />
                  {ws.mode}
                </span>
              </div>
              <div className="wp-card-body">
                <div className="wp-card-audience">
                  <Users size={13} />
                  {ws.audience}
                </div>
                <h3 className="wp-card-title">{ws.title}</h3>
                <ul className="wp-highlights">
                  {ws.highlights.map((h, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} className="wp-check-icon" />
                      {h}
                    </li>
                  ))}
                </ul>
                <button className="wp-card-btn">
                  Request Syllabus &amp; Pricing
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Booking Form ── */}
        <div className="wp-booking-wrap" id="book-workshop">
          <div className="wp-booking-header">
            <div className="wp-booking-badge">
              <Bookmark size={13} />
              Book Your Slot
            </div>
            <h2>Workshop Booking</h2>
            <p>Schedule your professional workshop and receive a certificate after completion.</p>
          </div>

          <div className="wp-booking-card">
            <form className="lp-workshop-form" onSubmit={handleSubmit}>
              {/* Row 1: Name, Phone, Email (3 columns) */}
              <input className="lp-ws-input" placeholder="Full Name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
              <input className="lp-ws-input" type="tel" placeholder="Phone Number" maxLength="10" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
              <input className="lp-ws-input" type="email" placeholder="Email Address" value={form.email} onChange={(e) => set('email', e.target.value)} required />

              {/* Row 2: Category, Type, Date (3 columns) */}
              <select className="lp-ws-select" value={form.category} onChange={(e) => set('category', e.target.value)} required>
                <option value="">Select Category</option>
                <option value="IT">IT Workshops</option>
                <option value="Non-IT">Non-IT Workshops</option>
              </select>
              <select className="lp-ws-select" value={form.type} onChange={(e) => set('type', e.target.value)} required>
                <option value="">Select Workshop Type</option>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input className="lp-ws-input" type="date" min={today} value={form.date} onChange={(e) => set('date', e.target.value)} required />

              {/* Row 3: Mode, Time, empty col */}
              <select className="lp-ws-select" value={form.hours} onChange={(e) => set('hours', e.target.value)} required>
                <option value="">Select Workshop Mode</option>
                <option value="1 Day">One Day Workshop - ₹999</option>
                <option value="2 Days">Two Day Workshop - ₹1499</option>
              </select>
              <select className="lp-ws-select" value={form.time} onChange={(e) => set('time', e.target.value)} required>
                <option value="">Select Time Slot</option>
                <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
              </select>
              <div className="lp-ws-col-empty" aria-hidden="true" />

              {/* Full-width elements */}
              <div className="lp-slot-info">⚡ Limited Seats Available Per Slot</div>
              <div className="lp-payment-info">
                <h3>Workshop Fee: ₹{price}</h3>
              </div>
              <div className="lp-ws-terms">
                <input type="checkbox" id="ws-terms" checked={form.terms} onChange={(e) => set('terms', e.target.checked)} required />
                <label htmlFor="ws-terms">I agree to the Terms &amp; Conditions and Refund Policy</label>
              </div>
              {status.msg && (
                <div className={`lp-ws-status ${status.kind}`}>{status.msg}</div>
              )}
              <button type="submit" className="lp-ws-book-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Book Workshop'}
              </button>
              <p className="lp-cert-info">🎓 Certificate Provided After Completion</p>
            </form>
          </div>
        </div>

      </div>

      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Footer onOpenBrochure={() => setIsBrochureOpen(true)} onOpenQuote={() => setIsQuoteOpen(true)} />
      <WhatsAppButton />
    </div>
  );
}
