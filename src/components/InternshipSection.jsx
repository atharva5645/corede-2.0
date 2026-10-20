import React, { useState } from 'react';

const courseData = {
  frontend: {
    title: 'Frontend Developer Intern',
    duration: '45 Days', skills: 'HTML • CSS • JavaScript • React',
    description: 'Work on modern responsive UI projects and real-time frontend applications.',
    curriculum: ['HTML5 & CSS3 Fundamentals', 'JavaScript ES6+ & DOM', 'React Components & Hooks', 'Responsive Design', 'API Integration & Fetch', 'Real-time Project Deployment'],
  },
  backend: {
    title: 'Backend Developer Intern',
    duration: '45 Days', skills: 'Python • FastAPI • MySQL • APIs',
    description: 'Build scalable backend systems, APIs, authentication, and secure server-side logic.',
    curriculum: ['Python Core & OOP', 'FastAPI / Flask Framework', 'MySQL Database Design', 'REST API Development', 'Authentication & JWT', 'Cloud Deployment (AWS/Azure)'],
  },
  fullstack: {
    title: 'Full Stack Developer Intern',
    duration: '45 Days', skills: 'Python • React • SQL • APIs',
    description: 'Develop secure enterprise applications with payment-ready architecture.',
    curriculum: ['Frontend: React + Tailwind', 'Backend: Python FastAPI', 'Database: MySQL + MongoDB', 'REST & GraphQL APIs', 'Payment Gateway Integration', 'Deployment & CI/CD'],
  },
  digitalmarketing: {
    title: 'Digital Marketing Internship', duration: '45 Days', skills: 'Marketing • Content • Strategy • Analytics',
    description: 'Learn comprehensive digital marketing strategies and campaign management.',
    curriculum: ['Marketing Fundamentals', 'Content Creation & Strategy', 'Social Media Marketing', 'Google & Meta Ads', 'Analytics & Reporting', 'Campaign Optimization'],
  },
  googleads: {
    title: 'Meta & Google Ads Internship', duration: '45 Days', skills: 'Google Ads • Meta Ads',
    description: 'Master paid advertising platforms and optimize ad campaigns for maximum ROI.',
    curriculum: ['Google Ads Account Setup', 'Campaign Types & Bidding', 'Meta Ads Manager', 'Audience Targeting', 'A/B Testing Strategies', 'ROAS Optimization'],
  },
  socialmedia: {
    title: 'Social Media Marketing Internship', duration: '45 Days', skills: 'Social Media • Content • Engagement',
    description: 'Build and manage social media presence across all major platforms.',
    curriculum: ['Platform Strategy (Instagram, LinkedIn, YouTube)', 'Content Calendar Planning', 'Reels & Short-form Video', 'Community Management', 'Analytics & KPIs', 'Influencer Outreach'],
  },
  aidesign: {
    title: 'AI Graphic Design Internship', duration: '45 Days', skills: 'AI Tools • Canva • Figma • Design',
    description: 'Create stunning designs using AI-powered tools and modern design software.',
    curriculum: ['Canva & Figma Basics', 'AI Design Tools (MidJourney, Firefly)', 'Brand Identity Design', 'Social Media Creatives', 'Motion Graphics Basics', 'Portfolio Development'],
  },
  aivideo: {
    title: 'AI Video Design Internship', duration: '45 Days', skills: 'Video Editing • AI Tools • Animation',
    description: 'Master video production and AI-powered video design for marketing campaigns.',
    curriculum: ['Video Editing (Premiere / CapCut)', 'AI Video Generation', 'Motion Graphics & After Effects', 'YouTube & Reels Production', 'Color Grading', 'Content Delivery Strategy'],
  },
  seosem: {
    title: 'SEO & SEM Internship', duration: '45 Days', skills: 'SEO • SEM • Keywords • Ranking',
    description: 'Learn search engine optimization and marketing to drive organic and paid traffic.',
    curriculum: ['On-Page & Off-Page SEO', 'Keyword Research (Ahrefs, SEMrush)', 'Technical SEO Audits', 'Google Search Console', 'Link Building Strategies', 'Local & AI SEO'],
  },
  operations: {
    title: 'Business Operations & Sales Internship', duration: '45 Days', skills: 'Sales • Operations • CRM',
    description: 'Develop business operations and sales skills for enterprise growth.',
    curriculum: ['Sales Fundamentals & Pipeline', 'CRM Tools (HubSpot / Zoho)', 'Business Process Optimization', 'Customer Success Management', 'Data-driven Decision Making', 'Presentations & Reporting'],
  },
  hrhr: {
    title: 'HR Human Resource Internship', duration: '45 Days', skills: 'Recruitment • HR • Compliance • Culture',
    description: 'Master HR functions including recruitment, compliance, and employee development.',
    curriculum: ['Recruitment & Talent Acquisition', 'HR Policies & Compliance', 'Employee Onboarding', 'Performance Management', 'Payroll Basics', 'Culture & Engagement'],
  },
  bizdev: {
    title: 'Business Development Internship', duration: '45 Days', skills: 'Strategy • Partnership • Growth',
    description: 'Learn business development strategies, partnerships, and growth hacking techniques.',
    curriculum: ['Market Research & Analysis', 'Lead Generation Strategies', 'Proposal & Pitch Development', 'Partnership Building', 'Growth Hacking Techniques', 'B2B Sales Mastery'],
  },
};

