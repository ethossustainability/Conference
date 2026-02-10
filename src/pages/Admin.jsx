import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

function Admin() {
    const { user } = useAuth();
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',');

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Admin Control Panel</h1>
                <p>Manage conference settings and user access</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Welcome, {user?.name}</h3>
                    <p>You have full administrative access.</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Admin Overview</h2>
                <div className="action-grid">
                    <div className="action-card">
                        <div className="action-icon">👥</div>
                        <div className="action-info">
                            <h3>Authorized Admins</h3>
                            <p>{adminEmails.length} emails configured</p>
                            <ul style={{ textAlign: 'left', marginTop: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                                {adminEmails.map(email => (
                                    <li key={email}>{email}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="action-card disabled">
                        <div className="action-icon">📊</div>
                        <div className="action-info">
                            <h3>User Statistics</h3>
                            <p>Coming Soon</p>
                        </div>
                    </div>

                    <div className="action-card disabled">
                        <div className="action-icon">⚙️</div>
                        <div className="action-info">
                            <h3>Site Settings</h3>
                            <p>Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-section" style={{ marginTop: '40px' }}>
                <h2>Live Auditorium Questions</h2>
                <div className="questions-container" style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    minHeight: '200px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    color: '#333'
                }}>
                    <LiveQuestions />
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h2 style={{ color: '#ff4d4d' }}>⚠️ Security Note</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    This page is only visible to users whose email is listed in the <code>VITE_ADMIN_EMAILS</code> environment variable.
                    To add or remove admins, update your <code>.env</code> file (locally) or your deployment platform's environment variables.
                </p>
            </div>
        </div>
    );
}

function LiveQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const loadQuestions = () => {
            const saved = localStorage.getItem('admin_inbox_questions');
            if (saved) {
                try {
                    setQuestions(JSON.parse(saved).reverse()); // Newest first
                } catch (e) {
                    console.error("Error parsing questions", e);
                }
            }
        };

        loadQuestions();
        // Poll every 5 seconds
        const interval = setInterval(loadQuestions, 5000);
        return () => clearInterval(interval);
    }, []);

    const clearQuestions = () => {
        if (window.confirm('Clear all questions?')) {
            localStorage.removeItem('admin_inbox_questions');
            setQuestions([]);
        }
    };

    if (questions.length === 0) {
        return <p className="no-data" style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', padding: '20px' }}>No questions received yet.</p>;
    }

    return (
        <div className="live-questions-list">
            <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>{questions.length} Questions</span>
                <button
                    onClick={clearQuestions}
                    style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear All
                </button>
            </div>
            {questions.map((q, i) => (
                <div key={i} className="admin-question-card" style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #007bff'
                }}>
                    <div className="q-meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#666' }}>
                        <span className="q-user" style={{ fontWeight: 'bold' }}>{q.user || 'Anonymous'}</span>
                        <span className="q-time">{new Date(q.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="q-text" style={{ margin: 0, fontSize: '1rem' }}>{q.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Admin;
