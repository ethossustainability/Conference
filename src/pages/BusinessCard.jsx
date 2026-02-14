import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import './BusinessCard.css';

function BusinessCard() {
  const { user } = useAuth();
  const [cardData, setCardData] = useState({
    name: user?.name || '',
    title: '',
    company: '',
    email: user?.email || '',
    phone: '',
    linkedin: '',
    website: '',
    resume: '',
    bio: '',
  });
  const [showQR, setShowQR] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved card data
    const savedCard = localStorage.getItem('my_business_card');
    if (savedCard) {
      try {
        const parsed = JSON.parse(savedCard);
        setCardData({ ...cardData, ...parsed });
      } catch (e) {
        console.error('Error loading saved card:', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('my_business_card', JSON.stringify(cardData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const generateCardJSON = () => {
    return JSON.stringify({
      ...cardData,
      userId: user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const cardUrl = `${window.location.origin}/card-view?data=${encodeURIComponent(generateCardJSON())}`;

  return (
    <div className="business-card-page">
      <div className="page-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <div className="container">
          <h1>My Business Card</h1>
        </div>
      </div>

      <div className="container">

        <div className="card-form-section">
          <div className="card">
            <h2>Card Information</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={cardData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={cardData.title}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={cardData.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={cardData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={cardData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={cardData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={cardData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="form-group resume-group">
                <label>Resume Link (Published URL) 📄</label>
                <div className="instruction-text">
                  Make sure your resume is ready as a shared/published link (e.g., Google Drive, Dropbox, or personal site).
                </div>
                <input
                  type="url"
                  name="resume"
                  value={cardData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={cardData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="A brief introduction about yourself..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                {saved ? '✓ Saved!' : 'Save Card'}
              </button>
            </form>
          </div>

          <div className="card">
            <h2>Share Your Card</h2>
            <p className="card-description">
              Save your card to generate a QR code that others can scan to get your contact information.
            </p>

            {cardData.name && cardData.email ? (
              <>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="btn-secondary"
                  style={{ width: '100%', marginBottom: '16px' }}
                >
                  {showQR ? 'Hide' : 'Show'} QR Code
                </button>

                {showQR && (
                  <div className="qr-display">
                    <div className="qr-code-container">
                      <QRCodeSVG
                        value={cardUrl}
                        size={256}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <p className="qr-instruction">
                      Others can scan this code to get your business card
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(cardUrl);
                        alert('Card URL copied to clipboard!');
                      }}
                      className="btn-secondary"
                      style={{ width: '100%' }}
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="card-warning">
                Please fill in at least your name and email to generate a QR code.
              </p>
            )}
          </div>

          <div className="card-preview">
            <h2>Card Preview</h2>
            <div className="preview-card">
              <div className="preview-header">
                {user?.picture && (
                  <img src={user.picture} alt={cardData.name} className="preview-avatar" />
                )}
                <div className="preview-name-section">
                  <h3>{cardData.name || 'Your Name'}</h3>
                  {cardData.title && <p className="preview-title">{cardData.title}</p>}
                  {cardData.company && <p className="preview-company">{cardData.company}</p>}
                </div>
              </div>
              {cardData.bio && (
                <div className="preview-bio">
                  <p>{cardData.bio}</p>
                </div>
              )}
              <div className="preview-contact">
                {cardData.email && (
                  <div className="preview-contact-item">
                    <span>📧</span>
                    <a href={`mailto:${cardData.email}`}>{cardData.email}</a>
                  </div>
                )}
                {cardData.phone && (
                  <div className="preview-contact-item">
                    <span>📱</span>
                    <a href={`tel:${cardData.phone}`}>{cardData.phone}</a>
                  </div>
                )}
                {cardData.linkedin && (
                  <div className="preview-contact-item">
                    <span>💼</span>
                    <a href={cardData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                )}
                {cardData.website && (
                  <div className="preview-contact-item">
                    <span>🌐</span>
                    <a href={cardData.website} target="_blank" rel="noopener noreferrer">Website</a>
                  </div>
                )}
                {cardData.resume && (
                  <div className="preview-contact-item">
                    <span>📄</span>
                    <a href={cardData.resume} target="_blank" rel="noopener noreferrer">Resume</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default BusinessCard;

