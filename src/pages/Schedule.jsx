import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import './Schedule.css';

function Schedule() {
  // Example schedule data - in production, this would come from an API
  const [schedule] = useState([
    {
      id: 1,
      title: 'Welcome & Opening Keynote',
      speaker: 'Dr. Jane Smith',
      time: '09:00 - 10:00',
      location: 'Main Hall',
      description: 'Join us for the opening keynote address and welcome ceremony.',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: 'Networking Break',
      speaker: null,
      time: '10:00 - 10:30',
      location: 'Lobby',
      description: 'Coffee, refreshments, and networking opportunity.',
      date: '2024-03-15',
    },
    {
      id: 3,
      title: 'The Future of Web Development',
      speaker: 'John Doe',
      time: '10:30 - 11:30',
      location: 'Room A',
      description: 'Explore the latest trends and technologies in web development.',
      date: '2024-03-15',
    },
    {
      id: 4,
      title: 'AI in Business Applications',
      speaker: 'Sarah Johnson',
      time: '10:30 - 11:30',
      location: 'Room B',
      description: 'Learn how AI is transforming business processes.',
      date: '2024-03-15',
    },
    {
      id: 5,
      title: 'Lunch Break',
      speaker: null,
      time: '12:00 - 13:30',
      location: 'Dining Hall',
      description: 'Buffet lunch served.',
      date: '2024-03-15',
    },
    {
      id: 6,
      title: 'Panel Discussion: Industry Insights',
      speaker: 'Multiple Speakers',
      time: '13:30 - 15:00',
      location: 'Main Hall',
      description: 'A panel of industry experts share their insights.',
      date: '2024-03-15',
    },
    {
      id: 7,
      title: 'Closing Remarks',
      speaker: 'Conference Organizers',
      time: '16:00 - 16:30',
      location: 'Main Hall',
      description: 'Thank you and closing remarks.',
      date: '2024-03-15',
    },
  ]);

  const [selectedDate] = useState('2024-03-15');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredSchedule = schedule.filter(item => item.date === selectedDate);

  const groupedSchedule = filteredSchedule.reduce((acc, item) => {
    const timeSlot = item.time.split(' - ')[0];
    if (!acc[timeSlot]) {
      acc[timeSlot] = [];
    }
    acc[timeSlot].push(item);
    return acc;
  }, {});

  const sortedTimeSlots = Object.keys(groupedSchedule).sort();

  return (
    <div className="schedule-page">
      <div className="container">
        <h1>Conference Schedule</h1>
        <p className="page-description">
          View all events and sessions happening at the conference
        </p>

        <div className="schedule-content">
          {sortedTimeSlots.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No schedule available</h3>
              <p>Schedule information will be updated soon.</p>
            </div>
          ) : (
            <div className="schedule-list">
              {sortedTimeSlots.map((timeSlot) => (
                <div key={timeSlot} className="schedule-time-group">
                  <div className="time-header">
                    <span className="time-badge">{timeSlot}</span>
                  </div>
                  <div className="events-list">
                    {groupedSchedule[timeSlot].map((event) => (
                      <div
                        key={event.id}
                        className={`schedule-item ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="schedule-item-header">
                          <h3>{event.title}</h3>
                          <span className="schedule-location">{event.location}</span>
                        </div>
                        {event.speaker && (
                          <p className="schedule-speaker">{event.speaker}</p>
                        )}
                        <p className="schedule-time">{event.time}</p>
                        {selectedEvent?.id === event.id && (
                          <div className="schedule-description">
                            <p>{event.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default Schedule;

