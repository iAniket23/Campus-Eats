import React, { useState, useEffect } from 'react';

function WeekdaySchedule() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/schedule')
      .then(response => response.json())
      .then(data => {
        setSchedule(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading schedule...</div>;
  }

  if (!schedule) {
    return <div>Error loading schedule.</div>;
  }

  return (
    <div className="weekday-schedule">
      <h1>Your Weekday Schedule</h1>
      <div className="schedule-container">
        {Object.entries(schedule).map(([day, timeSlots]) => (
          <div className="schedule-day" key={day}>
            <h2>{day}</h2>
            <ul>
              {Object.entries(timeSlots).map(([time, event]) => (
                <li key={time}>
                  <strong>{time}: </strong>
                  {event === "empty" ? (
                    "Empty"
                  ) : (
                    <>
                      {event.class} <em>({event.location})</em>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekdaySchedule;