const itInternships = [
  { key: 'frontend', title: 'Frontend Developer Intern', duration: '45 Days', skills: 'HTML • CSS • JavaScript • React', desc: 'Work on modern responsive UI projects and real-time frontend applications.' },
  { key: 'backend', title: 'Backend Developer Intern', duration: '45 Days', skills: 'Python • FastAPI • MySQL • APIs', desc: 'Build scalable backend systems, APIs, authentication, and secure server-side logic.' },
  { key: 'fullstack', title: 'Full Stack Developer Intern', duration: '45 Days', skills: 'Python • React • SQL • APIs', desc: 'Develop secure enterprise applications with payment-ready architecture and authentication best practices.' },
];

const nonItInternships = [
  { key: 'digitalmarketing', title: 'Digital Marketing Internship', duration: '45 Days', skills: 'Marketing • Content • Strategy • Analytics', desc: 'Learn comprehensive digital marketing strategies and campaign management.' },
  { key: 'googleads', title: 'Meta & Google Ads Internship', duration: '45 Days', skills: 'Google Ads • Meta Ads', desc: 'Master paid advertising platforms and optimize ad campaigns for maximum ROI.' },
  { key: 'socialmedia', title: 'Social Media Marketing Internship', duration: '45 Days', skills: 'Social Media • Content Creation • Engagement', desc: 'Build and manage social media presence across all major platforms.' },
  { key: 'aidesign', title: 'AI Graphic Design Internship', duration: '45 Days', skills: 'AI Tools • Design • Canva • Figma', desc: 'Create stunning designs using AI-powered tools and modern design software.' },
  { key: 'aivideo', title: 'AI Video Design Internship', duration: '45 Days', skills: 'Video Editing • AI Tools • Animation', desc: 'Master video production and AI-powered video design for marketing campaigns.' },
  { key: 'seosem', title: 'SEO & SEM Internship', duration: '45 Days', skills: 'SEO • SEM • Keywords • Ranking • Traffic', desc: 'Learn search engine optimization and marketing to drive organic and paid traffic.' },
  { key: 'operations', title: 'Business Operations & Sales Internship', duration: '45 Days', skills: 'Sales • Operations • CRM • Business Process', desc: 'Develop business operations and sales skills for enterprise growth.' },
  { key: 'hrhr', title: 'HR Human Resource Internship', duration: '45 Days', skills: 'Recruitment • HR • Compliance • Culture', desc: 'Master HR functions including recruitment, compliance, and employee development.' },
  { key: 'bizdev', title: 'Business Development Internship', duration: '45 Days', skills: 'Strategy • Partnership • Growth • Market Analysis', desc: 'Learn business development strategies, partnerships, and growth hacking techniques.' },
];

