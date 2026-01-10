import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import './ScanCard.css';

function ScanCard() {
  const { user } = useAuth();
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const startScanning = () => {
    setError(null);
    setScannedData(null);
    setScanning(true);

    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 10,
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        // Successfully scanned
        handleScannedData(decodedText);
        scanner.clear().catch(console.error);
        setScanning(false);
      },
      (errorMessage) => {
        // Scan failed, but keep trying
        // Only show error if it's not just "No QR code found"
        if (errorMessage && !errorMessage.includes('No QR code found')) {
          setError(errorMessage);
        }
      }
    );
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleScannedData = (data) => {
    try {
      // Try to parse as JSON first (if it's our card format)
      let cardData;
      try {
        cardData = JSON.parse(data);
      } catch {
        // If not JSON, try to parse URL with data parameter
        const url = new URL(data);
        const dataParam = url.searchParams.get('data');
        if (dataParam) {
          cardData = JSON.parse(decodeURIComponent(dataParam));
        } else {
          throw new Error('Invalid QR code format');
        }
      }

      // Check if it's a valid card
      if (cardData.name && cardData.email) {
        saveCard(cardData);
        setScannedData(cardData);
      } else {
        throw new Error('Invalid business card data');
      }
    } catch (err) {
      setError('Could not read business card. Please try scanning again.');
      console.error('Error parsing scanned data:', err);
    }
  };

  const saveCard = (cardData) => {
    const savedCards = JSON.parse(localStorage.getItem('collected_cards') || '[]');
    
    // Check if card already exists
    const exists = savedCards.some(card => 
      card.email === cardData.email && card.userId === cardData.userId
    );

    if (!exists) {
      cardData.collectedAt = new Date().toISOString();
      savedCards.push(cardData);
      localStorage.setItem('collected_cards', JSON.stringify(savedCards));
    }
  };

  const handleSaveAndContinue = () => {
    setScannedData(null);
    setError(null);
  };

  return (
    <div className="scan-card-page">
      <div className="container">
        <h1>Scan QR Code</h1>
        <p className="page-description">
          Scan someone's QR code to instantly receive their business card
        </p>

        {!scanning && !scannedData && (
          <div className="scan-section">
            <div className="card">
              <div id="qr-reader" className="qr-reader-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">📷</div>
                  <p>Click the button below to start scanning</p>
                </div>
              </div>
              <button onClick={startScanning} className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Start Camera Scanner
              </button>
            </div>
          </div>
        )}

        {scanning && (
          <div className="scan-section">
            <div className="card">
              <div id="qr-reader"></div>
              <button onClick={stopScanning} className="btn-secondary" style={{ width: '100%', marginTop: '16px' }}>
                Stop Scanning
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="card error-message">
            <p>{error}</p>
            {scanning && (
              <button onClick={stopScanning} className="btn-secondary" style={{ width: '100%', marginTop: '12px' }}>
                Stop Scanning
              </button>
            )}
          </div>
        )}

        {scannedData && (
          <div className="scanned-card-result">
            <div className="card success-message">
              <div className="success-header">
                <span className="success-icon">✓</span>
                <h2>Card Saved Successfully!</h2>
              </div>
              
              <div className="scanned-card-preview">
                <div className="preview-header">
                  {scannedData.picture && (
                    <img src={scannedData.picture} alt={scannedData.name} className="preview-avatar" />
                  )}
                  <div className="preview-name-section">
                    <h3>{scannedData.name}</h3>
                    {scannedData.title && <p className="preview-title">{scannedData.title}</p>}
                    {scannedData.company && <p className="preview-company">{scannedData.company}</p>}
                  </div>
                </div>

                <div className="scanned-card-details">
                  {scannedData.email && (
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <a href={`mailto:${scannedData.email}`}>{scannedData.email}</a>
                    </div>
                  )}
                  {scannedData.phone && (
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <a href={`tel:${scannedData.phone}`}>{scannedData.phone}</a>
                    </div>
                  )}
                  {scannedData.linkedin && (
                    <div className="detail-row">
                      <span className="detail-label">LinkedIn:</span>
                      <a href={scannedData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                  )}
                  {scannedData.website && (
                    <div className="detail-row">
                      <span className="detail-label">Website:</span>
                      <a href={scannedData.website} target="_blank" rel="noopener noreferrer">Visit</a>
                    </div>
                  )}
                  {scannedData.bio && (
                    <div className="detail-row bio-row">
                      <span className="detail-label">Bio:</span>
                      <p>{scannedData.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="scanned-card-actions">
                <button onClick={handleSaveAndContinue} className="btn-primary" style={{ width: '100%' }}>
                  Scan Another Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}

export default ScanCard;
