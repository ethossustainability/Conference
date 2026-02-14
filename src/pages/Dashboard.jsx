import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const savedCards = JSON.parse(localStorage.getItem('collected_cards') || '[]');

  // Booth Wallet Progress
  const boothProgress = JSON.parse(localStorage.getItem('booth_progress') || '{}');
  const totalBooths = 10; // This should ideally come from a config or API

  const quickActions = [
    {
      title: 'Create/Edit Card',
      description: 'Set up your digital business card',
      icon: '👤',
      link: '/card',
      color: '#1a73e8',
    },
    {
      title: 'Scan QR Code',
      description: 'Scan to receive someone\'s card',
      icon: '📷',
      link: '/scan',
      color: '#34a853',
    },
    {
      title: 'My Contacts',
      description: `${savedCards.length} collected card${savedCards.length !== 1 ? 's' : ''}`,
      icon: '💼',
      link: '/cards',
      color: '#fbbc04',
    },
    {
      title: 'Schedule',
      description: 'View conference events',
      icon: '📅',
      link: '/schedule',
      color: '#ea4335',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p>Ready to network at the conference?</p>
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="action-card">
              <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                {action.icon}
              </div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
          ))}
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{savedCards.length}</div>
            <div className="stat-label">Cards Collected</div>
          </div>
        </div>

        <div className="booth-wallet-section">
          <h2>Booth Wallet & Passport</h2>
          <p className="wallet-description">Scan QR codes at booths and posters to register your visit. Collect them all for a surprise!</p>

          <div className="passport-container">
            <div className="passport-group">
              <div className="group-header">
                <h3>Booths & Posters</h3>
                <span className="progress-count">{Object.keys(boothProgress).length} / {totalBooths}</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(Object.keys(boothProgress).length / totalBooths) * 100}%` }}
                ></div>
              </div>
            </div>

            {Object.keys(boothProgress).length === totalBooths && (
              <div className="raffle-notice animate-bounce">
                🎉 Passport Complete! Your business card has been entered into the raffle.
              </div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default Dashboard;

