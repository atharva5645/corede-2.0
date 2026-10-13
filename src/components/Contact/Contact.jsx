import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Clock, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../../data/siteData';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: 'Grade 9',
    track: 'both',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const centerPhotoRef = useRef(null);
  const posterImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.contact-header-wrap', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Split column reveal (left card slides from left, right card from right)
      if (infoCardRef.current) {
        gsap.from(infoCardRef.current, {
          scrollTrigger: {
            trigger: infoCardRef.current,
            start: 'top 85%',
          },
          x: -40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });
      }

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 85%',
          },
          x: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });
      }

      // Parallax scroll on center entrance photo
      if (centerPhotoRef.current) {
        gsap.to(centerPhotoRef.current, {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.center-photo-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // Parallax scroll on demo poster
      if (posterImgRef.current) {
        gsap.to(posterImgRef.current, {
          yPercent: 10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.demo-poster-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Format pre-filled WhatsApp message as seamless fallback
    const message = `Hello Priyanka Ma'am! I would like to book a Free Demo Class at The Coding Zone.%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Grade:* ${encodeURIComponent(formData.grade)}%0A*Track:* ${encodeURIComponent(formData.track)}%0A*Notes:* ${encodeURIComponent(formData.notes || 'None')}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Open WhatsApp after brief feedback
      window.open(`https://wa.me/91${SITE.phone}?text=${message}`, '_blank');
    }, 600);
  };

  return (
    <section ref={sectionRef} className="section section-alt contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="text-center contact-header-wrap">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title" id="contact-heading">
            Book Your Free Demo Class Today
          </h2>
          <p className="section-subtitle">
            Experience our hands-on teaching style firsthand. Meet our founder, explore the curriculum, and get all your questions answered.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Map */}
          <div ref={infoCardRef} className="contact-info-card">
            <div className="contact-card-header">
              <span className="badge badge-teal">Institute Information</span>
              <h3 className="contact-card-title">Visit or Contact Us in Belagavi</h3>
              <p className="contact-card-desc">
                We're located on Vadagaon Main Road. Feel free to call us or message directly on WhatsApp anytime for inquiries.
              </p>
            </div>

            <div className="contact-items-list">
              <a href={`tel:+91${SITE.phone}`} className="contact-item-row">
                <div className="contact-icon-box icon-orange">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Call Directly</div>
                  <div className="contact-item-value">{SITE.phoneDisplay}</div>
                </div>
              </a>

              <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-item-row">
                <div className="contact-icon-box icon-whatsapp">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="contact-item-label">WhatsApp Chat</div>
                  <div className="contact-item-value">Chat with Founder (+91 {SITE.phone})</div>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="contact-item-row">
                <div className="contact-icon-box icon-purple">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Email Us</div>
                  <div className="contact-item-value">{SITE.email}</div>
                </div>
              </a>

              <div className="contact-item-row">
                <div className="contact-icon-box icon-amber">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Institute Address</div>
                  <div className="contact-item-value">{SITE.address.full}</div>
                </div>
              </div>

              <div className="contact-item-row">
                <div className="contact-icon-box icon-gray">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Batch Hours</div>
                  <div className="contact-item-value">Monday – Saturday: 4:00 PM – 8:00 PM | Sunday: Batches by appointment</div>
                </div>
              </div>
            </div>

            {/* Institute Center Entrance Photo with GSAP Parallax */}
            <div className="center-photo-container">
              <div className="center-photo-wrap">
                <img
                  ref={centerPhotoRef}
                  src="/images/institute-belagavi-center.jpg"
                  alt="The Coding Zone Center Entrance in Vadagaon, Belagavi"
                  className="center-photo-img"
                  loading="lazy"
                />
                <div className="center-photo-badge">
                  <span>Vadagaon Main Road Center</span>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="map-container">
              <iframe
                title="The Coding Zone Location"
                src="https://maps.google.com/maps?q=Vadagaon%20Main%20Road,%20Belgaum,%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Demo Booking Form */}
          <div ref={formCardRef} className="demo-form-card">
            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle size={56} className="text-teal" />
                </div>
                <h3 className="success-title">Demo Request Received!</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>! We’ve opened WhatsApp to connect you directly with Priyanka Ma’am. We will confirm your demo schedule shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSubmitted(false)}
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="demo-form">
                <div className="form-header">
                  {/* Demo Flyer Poster Banner with Parallax */}
                  <div className="demo-poster-wrap">
                    <img
                      ref={posterImgRef}
                      src="/images/free-demo-session-poster.jpg"
                      alt="45-Minute Free Interactive Coding Demo Flyer"
                      className="demo-poster-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="form-badge">
                    <Sparkles size={14} /> Zero Cost · No Obligation
                  </div>
                  <h3 className="form-heading">Register for Free Demo Class</h3>
                  <p className="form-subheading">
                    Fill the details below to reserve a 45-minute interactive session.
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Student Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Aryan Patil"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Contact / WhatsApp Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit mobile number"
                    placeholder="e.g. 9876543210"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="grade" className="form-label">
                      Grade / Level <span className="req">*</span>
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      className="form-select"
                      value={formData.grade}
                      onChange={handleChange}
                    >
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Diploma 1st/2nd/3rd Year">Diploma Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="track" className="form-label">
                      Preferred Track
                    </label>
                    <select
                      id="track"
                      name="track"
                      className="form-select"
                      value={formData.track}
                      onChange={handleChange}
                    >
                      <option value="Front End Development (Track 1)">Track 1: Web Development</option>
                      <option value="Python & AI (Track 2)">Track 2: Python & AI</option>
                      <option value="Undecided / Both Tracks">Both / Help Me Choose</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Any Questions or Message (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Tell us about previous coding experience or specific goals..."
                    className="form-textarea"
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block submit-btn"
                >
                  {loading ? (
                    'Preparing Demo Request...'
                  ) : (
                    <>
                      <Send size={18} /> Confirm & Connect on WhatsApp
                    </>
                  )}
                </button>

                <p className="form-privacy-note">
                  🔒 We respect your privacy. No spam. You will only receive communication regarding your demo class.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
