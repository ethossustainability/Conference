import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

function SharkTankRoom() {
    const [votedId, setVotedId] = useState(null);

    const startups = [
        { id: 1, name: "Project A", founder: "Presenter A", pitch: "Pitch description goes here.", votes: 0 },
        { id: 2, name: "Project B", founder: "Presenter B", pitch: "Pitch description goes here.", votes: 0 },
        { id: 3, name: "Project C", founder: "Presenter C", pitch: "Pitch description goes here.", votes: 0 },
    ];

    const handleVote = (id) => {
        if (votedId === id) {
            setVotedId(null);
        } else {
            setVotedId(id);
        }
    };

    return (
        <div className="room-page">
            <div className="room-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>Pitch Room</h1>
            </div>

            <div className="room-content">
                <section className="phase-indicator">
                    <div className="phase active">
                        <span className="phase-num">1</span>
                        <span className="phase-text">Community Vote</span>
                    </div>
                    <div className="phase-line"></div>
                    <div className="phase">
                        <span className="phase-num">2</span>
                        <span className="phase-text">Pitch to Investors</span>
                    </div>
                </section>

                <section className="room-intro">
                    <h2>Phase 1: Vote for the Best Projects</h2>
                    <p>People can vote via the app, and the app will aggregate the data for the top ten projects.</p>
                </section>

                <div className="startup-list">
                    {startups.map(startup => (
                        <div key={startup.id} className={`startup-card ${votedId === startup.id ? 'voted' : ''}`}>
                            <div className="startup-info">
                                <h3>{startup.name}</h3>
                                <p className="founder">Founded by {startup.founder}</p>
                                <p className="pitch">{startup.pitch}</p>
                            </div>
                            <div className="vote-section">
                                <span className="vote-count">{startup.votes + (votedId === startup.id ? 1 : 0)} votes</span>
                                <button
                                    className={votedId === startup.id ? 'btn-danger' : 'btn-primary'}
                                    onClick={() => handleVote(startup.id)}
                                >
                                    {votedId === startup.id ? 'Remove Vote' : 'Vote Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="phase-details mt-3">
                    <h3>Phase 2 Preview</h3>
                    <p>The top 10 projects will be seen by investors for potential initial investment.</p>
                </section>
            </div>
        </div>
    );
}

export default SharkTankRoom;
