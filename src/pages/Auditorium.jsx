import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Notes from '../components/Notes';
import './Auditorium.css';

function Auditorium() {
    // Mock data for current event
    const currentEvent = {
        id: 'keynote-1',
        title: 'Welcome & Opening Keynote',
        speaker: 'Dr. Jane Smith',
        time: '09:00 - 10:00 AM',
        description: 'Join us for the opening keynote address and welcome ceremony. Dr. Smith discusses the future of sustainable technology.',
    };

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Load sent messages from localStorage
    useEffect(() => {
        const savedMessages = localStorage.getItem('auditorium_user_messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            text: newMessage,
            timestamp: new Date().toISOString(),
            sender: 'user' // In a real app, use user ID
        };

        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
        setNewMessage('');

        // Save to user's local history
        localStorage.setItem('auditorium_user_messages', JSON.stringify(updatedMessages));

        // Simulate sending to "Admin" by saving to a shared key (for demo purposes)
        const allQuestions = JSON.parse(localStorage.getItem('admin_inbox_questions') || '[]');
        allQuestions.push({ ...message, user: 'Attendee' }); // Add user info
        localStorage.setItem('admin_inbox_questions', JSON.stringify(allQuestions));
    };

    return (
        <div className="auditorium-page">
            <div className="page-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <div className="container">
                    <h1>Main Auditorium</h1>
                </div>
            </div>

            <div className="auditorium-content container">
                <div className="main-stage-col">
                    <div className="stage-info-card">
                        <div className="live-indicator">
                            <span className="pulsing-dot"></span>
                            LIVE NOW
                        </div>
                        <h2>{currentEvent.title}</h2>
                        <div className="event-meta">
                            <p className="speaker"><strong>Speaker:</strong> {currentEvent.speaker}</p>
                            <p className="time"><strong>Time:</strong> {currentEvent.time}</p>
                        </div>
                        <p className="description">{currentEvent.description}</p>
                    </div>

                    <div className="qa-section">
                        <div className="qa-header">
                            <h3>Ask the Host</h3>
                            <p className="qa-subtitle">Direct message the AV team/Host. Your questions are private.</p>
                        </div>

                        <div className="qa-chat-box">
                            {messages.length === 0 ? (
                                <div className="empty-chat">
                                    <p>No questions sent yet. Ask something!</p>
                                </div>
                            ) : (
                                <div className="messages-list">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className="message-bubble sent">
                                            <p>{msg.text}</p>
                                            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSendMessage} className="qa-input-area">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your question here..."
                                className="qa-input"
                            />
                            <button type="submit" disabled={!newMessage.trim()} className="btn-primary send-btn">
                                Send
                            </button>
                        </form>
                    </div>
                </div>

                <div className="notes-section">
                    <Notes eventId={currentEvent.id} />
                </div>
            </div>

            <Navigation />
        </div>
    );
}

export default Auditorium;
