import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './Room.css';

function BoothRoom() {
    const companies = [
        { id: 1, name: "Company A", industry: "Sector A", opportunity: "Role A", location: "Booth 1" },
        { id: 2, name: "Company B", industry: "Sector B", opportunity: "Role B", location: "Booth 2" },
        { id: 3, name: "Company C", industry: "Sector C", opportunity: "Role C", location: "Booth 3" },
    ];

    return (
        <div className="room-page">
            <div className="room-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>Sustainable Company Booths</h1>
            </div>

            <div className="room-content">
                <section className="room-intro">
                    <h2>Hallway of Opportunities</h2>
                    <p>Connect with companies leading the way in sustainability. These booths are looking for fresh talent.</p>
                    <div className="booth-notice">
                        <span className="icon">💼</span>
                        <p>Companies are looking for individuals for internships and jobs.</p>
                    </div>
                </section>

                <div className="booth-grid">
                    {companies.map(company => (
                        <div key={company.id} className="booth-card">
                            <div className="booth-header">
                                <div className="booth-id">{company.location}</div>
                            </div>
                            <h3>{company.name}</h3>
                            <p className="industry">{company.industry}</p>
                            <div className="opportunity-tag">
                                <span className="label">Open Roles:</span>
                                <span className="value">{company.opportunity}</span>
                            </div>
                            <button className="btn-primary">Visit Booth</button>
                        </div>
                    ))}
                </div>
            </div>
            <Navigation />
        </div>
    );
}

export default BoothRoom;
