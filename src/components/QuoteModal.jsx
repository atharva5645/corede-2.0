import React, { useState } from 'react';
import { X, CheckCircle2, Phone, ShieldCheck, Send } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    designation: '',
    service: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      company: '',
      designation: '',
      service: '',
      message: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleReset}>
      <div className="modal-card quote-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Request a Quote</h3>
            <p className="modal-subtitle">We respond within 24 hours</p>
          </div>
          <button className="modal-close-btn" onClick={handleReset} aria-label="Close quote modal">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="quote-success-view">
            <div className="quote-success-icon">
              <CheckCircle2 size={54} color="var(--color-green)" />
            </div>
            <h4 className="quote-success-title">Quote Request Received!</h4>
            <p className="quote-success-desc">
              Thank you, <strong>{formData.name}</strong>. Our enterprise team will review your specifications for{' '}
              <strong>{formData.service || 'your project'}</strong> and respond to <strong>{formData.email}</strong> within 24 hours.
            </p>
            <div className="quote-direct-call-box">
              <span>Immediate query? Call our direct line:</span>
              <a href="tel:+918951029849" className="direct-call-pill">
                <Phone size={15} />
                <span>+91 8951029849</span>
              </a>
            </div>
            <button type="button" className="btn-primary-pill" onClick={handleReset} style={{ marginTop: '20px' }}>
              Close
            </button>
          </div>
        ) : (
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                id="name"
                name="name"
                placeholder="Full Name *" 
                required 
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Email Address *" 
                  required 
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <input 
                  type="tel" 
                  id="mobile"
                  name="mobile"
                  placeholder="Phone Number *" 
                  maxLength={10}
                  inputMode="numeric"
                  required 
                  className="form-input"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <input 
                type="text" 
                id="company"
                name="company"
                placeholder="Company Name *" 
                required 
                className="form-input"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input 
                type="text" 
                id="designation"
                name="designation"
                placeholder="Designation *" 
                required 
                className="form-input"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
            </div>

            <div className="form-group">
              <select 
                id="service" 
                name="service"
                required 
                className="form-select"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Select Service *</option>
                <optgroup label="IT Services">
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="IT Support">IT Support</option>
                </optgroup>
                <optgroup label="Non IT Services">
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="AI Graphic Design">AI Graphic Design</option>
                  <option value="PPC">PPC</option>
                  <option value="Meta & Google Ads">Meta & Google Ads</option>
                  <option value="SEO/SEM">SEO/SEM</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <textarea 
                id="message"
                name="message"
                rows="3" 
                placeholder="Project Details *" 
                required 
                className="form-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button 
              className="btn-submit-quote" 
              id="submit-btn" 
              type="submit"
            >
              <span>Submit Quote Request →</span>
            </button>

            <p className="secure-badge-note">
              🔒 Your information is secure
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
