import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import './MyCards.css';

function MyCards() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = () => {
    const savedCards = JSON.parse(localStorage.getItem('collected_cards') || '[]');
    setCards(savedCards);
  };

  const deleteCard = (index) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedCards = cards.filter((_, i) => i !== index);
      setCards(updatedCards);
      localStorage.setItem('collected_cards', JSON.stringify(updatedCards));
      setSelectedCard(null);
    }
  };

  const filteredCards = cards.filter(card => {
    const searchTerm = filter.toLowerCase();
    return (
      card.name?.toLowerCase().includes(searchTerm) ||
      card.email?.toLowerCase().includes(searchTerm) ||
      card.company?.toLowerCase().includes(searchTerm) ||
      card.title?.toLowerCase().includes(searchTerm)
    );
  });

  const CardDetail = ({ card, onClose, onDelete }) => {
    return (
      <div className="card-detail-overlay" onClick={onClose}>
        <div className="card-detail-modal" onClick={(e) => e.stopPropagation()}>
          <div className="card-detail-header">
            <h2>{card.name}</h2>
            <button onClick={onClose} className="close-button">×</button>
          </div>

          <div className="card-detail-content">
            {card.picture && (
              <img src={card.picture} alt={card.name} className="card-detail-avatar" />
            )}

            {card.title && (
              <div className="card-detail-field">
                <label>Title</label>
                <p>{card.title}</p>
              </div>
            )}

            {card.company && (
              <div className="card-detail-field">
                <label>Company</label>
                <p>{card.company}</p>
              </div>
            )}

            {card.email && (
              <div className="card-detail-field">
                <label>Email</label>
                <a href={`mailto:${card.email}`}>{card.email}</a>
              </div>
            )}

            {card.phone && (
              <div className="card-detail-field">
                <label>Phone</label>
                <a href={`tel:${card.phone}`}>{card.phone}</a>
              </div>
            )}

            {card.linkedin && (
              <div className="card-detail-field">
                <label>LinkedIn</label>
                <a href={card.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
              </div>
            )}

            {card.website && (
              <div className="card-detail-field">
                <label>Website</label>
                <a href={card.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
            )}

            {card.bio && (
              <div className="card-detail-field">
                <label>Bio</label>
                <p className="bio-text">{card.bio}</p>
              </div>
            )}

            {card.collectedAt && (
              <div className="card-detail-field">
                <label>Collected</label>
                <p>{new Date(card.collectedAt).toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="card-detail-actions">
            <button onClick={onDelete} className="btn-danger">
              Delete Card
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-cards-page">
      <div className="container">
        <h1>Collected Cards</h1>
        <p className="page-description">
          View and manage all the business cards you've collected
        </p>

        <div className="cards-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search cards..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="cards-count">
            {filteredCards.length} card{filteredCards.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredCards.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <h3>No cards yet</h3>
            <p>
              {filter ? 'No cards match your search.' : 'Start scanning QR codes to collect business cards!'}
            </p>
            {!filter && (
              <a href="/scan" className="btn-primary">
                Scan a Card
              </a>
            )}
          </div>
        ) : (
          <div className="cards-grid">
            {filteredCards.map((card, index) => {
              const originalIndex = cards.indexOf(card);
              return (
                <div
                  key={originalIndex}
                  className="card-item"
                  onClick={() => setSelectedCard({ ...card, index: originalIndex })}
                >
                  <div className="card-item-header">
                    {card.picture ? (
                      <img src={card.picture} alt={card.name} className="card-item-avatar" />
                    ) : (
                      <div className="card-item-avatar-placeholder">
                        {card.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    <div className="card-item-info">
                      <h3>{card.name || 'Unknown'}</h3>
                      {card.title && <p className="card-item-title">{card.title}</p>}
                      {card.company && <p className="card-item-company">{card.company}</p>}
                    </div>
                  </div>
                  {card.email && (
                    <div className="card-item-email">
                      {card.email}
                    </div>
                  )}
                  <div className="card-item-footer">
                    <span className="card-item-date">
                      {card.collectedAt
                        ? new Date(card.collectedAt).toLocaleDateString()
                        : 'No date'}
                    </span>
                    <span className="card-item-arrow">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedCard && (
        <CardDetail
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onDelete={() => {
            deleteCard(selectedCard.index);
          }}
        />
      )}

      <Navigation />
    </div>
  );
}

export default MyCards;

