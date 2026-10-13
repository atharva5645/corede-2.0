import { Monitor, Terminal, BarChart2, Brain, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { CERTIFICATIONS, TOOLS } from '../../data/siteData';
import './Certifications.css';

const ICON_MAP = {
  Monitor,
  Terminal,
  BarChart2,
  Brain,
};

export default function Certifications() {
  return (
    <section className="section certifications-section" id="certifications" aria-labelledby="certifications-heading">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">Industry Recognition</span>
          <h2 className="section-title" id="certifications-heading">
            Earn 4 Prestigious Course Certifications
          </h2>
          <p className="section-subtitle">
            Validate your coding expertise with verifiable course completion certificates that bolster academic portfolios and college applications.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid">
          {CERTIFICATIONS.map((cert, index) => {
            const Icon = ICON_MAP[cert.icon] || Award;
            const isTeal = cert.color === 'teal';

            return (
              <div
                key={cert.title}
                className={`cert-card ${isTeal ? 'cert-card-teal' : 'cert-card-orange'}`}
              >
                <div className="cert-badge-top">
                  <span className="cert-number">0{index + 1}</span>
                  <Award size={18} className="cert-award-icon" />
                </div>

                <div className={`cert-icon-wrapper ${isTeal ? 'icon-teal' : 'icon-orange'}`}>
                  <Icon size={28} />
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.desc}</p>

                <div className="cert-footer">
                  <span className="cert-pill">
                    <ShieldCheck size={14} /> Verified Credential
                  </span>
                  <span className="cert-grade">Grade 9–12 & Diploma</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Sample Mockup Card */}
        <div className="certificate-mockup-showcase">
          <div className="certificate-mockup-card">
            <div className="certificate-mockup-media">
              <img
                src="/images/sample-certificate-mockup.jpg"
                alt="Official Certificate of Completion at The Coding Zone"
                className="certificate-mockup-img"
                loading="lazy"
              />
              <div className="certificate-stamp-badge">
                <span>Official Parchment Credential</span>
              </div>
            </div>
            <div className="certificate-mockup-info">
              <span className="badge badge-teal">Verifiable Course Credential</span>
              <h3 className="cert-preview-title">Physical & Verifiable Course Certificate</h3>
              <p className="cert-preview-text">
                Every student who successfully completes their modules receives an official, embossed certificate signed by Founder <strong>Priyanka Desurkar</strong> (B.E & M.Tech).
              </p>
              <div className="cert-feature-tags">
                <span className="cert-feature-tag">🏅 Official Institute Seal</span>
                <span className="cert-feature-tag">📄 Heavy Linen Finish</span>
                <span className="cert-feature-tag">🔗 QR Code Verification</span>
                <span className="cert-feature-tag">🎓 College Portfolio Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Tech ticker / grid */}
        <div className="tools-card">
          <div className="tools-header">
            <div>
              <span className="tools-badge">
                <Sparkles size={14} /> Modern Tech Stack
              </span>
              <h3 className="tools-title">Tools & Technologies You Will Master</h3>
            </div>
            <p className="tools-subtitle">
              Learn the exact platforms and frameworks used by software engineers at top tech companies worldwide.
            </p>
          </div>

          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="tool-chip">
                <div className="tool-logo-box">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="tool-logo-img"
                    loading="lazy"
                  />
                </div>
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
