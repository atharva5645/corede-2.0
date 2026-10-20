import React, { useState, useRef } from 'react';

export default function CareersSection() {
  const [formStatus, setFormStatus] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = formRef.current;
    const formData = new FormData(form);

    // Basic validation
    let valid = true;
    const fields = ['career-name', 'career-email', 'career-phone', 'career-position'];
    fields.forEach((id) => {
      const el = document.getElementById(id);
      const errId = id.replace('career-', '') + 'Error';
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
      const res = await fetch('/apply', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'success') {
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
    <div id="careers">
      {/* Career Hero */}
      <section className="career-hero">
        <div className="hero-content">
          <span className="sec-badge">● Now Hiring</span>
          <h1>Build the Future with Us</h1>
          <p>
            At Corede Technologies, we're looking for passionate, driven individuals to join our
            team of innovators and creators.
          </p>
          <a href="#apply-form" className="hero-btn">View Open Positions ↓</a>
        </div>
      </section>

      {/* Why Join */}
      <section className="why-section">
        <h2>Why Join Corede Technologies?</h2>
        <p>We offer more than just a job — we offer a career where you can grow and learn.</p>
        <div className="why-cards">
          {[
            { icon: '👥', title: 'Great Culture', desc: 'Collaborative, inclusive environment where every voice is heard.' },
            { icon: '💡', title: 'Innovation First', desc: 'Work with cutting-edge technologies and real-world challenges.' },
            { icon: '☕', title: 'Excellent Perks', desc: 'Flexible working hours and continuous learning opportunities.' },
          ].map((c, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Section */}
      <section className="apply-section" id="apply">
        <div className="apply-left">
          <h2>Ready to take the next step?</h2>
          <p>Whether you are experienced or a fresher, we want to hear from you.</p>

          {/* IT Trainers */}
          <div className="vacancy-card">
            <div className="vacancy-header">
              <h3>🖥️ IT Trainers</h3>
              <span className="vacancy-badge it-badge">IT</span>
            </div>
            <div className="vacancy-content">
              <p><strong>Position:</strong> Training Instructors (Full-time &amp; Part-time)</p>
              <div className="requirements">
                <h4>Required Skills:</h4>
                <ul>
                  <li>✓ Python, Java, or JavaScript expertise</li>
                  <li>✓ Web Development (HTML, CSS, React)</li>
                  <li>✓ Database Management (MySQL, MongoDB)</li>
                  <li>✓ API Development &amp; REST Services</li>
                  <li>✓ Cloud Platforms (AWS, Azure)</li>
                  <li>✓ Teaching &amp; mentoring experience</li>
                </ul>
              </div>
              <div className="benefits">
                <p><strong>What We Offer:</strong></p>
                <p>Competitive salary • Flexible hours • Career growth • Training materials provided</p>
              </div>
            </div>
          </div>

          {/* Non-IT Trainers */}
          <div className="vacancy-card">
            <div className="vacancy-header">
              <h3>📊 Non-IT Trainers</h3>
              <span className="vacancy-badge non-it-badge">Non-IT</span>
            </div>
            <div className="vacancy-content">
              <p><strong>Position:</strong> Training Instructors (Full-time &amp; Part-time)</p>
              <div className="requirements">
                <h4>Required Skills:</h4>
                <ul>
                  <li>✓ Digital Marketing expertise</li>
                  <li>✓ Business Management knowledge</li>
                  <li>✓ Communication &amp; soft skills</li>
                  <li>✓ Data Analysis &amp; reporting</li>
                  <li>✓ HR &amp; recruitment experience</li>
                  <li>✓ Strong presentation abilities</li>
                </ul>
              </div>
              <div className="benefits">
                <p><strong>What We Offer:</strong></p>
                <p>Competitive salary • Flexible schedule • Professional development • Team collaboration</p>
              </div>
            </div>
          </div>

          <div className="roles-footer-note">
            📝 Don't see your role? We accept general applications via the form below.
          </div>
        </div>

        {/* Application Form */}
        <div className="apply-form" id="apply-form">
          <h3>APPLICATION FORM</h3>
          <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" id="career-name" name="name" placeholder="Your Name" />
            <span className="error" id="nameError"></span>

            <input type="email" id="career-email" name="email" placeholder="Email" />
            <span className="error" id="emailError"></span>

            <input type="tel" id="career-phone" name="phone" placeholder="Phone" />
            <span className="error" id="phoneError"></span>

            <input type="text" id="career-position" name="position" placeholder="Position (e.g. Web Developer)" />
            <span className="error" id="positionError"></span>

            <textarea id="career-message" name="message" placeholder="Message"></textarea>

            <input type="file" id="career-cv" name="resume" style={{ color: 'rgba(255,255,255,0.6)', padding: '8px 0', marginBottom: '12px' }} />

            {formStatus === 'success' && (
              <div className="form-success-msg">✅ Application submitted successfully! We'll be in touch.</div>
            )}
            {formStatus === 'error' && (
              <div className="form-error-msg">❌ Please fill all required fields and try again.</div>
            )}

            <button type="submit" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
