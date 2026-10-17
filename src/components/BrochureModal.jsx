import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle, 
  BookOpen, 
  Award, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';

export default function BrochureModal({ isOpen, onClose }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  if (!isOpen) return null;

  const brochures = [
    {
      id: 'corporate',
      title: 'CoreDe Corporate Profile',
      tagline: 'Services, AI Solutions, Case Studies & Infrastructure',
      pages: '18 Pages PDF',
      size: '3.4 MB',
      color: 'var(--color-blue)',
      icon: Briefcase,
      badge: 'Most Popular'
    },
    {
      id: 'internship',
      title: 'Internship Curriculum & Roadmap',
      tagline: 'Cohort Timelines, Project Modules, Mentors & Stipends',
      pages: '12 Pages PDF',
      size: '2.8 MB',
      color: 'var(--color-yellow)',
      icon: Award,
      badge: '2026 Edition'
    },
    {
      id: 'workshop',
      title: 'Workshop & Bootcamp Catalog',
      tagline: 'Syllabus for Colleges, Hackathons & Corporate Teams',
      pages: '10 Pages PDF',
      size: '2.1 MB',
      color: 'var(--color-red)',
      icon: BookOpen,
      badge: 'Live Series'
    }
  ];

  const handleDownload = (brochure) => {
    setDownloadingId(brochure.id);
    setDownloadSuccess(null);

    // Simulate instant brochure bundle generation & trigger simulated download
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(brochure.title);

      // Create an automatic mock file download for user experience
      const element = document.createElement('a');
      const file = new Blob([
        `===================================================\n` +
        `COREDE OFFICIAL BROCHURE - INNOVATION. INSIGHT. IMPACT.\n` +
        `Document: ${brochure.title}\n` +
        `Edition: 2026 Official Guide\n` +
        `===================================================\n\n` +
        `1. ABOUT COREDE\n` +
        `CoreDe is a premier technology organization delivering full-spectrum digital services, industry-grade internships, hands-on workshops, and transformative tech careers.\n\n` +
        `2. PILLARS & PROGRAMS:\n` +
        `- Services: Enterprise software, scalable web systems, cloud DevOps, AI workflows.\n` +
        `- Internship: Hands-on project mentorship, real-world development, credentialing.\n` +
        `- Workshop: Immersive bootcamps, masterclasses, and corporate upskilling.\n` +
        `- Careers: Growth-driven roles for ambitious engineers and designers.\n\n` +
        `Website: https://corede.tech\n` +
        `Inquiries: contact@corede.tech\n`
      ], { type: 'text/plain' });

      element.href = URL.createObjectURL(file);
      element.download = `${brochure.id}-corede-brochure.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 900);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-glow">
              <Download size={22} />
            </div>
            <div>
              <h3 className="modal-title">Download Official Brochures</h3>
              <p className="modal-subtitle">Select a comprehensive brochure to view or save</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {downloadSuccess && (
          <div className="modal-toast success">
            <CheckCircle size={18} />
            <span>Successfully downloaded <strong>{downloadSuccess}</strong>!</span>
          </div>
        )}

        <div className="modal-brochure-list">
          {brochures.map((item) => {
            const Icon = item.icon;
            const isDownloading = downloadingId === item.id;
            return (
              <div 
                key={item.id} 
                className="modal-brochure-item"
                style={{ '--item-color': item.color }}
              >
                <div className="brochure-item-left">
                  <div className="brochure-icon-wrap" style={{ background: `${item.color}15`, color: item.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="brochure-meta">
                    <div className="brochure-badge-row">
                      <span className="brochure-badge">{item.badge}</span>
                      <span className="brochure-specs">{item.pages} • {item.size}</span>
                    </div>
                    <h4 className="brochure-name">{item.title}</h4>
                    <p className="brochure-desc">{item.tagline}</p>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="brochure-download-btn"
                  onClick={() => handleDownload(item)}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <span className="download-spinner"></span>
                  ) : (
                    <>
                      <span>Download</span>
                      <Download size={15} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <div className="modal-footer-note">
            <BookOpen size={16} className="text-blue" />
            <span>Need a custom syllabus or corporate prospectus?</span>
          </div>
          <a href="#contact" className="modal-contact-link" onClick={onClose}>
            <span>Contact Outreach Team</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
