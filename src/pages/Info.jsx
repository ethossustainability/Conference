import React from 'react';
import Navigation from '../components/Navigation';
import './Info.css';

function Info() {
  const conferenceInfo = {
    name: 'Tech Innovation Conference 2024',
    date: 'March 15, 2024',
    location: 'Convention Center, San Francisco',
    description: 'Join us for an exciting day of networking, learning, and innovation. Connect with industry leaders, discover the latest technologies, and expand your professional network.',
    organizers: 'Conference Organizing Committee',
    contact: {
      email: 'info@conference2024.com',
      phone: '+1 (555) 123-4567',
      website: 'https://conference2024.com',
    },
    wifi: {
      network: 'Conference2024',
      password: 'Innovate2024!',
    },
    hashtag: '#TechConf2024',
  };

  return (
    <div className="info-page">
      <div className="container">
        <h1>Conference Information</h1>

        <div className="info-content">
          <div className="info-card">
            <div className="info-icon">📋</div>
            <h2>About</h2>
            <p className="conference-name">{conferenceInfo.name}</p>
            <p className="conference-description">{conferenceInfo.description}</p>
            <div className="info-details">
              <div className="info-detail-item">
                <span className="detail-icon">📅</span>
                <div>
                  <strong>Date</strong>
                  <p>{conferenceInfo.date}</p>
                </div>
              </div>
              <div className="info-detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <p>{conferenceInfo.location}</p>
                </div>
              </div>
              <div className="info-detail-item">
                <span className="detail-icon">👥</span>
                <div>
                  <strong>Organized by</strong>
                  <p>{conferenceInfo.organizers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📡</div>
            <h2>WiFi Information</h2>
            <div className="wifi-info">
              <div className="wifi-item">
                <label>Network Name</label>
                <div className="wifi-value">
                  <span>{conferenceInfo.wifi.network}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(conferenceInfo.wifi.network);
                      alert('Network name copied!');
                    }}
                    className="copy-button"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="wifi-item">
                <label>Password</label>
                <div className="wifi-value">
                  <span>{conferenceInfo.wifi.password}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(conferenceInfo.wifi.password);
                      alert('Password copied!');
                    }}
                    className="copy-button"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h2>Contact</h2>
            <div className="contact-info">
              <a href={`mailto:${conferenceInfo.contact.email}`} className="contact-link">
                <span>📧</span>
                <span>{conferenceInfo.contact.email}</span>
              </a>
              <a href={`tel:${conferenceInfo.contact.phone}`} className="contact-link">
                <span>📱</span>
                <span>{conferenceInfo.contact.phone}</span>
              </a>
              <a
                href={conferenceInfo.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span>🌐</span>
                <span>Visit Website</span>
              </a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">#️⃣</div>
            <h2>Social Media</h2>
            <div className="social-info">
              <p className="hashtag">
                Share your experience using: <strong>{conferenceInfo.hashtag}</strong>
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(conferenceInfo.hashtag);
                  alert('Hashtag copied!');
                }}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                Copy Hashtag
              </button>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">❓</div>
            <h2>Need Help?</h2>
            <p>If you need assistance during the conference, please contact:</p>
            <ul className="help-list">
              <li>Information desk in the lobby</li>
              <li>Conference staff (wearing blue badges)</li>
              <li>Email: {conferenceInfo.contact.email}</li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default Info;

