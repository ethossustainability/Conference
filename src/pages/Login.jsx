import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback((response) => {
    // Decode JWT token (in production, verify on backend)
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        token: response.credential,
      };
      login(userData);
      navigate('/');
    } catch (error) {
      console.error('Error handling credential response:', error);
      alert('Failed to sign in. Please try again.');
    }
  }, [login, navigate]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }

    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'signin_with',
          }
        );
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [user, navigate, handleCredentialResponse]);

  // Demo login for development (remove in production)
  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo123',
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://via.placeholder.com/150',
      token: 'demo_token',
    };
    login(demoUser);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Conference Networking</h1>
          <p>Connect with fellow attendees using QR codes</p>
        </div>
        
        <div className="login-card">
          <h2>Sign in to continue</h2>
          <div id="google-signin-button" className="google-signin-wrapper"></div>
          
          {(!import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') && (
            <div className="demo-login">
              <p className="demo-notice">Google OAuth not configured. Using demo login.</p>
              <button onClick={handleDemoLogin} className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Continue with Demo Account
              </button>
            </div>
          )}
        </div>

        <div className="login-info">
          <h3>Features:</h3>
          <ul>
            <li>Create your digital business card</li>
            <li>Scan QR codes to exchange cards</li>
            <li>View all collected contacts</li>
            <li>Check conference schedule</li>
            <li>Access conference information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;

