import React from 'react';
import { Link } from 'react-router-dom';
import '../pages.css';

export default function InternshipSuccessPage() {
  return (
    <div className="light-page">
      <div className="lp-success-page">
        <div className="lp-success-box">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h1>Payment Successful!</h1>
          <p>Your internship application has been completed successfully. Check your email for confirmation details.</p>
          <Link to="/internship" className="lp-success-btn">Back To Internship</Link>
        </div>
      </div>
    </div>
  );
}
