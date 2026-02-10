import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './Room.css';

function SharkTankRoom() {
    const [searchTerm, setSearchTerm] = useState('');
    const [ratings, setRatings] = useState({});

    // Placeholder startups
    const startups = [
        { id: 1, name: "Project Name 1", founder: "Founder Name 1", pitch: "Brief description of the project and its sustainability impact.", url: "#" },
        { id: 2, name: "Project Name 2", founder: "Founder Name 2", pitch: "Brief description of the project and its sustainability impact.", url: "#" },
        { id: 3, name: "Project Name 3", founder: "Founder Name 3", pitch: "Brief description of the project and its sustainability impact.", url: "#" },
        { id: 4, name: "Project Name 4", founder: "Founder Name 4", pitch: "Brief description of the project and its sustainability impact.", url: "#" },
    ];

    const filteredStartups = startups.filter(startup =>
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.pitch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRatingChange = (startupId, question, value) => {
        setRatings(prev => ({
            ...prev,
            [startupId]: {
                ...prev[startupId],
                [question]: value
            }
        }));
    };

    const submitRating = (startupId) => {
        // Here you would typically send the data to a backend
        console.log(`Submitted rating for ${startupId}:`, ratings[startupId]);
        alert('Thank you for your feedback!');
    };

    const ratingQuestions = [
        { key: 'sustainable', label: 'How sustainable was this company?' },
        { key: 'impactful', label: 'How impactful is this company?' },
        { key: 'feasible', label: 'How feasible/viable is this company to implement?' },
        { key: 'overall', label: 'How did you like it overall?' },
    ];

    return (
        <div className="room-page">
            <div className="room-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>Pitch Room (Shark Tank)</h1>
            </div>

            <div className="room-content">
                <section className="phase-indicator">
                    <div className="phase active">
                        <span className="phase-num">1</span>
                        <span className="phase-text">Community Vote</span>
                    </div>
                </section>

                <section className="room-intro">
                    <h2>Vote & Rate Projects</h2>
                    <p>Search for projects and rate them on key metrics.</p>
                </section>

                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="startup-list">
                    {filteredStartups.map(startup => (
                        <div key={startup.id} className="startup-card-expanded">
                            <div className="startup-header">
                                <div className="startup-info">
                                    <h3>{startup.name}</h3>
                                    <p className="founder">Founded by {startup.founder}</p>
                                    <p className="pitch">{startup.pitch}</p>
                                </div>
                            </div>

                            <div className="rating-section">
                                <h4>Rate this Project</h4>
                                {ratingQuestions.map(({ key, label }) => (
                                    <div key={key} className="rating-question">
                                        <label>{label} (1-10)</label>
                                        <div className="rating-input">
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={ratings[startup.id]?.[key] || 5}
                                                onChange={(e) => handleRatingChange(startup.id, key, parseInt(e.target.value))}
                                            />
                                            <span>{ratings[startup.id]?.[key] || 5}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn-primary" onClick={() => submitRating(startup.id)}>Submit Rating</button>
                            </div>
                        </div>
                    ))}
                    {filteredStartups.length === 0 && <p className="no-results">No projects found matching "{searchTerm}"</p>}
                </div>

                <section className="phase-details mt-3">
                    <h3>Phase 2 Preview</h3>
                    <p>The top 10 projects will be seen by investors for potential initial investment.</p>
                </section>
            </div>
            <Navigation />
        </div>
    );
}

export default SharkTankRoom;
