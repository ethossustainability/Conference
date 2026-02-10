import React, { useState, useEffect } from 'react';
import './Notes.css';

function Notes({ eventId = 'general' }) {
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem(`note_${eventId}`);
        if (savedNote) {
            setNote(savedNote);
        }
    }, [eventId]);

    const handleChange = (e) => {
        const newNote = e.target.value;
        setNote(newNote);
        localStorage.setItem(`note_${eventId}`, newNote);
    };

    return (
        <div className="notes-container">
            <h3>My Notes</h3>
            <textarea
                className="notes-area"
                value={note}
                onChange={handleChange}
                placeholder="Type your notes here... (Automatically saved)"
            />
        </div>
    );
}

export default Notes;
