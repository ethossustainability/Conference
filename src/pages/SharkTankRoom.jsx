import React, { useState } from 'react';
import './Room.css';

function SharkTankRoom() {
    const [votedId, setVotedId] = useState(null);

    const startups = [
        { id: 1, name: "ReGlow Fashion", founder: "Sarah J.", pitch: "Upcycling textile waste into high-end luxury streetwear.", votes: 142 },
        { id: 2, name: "AquaNode", founder: "Mark T.", pitch: "Decentralized smart sensors for real-time ocean health monitoring.", votes: 98 },
        { id: 3, name: "FruitSave AI", founder: "Elena R.", pitch: "Predictive AI tools for farmers to reduce post-harvest food waste.", votes: 215 },
        { id: 4, name: "UrbanLeaf", founder: "James C.", pitch: "Automated indoor vertical farming for dense urban centers.", votes: 167 },
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
                <h1>Shark Tank Room</h1>
                <div className="lead-badge">
                    <span className="lead-label">Room Lead:</span>
                    <span className="lead-name">Christiaan</span>
                </div>
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
                    <p>Vote for the youth-founded companies you think are the most interesting. The top ten will move on to the next phase.</p>
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
                    <p>The top 10 projects will be seen by investors for potential initial investments ranging from $1k to $100k.</p>
                </section>
            </div>
        </div>
    );
}

export default SharkTankRoom;
