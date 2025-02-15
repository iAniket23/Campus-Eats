import React from "react";

function WeekdaySchedule() {
  // Placeholder schedule data for Monday to Friday
  const scheduleData = {
    Monday: [
      { time: "8:00 AM", event: "Class: Math 101" },
      { time: "9:30 AM", event: "Meal: Random Meal 42" },
      { time: "10:30 AM", event: "Class: History 202" },
      { time: "12:00 PM", event: "Lunch: Random Meal 67" },
      { time: "1:30 PM", event: "Class: Chemistry 303" },
      { time: "3:00 PM", event: "Snack: Random Meal 88" },
      { time: "4:30 PM", event: "Class: English 404" },
    ],
    Tuesday: [
      { time: "8:30 AM", event: "Class: Physics 101" },
      { time: "10:00 AM", event: "Meal: Random Meal 55" },
      { time: "11:00 AM", event: "Class: Biology 201" },
      { time: "12:30 PM", event: "Lunch: Random Meal 33" },
      { time: "2:00 PM", event: "Class: Economics 301" },
      { time: "3:30 PM", event: "Snack: Random Meal 72" },
      { time: "5:00 PM", event: "Class: Philosophy 101" },
    ],
    Wednesday: [
      { time: "9:00 AM", event: "Class: CS 101" },
      { time: "10:30 AM", event: "Meal: Random Meal 23" },
      { time: "11:30 AM", event: "Class: Art 202" },
      { time: "1:00 PM", event: "Lunch: Random Meal 44" },
      { time: "2:30 PM", event: "Class: Music 101" },
      { time: "4:00 PM", event: "Snack: Random Meal 11" },
    ],
    Thursday: [
      { time: "8:00 AM", event: "Class: Statistics 101" },
      { time: "9:30 AM", event: "Meal: Random Meal 77" },
      { time: "10:30 AM", event: "Class: Geography 102" },
      { time: "12:00 PM", event: "Lunch: Random Meal 66" },
      { time: "1:30 PM", event: "Class: Literature 103" },
      { time: "3:00 PM", event: "Snack: Random Meal 55" },
      { time: "4:30 PM", event: "Class: Sociology 104" },
    ],
    Friday: [
      { time: "8:30 AM", event: "Class: Political Science 101" },
      { time: "10:00 AM", event: "Meal: Random Meal 99" },
      { time: "11:00 AM", event: "Class: Psychology 202" },
      { time: "12:30 PM", event: "Lunch: Random Meal 10" },
      { time: "2:00 PM", event: "Class: Business 303" },
      { time: "3:30 PM", event: "Snack: Random Meal 65" },
      { time: "5:00 PM", event: "Class: Law 101" },
    ],
  };

  return (
    <div className="weekday-schedule">
      <h1>Your Weekday Schedule</h1>
      <p>
        Here’s your class and meal schedule blended together. (Placeholder data)
      </p>
      <div className="schedule-container">
        {Object.entries(scheduleData).map(([day, events]) => (
          <div className="schedule-day" key={day}>
            <h2>{day}</h2>
            <ul>
              {events.map((evt, index) => (
                <li key={index}>
                  <strong>{evt.time}:</strong> {evt.event}
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
