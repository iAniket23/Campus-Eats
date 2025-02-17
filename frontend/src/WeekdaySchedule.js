import React, { useState, useEffect } from "react";

function WeekdaySchedule() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);


  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


  const lockedMeals = JSON.parse(localStorage.getItem("lockedMeals")) || {};

  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thurs: "Thursday",
    Fri: "Friday",
  };


  const idealMealTimes = [
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
  ];


  useEffect(() => {
    fetch("http://127.0.0.1:5001/schedule")
      .then((response) => response.json())
      .then((data) => {

        const updated = addMealsToSchedule(data, lockedMeals);
        setSchedule(updated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setLoading(false);
      });
  }, []);

  /**
   * Insert locked meals into the first available timeslot
   * among idealMealTimes for each day.
   */
  function addMealsToSchedule(originalSchedule, locked) {
    
    const newSchedule = JSON.parse(JSON.stringify(originalSchedule));

    for (let shortDay in locked) {
      const mealName = locked[shortDay].name;
      const fullDay = dayMap[shortDay];

      if (newSchedule[fullDay]) {
        
        for (let time of idealMealTimes) {
          if (newSchedule[fullDay][time] === "empty") {
            newSchedule[fullDay][time] = {
              class: mealName,
              location: "Meal Time",
            };
            break;
          }
        }
      }
    }
    return newSchedule;
  }

 
  function parseTimeToMinutes(timeStr) {
    const [hourMin, ampm] = timeStr.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);

    if (ampm === "AM" && hour === 12) hour = 0;
    if (ampm === "PM" && hour !== 12) hour += 12; 
    return hour * 60 + minute;
  }


  function minutesToTimeStr(totalMinutes) {
    let hour = Math.floor(totalMinutes / 60);
    let minute = totalMinutes % 60;
    const ampm = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour = 12; // 0 -> 12 AM
    } else if (hour > 12) {
      hour -= 12; // e.g. 13 -> 1 PM
    }

    const minuteStr = minute.toString().padStart(2, "0");
    return `${hour}:${minuteStr} ${ampm}`;
  }

  /**
   * Merges consecutive time slots that share the same event into one block.
   * If we have 9:00 AM -> class, 9:30 AM -> class, the final block will be
   * '9:00 AM to 10:00 AM: class' (since 9:30 + 30 min = 10:00).
   */
  function groupConsecutive(sortedTimes) {
    const blocks = [];
    let i = 0;

    while (i < sortedTimes.length) {
      const [startTime, evt] = sortedTimes[i];


      let blockStartMins = parseTimeToMinutes(startTime);
      let blockEndMins = blockStartMins + 30; 


      let eventKey, eventObj;
      if (evt === "empty") {
        eventKey = "empty";
        eventObj = null;
      } else {
        eventKey = JSON.stringify(evt);
        eventObj = evt;
      }

     
      while (
        i + 1 < sortedTimes.length &&
        (sortedTimes[i + 1][1] === "empty"
          ? "empty"
          : JSON.stringify(sortedTimes[i + 1][1])) === eventKey
      ) {

        const [nextTime] = sortedTimes[i + 1];
        let nextStartMins = parseTimeToMinutes(nextTime);

        
        blockEndMins = nextStartMins + 30;
        i++;
      }

      blocks.push({
        start: minutesToTimeStr(blockStartMins),
        end: minutesToTimeStr(blockEndMins),
        eventKey,
        eventObj,
      });

      i++;
    }
    return blocks;
  }

  function renderBlock(block) {
    const { start, end, eventKey, eventObj } = block;
    const isSingleSlot = start === end;
    

    const isMeal = eventObj?.location === "Meal Time";
  
    if (eventKey === "empty") {
 
      return isSingleSlot ? (
        <li key={`${start}-${end}`} className="empty-block">
          {start}: No Scheduled Activity
        </li>
      ) : (
        <li key={`${start}-${end}`} className="empty-block">
          {start} to {end}: No Scheduled Activity
        </li>
      );
    } else {

      const listItemClass = isMeal ? "meal-block" : "event-block";
      if (isSingleSlot) {
        return (
          <li key={`${start}-${end}`} className={listItemClass}>
            {start}: {eventObj.class} ({eventObj.location})
          </li>
        );
      } else {
        return (
          <li key={`${start}-${end}`} className={listItemClass}>
            {start} to {end}: {eventObj.class} ({eventObj.location})
          </li>
        );
      }
    }
  }
  

  if (loading) return <div>Loading schedule...</div>;
  if (!schedule) return <div>Error loading schedule.</div>;

  return (
    <div className="weekday-schedule">
      <h1 className="schedule-title">Your Weekday Schedule</h1>
      <div className="schedule-container">
        {dayOrder.map((day) => {
          const times = Object.entries(schedule[day] || {}).sort(
            (a, b) => parseTimeToMinutes(a[0]) - parseTimeToMinutes(b[0])
          );

          const blocks = groupConsecutive(times);

          return (
            <div className="schedule-day" key={day}>
              <h2>{day}</h2>
              <ul>{blocks.map(renderBlock)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekdaySchedule;
