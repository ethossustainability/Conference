import React from 'react';
import './Room.css';

function BoothRoom() {
    const companies = [
        { id: 1, name: "EcoStream Technologies", industry: "Water Conservation", opportunity: "Internships & Junior Dev", location: "Booth A1" },
        { id: 2, name: "GreenPulse Energy", industry: "Renewable Solar", opportunity: "Full-time Engineering", location: "Booth B4" },
        { id: 3, name: "Terra Cycle Solutions", industry: "Waste Management", opportunity: "Logistics Intern", location: "Booth C2" },
        { id: 4, name: "BioGrowth Labs", industry: "Sustainable Agriculture", opportunity: "Research Assistant", location: "Booth A5" },
        { id: 5, name: "CleanSky Systems", industry: "Air Purification", opportunity: "Sales & Marketing", location: "Booth D1" },
    ];

    return (
        <div className="room-page">
            <div className="room-header">
                <h1>Sustainable Company Booths</h1>
                <div className="lead-badge">
                    <span className="lead-label">Room Lead:</span>
                    <span className="lead-name">Juhi</span>
                </div>
            </div>

            <div className="room-content">
                <section className="room-intro">
                    <h2>Hallway of Opportunities</h2>
                    <p>Connect with companies leading the way in sustainability. These booths are looking for fresh talent for internships and jobs.</p>
                    <div className="booth-notice">
                        <span className="icon">💼</span>
                        <p>50+ companies registered. Spot rentals supporting our sustainability mission.</p>
                    </div>
                </section>

                <div className="booth-grid">
                    {companies.map(company => (
                        <div key={company.id} className="booth-card">
                            <div className="booth-id">{company.location}</div>
                            <h3>{company.name}</h3>
                            <p className="industry">{company.industry}</p>
                            <div className="opportunity-tag">
                                <span className="label">Open Roles:</span>
                                <span className="value">{company.opportunity}</span>
                            </div>
                            <button className="btn-secondary">Visit Booth</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BoothRoom;
