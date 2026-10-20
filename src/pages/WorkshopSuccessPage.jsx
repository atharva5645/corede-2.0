import React from 'react';
import { Link } from 'react-router-dom';
import '../pages.css';

export default function WorkshopSuccessPage() {
  return (
    <div className="light-page">
      <div className="lp-success-page">
        <div className="lp-success-box">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h1>Payment Successful!</h1>
          <p>Your workshop booking has been completed successfully. Check your email for confirmation and schedule details.</p>
          <Link to="/workshop" className="lp-success-btn">Back To Workshop</Link>
        </div>
      </div>
    </div>
  );
}
