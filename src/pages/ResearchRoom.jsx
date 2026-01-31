import React from 'react';
import './Room.css';

function ResearchRoom() {
    const projects = [
        { id: 1, title: "Solar Powered Filtration", student: "Aria Chen", description: "A portable water filtration system powered by flexible solar panels for remote areas." },
        { id: 2, title: "Mycelium Packaging", student: "Leo Martinez", description: "Replacing plastic foam with biodegradable mushroom-based packaging materials." },
        { id: 3, title: "Vertical Urban Farming", student: "Zoe Wilson", description: "Efficient hydroponic systems designed for small city apartment balconies." },
        { id: 4, title: "Algae Biofuel", student: "Kevin Park", description: "Optimizing algae growth rates for sustainable biofuel production." },
    ];

    return (
        <div className="room-page">
            <div className="room-header">
                <h1>Poster and Research Room</h1>
                <div className="lead-badge">
                    <span className="lead-label">Room Lead:</span>
                    <span className="lead-name">Greg</span>
                </div>
            </div>

            <div className="room-content">
                <section className="room-intro">
                    <h2>Student Research & Community Projects</h2>
                    <p>Explore innovative sustainable initiatives and community projects from our talented students.</p>
                    <div className="judge-notice">
                        <span className="icon">⚖️</span>
                        <p>Students are presenting their projects for the judges' final decision.</p>
                    </div>
                </section>

                <div className="project-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                            <p className="student-name">By {project.student}</p>
                            <p className="project-desc">{project.description}</p>
                            <div className="card-footer">
                                <span className="status-tag">Ready for Judging</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ResearchRoom;
