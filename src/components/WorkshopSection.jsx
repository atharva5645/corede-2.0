import React, { useState, useEffect } from 'react';

const workshopTypes = {
  IT: [
    'Web Development Workshop', 'Full Stack Development', 'Python & Data Science',
    'React & Frontend Development', 'Backend API Development', 'Cloud Computing (AWS/Azure)',
    'AI & Machine Learning', 'Mobile App Development', 'Cybersecurity Fundamentals',
  ],
  'Non-IT': [
    'Digital Marketing Workshop', 'Social Media Marketing', 'Google & Meta Ads',
    'Content Creation & Strategy', 'SEO & SEM Workshop', 'Business Development',
    'HR & Talent Management', 'Graphic Design with AI', 'Video Editing & Production',
  ],
};

const pricing = { '1 Day': 999, '2 Days': 1499 };

export default function WorkshopSection() {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: '', type: '', date: '', hours: '', time: '', terms: false });
  const [availableTypes, setAvailableTypes] = useState([]);
  const [price, setPrice] = useState(999);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (form.category) { setAvailableTypes(workshopTypes[form.category] || []); setForm((f) => ({ ...f, type: '' })); }
  }, [form.category]);

  useEffect(() => {
    if (form.hours) setPrice(pricing[form.hours] || 999);
  }, [form.hours]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) { setStatus('Please agree to the Terms & Conditions.'); return; }
    setLoading(true); setStatus('');
    try {
      const orderRes = await fetch('/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price, name: form.name, email: form.email, phone: form.phone, type: 'workshop' }),
      });
      const order = await orderRes.json();
      if (!order.order_token && !order.payment_session_id) { setStatus('Payment gateway error. Please try again.'); setLoading(false); return; }
      await fetch('/save-workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, workshop_mode: form.hours, workshop_category: form.category, workshop_type: form.type, workshop_date: form.date, workshop_time: form.time, amount: price, order_id: order.order_id || '' }),
      });
      if (window.Cashfree) {
        const cashfree = window.Cashfree({ mode: window.CASHFREE_MODE || 'production', appId: window.CASHFREE_APP_ID });
        const result = await cashfree.checkout({ paymentSessionId: order.order_token || order.payment_session_id, redirectTarget: '_modal', returnUrl: window.location.href });
        if (result && !result.error) {
          setStatus('✅ Workshop booked successfully! Check your email for confirmation.');
          setForm({ name: '', phone: '', email: '', category: '', type: '', date: '', hours: '', time: '', terms: false });
        } else { setStatus('❌ Payment was not completed. Please try again.'); }
      } else { setStatus('Payment gateway not loaded. Please refresh and try again.'); }
    } catch (err) { setStatus('Error: ' + (err.message || 'Something went wrong.')); }
    finally { setLoading(false); }
  };

  return (
    <div id="workshop">
      <section className="workshop-section">
        <div className="workshop-container">
          <h1>Workshop Booking</h1>
          <p>Schedule your professional workshop and receive certificate after completion.</p>

          <form id="workshopForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" maxLength="10" value={form.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />

            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="IT">IT Workshops</option>
              <option value="Non-IT">Non-IT Workshops</option>
            </select>

            <select name="type" value={form.type} onChange={handleChange} required>
              <option value="">Select Workshop Type</option>
              {availableTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>

            <input type="date" name="date" min={today} value={form.date} onChange={handleChange} required />

            <select name="hours" value={form.hours} onChange={handleChange} required>
              <option value="">Select Workshop Mode</option>
              <option value="1 Day">One Day Workshop - ₹999</option>
              <option value="2 Days">Two Day Workshop - ₹1499</option>
            </select>

            <select name="time" value={form.time} onChange={handleChange} required>
              <option value="">Select Time Slot</option>
              <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
              <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
              <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
              <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
              <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
              <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
            </select>

            <div className="slot-info">Limited Seats Available Per Slot</div>

            <div className="payment-info">
              <h3 id="priceText">Workshop Fee: ₹{price}</h3>
            </div>

            <div className="terms-box">
              <input type="checkbox" id="ws-terms" name="terms" checked={form.terms} onChange={handleChange} required />
              <label htmlFor="ws-terms">I agree to the Terms &amp; Conditions and Refund Policy</label>
            </div>

            {status && (
              <p style={{ color: status.startsWith('✅') ? '#22c55e' : '#f59e0b', fontSize: '0.9rem', margin: '8px 0', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                {status}
              </p>
            )}

            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Book Workshop'}</button>
            <p className="certificate-info">🎓 Certificate Provided After Completion</p>
          </form>
        </div>
      </section>
    </div>
  );
}
