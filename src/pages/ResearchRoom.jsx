import React from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

function ResearchRoom() {
    const projects = [
        { id: 1, title: "Project A", student: "Presenter A", description: "Project description goes here." },
        { id: 2, title: "Project B", student: "Presenter B", description: "Project description goes here." },
        { id: 3, title: "Project C", student: "Presenter C", description: "Project description goes here." },
    ];

    return (
        <div className="room-page">
            <div className="room-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>Poster and Research Room</h1>
            </div>

            <div className="room-content">
                <section className="room-intro">
                    <h2>Student Research & Community Projects</h2>
                    <p>Explore innovative sustainable initiatives and community projects.</p>
                    <div className="judge-notice">
                        <span className="icon">⚖️</span>
                        <p>Projects are being presented for judging.</p>
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