export default function InternshipSection() {
  const [detailsModal, setDetailsModal] = useState(null);
  const [applyModal, setApplyModal] = useState(null);
  const [applyStep, setApplyStep] = useState('form');
  const [formData, setFormData] = useState({ full_name: '', email: '', mobile: '' });
  const [otp, setOtp] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const openApply = (title) => {
    setApplyModal(title);
    setApplyStep('form');
    setFormData({ full_name: '', email: '', mobile: '' });
    setOtp('');
    setStatusMsg('');
  };

  const handleSendOtp = async () => {
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.mobile || formData.mobile.length < 10) {
      setStatusMsg('Please fill all fields with a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setApplyStep('otp');
        setStatusMsg('OTP sent to your mobile number.');
      } else {
        setStatusMsg(data.message || 'Failed to send OTP.');
      }
    } catch {
      setStatusMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndPay = async () => {
    if (!otp || otp.length < 6) { setStatusMsg('Enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      const verifyRes = await fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp }),
      });
      const verifyData = await verifyRes.json();
      if (verifyData.status !== 'success') {
        setStatusMsg(verifyData.message || 'Invalid OTP. Please try again.');
        setLoading(false);
        return;
      }
      const saveRes = await fetch('/save-internship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: formData.full_name, email: formData.email, mobile: formData.mobile, internship_role: applyModal }),
      });
      const saveData = await saveRes.json();
      const orderRes = await fetch('/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 999, name: formData.full_name, email: formData.email, phone: formData.mobile, type: 'internship', internship_id: saveData.id }),
      });
      const order = await orderRes.json();
      if (window.Cashfree && (order.payment_session_id || order.order_token)) {
        const cashfree = window.Cashfree({ mode: window.CASHFREE_MODE || 'production', appId: window.CASHFREE_APP_ID });
        const result = await cashfree.checkout({ paymentSessionId: order.order_token || order.payment_session_id, redirectTarget: '_modal', returnUrl: window.location.href });
        if (result && !result.error) {
          setApplyStep('success');
          setStatusMsg('Payment successful! Your internship application is confirmed.');
        } else {
          setStatusMsg('Payment was not completed. Please try again.');
        }
      } else {
        setStatusMsg('Payment gateway not available. Please contact support.');
      }
    } catch (err) {
      setStatusMsg('Error: ' + (err.message || 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };

  const InternCard = ({ i }) => (
    <div className="internship-card">
      <div className="card-shine"></div>
      <div className="card-top">
        <h3>{i.title}</h3>
        <span className="duration">⏳ {i.duration}</span>
      </div>
      <div className="i-skills">{i.skills}</div>
      <p className="card-text">{i.desc}</p>
      <div className="button-group">
        <button className="view-details-btn" onClick={() => setDetailsModal(i.key)}>View Details →</button>
        <button className="apply-btn" onClick={() => openApply(i.title)}>Apply Now</button>
      </div>
    </div>
  );

  return (
    <div id="internship">
      <section className="internship-section">
        <div className="internship-header">
          <span className="sec-badge">🚀 Internship Program</span>
          <h2>Kickstart Your Career With Real-Time Industry Projects</h2>
          <p>Learn from experts, build live projects, and gain practical experience with secure enterprise-level development standards.</p>
        </div>

        {/* IT Internships */}
        <div className="internship-grid">
          {itInternships.map((i) => <InternCard key={i.key} i={i} />)}
        </div>

        {/* Non-IT Internships */}
        <div className="trainer-section">
          <h2>📊 Non-IT Internship Programs</h2>
          <p>Master digital marketing, design, business, and professional skills.</p>
          <div className="internship-grid">
            {nonItInternships.map((i) => <InternCard key={i.key} i={i} />)}
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      {detailsModal && courseData[detailsModal] && (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="details-modal-content">
            <button className="close-details-btn" onClick={() => setDetailsModal(null)}>✕</button>
            <div className="details-header">
              <h2>{courseData[detailsModal].title}</h2>
              <p><strong>Duration:</strong> {courseData[detailsModal].duration}</p>
              <p><strong>Skills:</strong> {courseData[detailsModal].skills}</p>
            </div>
            <div className="details-body">
              <p>{courseData[detailsModal].description}</p>
              <h4>Curriculum:</h4>
              <ul>{courseData[detailsModal].curriculum.map((item, i) => <li key={i}>✓ {item}</li>)}</ul>
              <button className="apply-btn" style={{ marginTop: '16px', padding: '10px 24px' }} onClick={() => { setDetailsModal(null); openApply(courseData[detailsModal].title); }}>Apply Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {applyModal && (
        <div style={{ display: 'flex', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="modal-box">
            <div className="modal-left">
              <h2>Secure Internship Application</h2>
              <p>Your details are protected with OTP verification and secure payment processing.</p>
              <ul>
                <li>✅ Secure OTP Verification</li>
                <li>✅ Cashfree Secure Payment</li>
                <li>✅ Enterprise Level Security</li>
              </ul>
            </div>
            <div className="modal-right">
              <h3>{applyModal}</h3>
              {applyStep === 'success' ? (
                <div className="form-success-msg" style={{ fontSize: '1rem', padding: '20px 0' }}>🎉 {statusMsg}</div>
              ) : (
                <>
                  <input type="text" placeholder="Full Name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} disabled={applyStep === 'otp'} />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={applyStep === 'otp'} />
                  <input type="tel" placeholder="Mobile Number" maxLength="10" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} disabled={applyStep === 'otp'} />
                  {applyStep === 'otp' && (
                    <>
                      <input type="text" placeholder="Enter 6-digit OTP" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} />
                      <button onClick={handleVerifyAndPay} disabled={loading}>{loading ? 'Processing...' : 'Verify OTP & Pay ₹999'}</button>
                      <button className="cancel-btn" onClick={() => setApplyStep('form')} disabled={loading}>Back</button>
                    </>
                  )}
                  {applyStep === 'form' && (
                    <button onClick={handleSendOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Submit Application'}</button>
                  )}
                </>
              )}
              {statusMsg && applyStep !== 'success' && (
                <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '8px' }}>{statusMsg}</p>
              )}
              <button className="cancel-btn" onClick={() => setApplyModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
