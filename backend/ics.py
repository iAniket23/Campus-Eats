from flask import Flask, request, jsonify
import icalendar
import json
from datetime import datetime, timedelta
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


def generate_time_slots(start_hour, end_hour):
    """
    Generate half-hour time slots between start_hour and end_hour (inclusive).
    For example, start_hour=8, end_hour=19 produces:
    "8:00 AM", "8:30 AM", ..., "7:30 PM".
    """
    slots = []
    current = datetime(2000, 1, 1, start_hour, 0)
    end_time = datetime(2000, 1, 1, end_hour, 30)
    while current <= end_time:
        time_str = current.strftime("%I:%M %p").lstrip("0")
        slots.append(time_str)
        current += timedelta(minutes=30)
    return slots

def get_event_slots(dtstart, dtend, time_slots):
    """
    Given dtstart and dtend as datetime objects and a list of time slot strings,
    return all slots that overlap with the event.
    """
    event_slots = []
    # Use an arbitrary reference date for comparison (e.g., Jan 1, 2000)
    ref_date = datetime(2000, 1, 1)
    # Map event start and end to the reference date (we only care about the time)
    event_start = ref_date.replace(hour=dtstart.hour, minute=dtstart.minute)
    event_end = ref_date.replace(hour=dtend.hour, minute=dtend.minute)
    
    for slot in time_slots:
        # Parse the slot string into a datetime on the reference date
        slot_start = datetime.strptime(slot, "%I:%M %p").replace(year=2000, month=1, day=1)
        slot_end = slot_start + timedelta(minutes=30)
        # If the event overlaps this slot, add it.
        if event_start < slot_end and event_end > slot_start:
            event_slots.append(slot)
    return event_slots

def extract_schedule_from_ics(file):
    """Extract schedule data from the .ics file and map events into the fixed time slots."""
    # Parse the .ics file
    calendar = icalendar.Calendar.from_ical(file.read())
    
    # Predefine schedule structure: Monday–Friday with half-hour slots from 8:00 AM to 7:30 PM
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = generate_time_slots(8, 19)
    schedule = {day: {slot: "empty" for slot in time_slots} for day in days}
    
    # Mapping from iCalendar day abbreviations to full weekday names
    day_mapping = {"MO": "Monday", "TU": "Tuesday", "WE": "Wednesday", "TH": "Thursday", "FR": "Friday"}
    
    # Process each event in the calendar
    for component in calendar.walk():
        if component.name == "VEVENT":
            summary = str(component.get("SUMMARY"))
            # Use LOCATION if available; default to "None"
            location = str(component.get("LOCATION", "None"))
            dtstart = component.get("DTSTART").dt
            dtend = component.get("DTEND").dt

            # If the event is a date (without time), combine with a default time
            if not isinstance(dtstart, datetime):
                dtstart = datetime.combine(dtstart, datetime.min.time())
            if not isinstance(dtend, datetime):
                dtend = datetime.combine(dtend, datetime.min.time())
            
            # Determine which time slots this event covers
            event_slots = get_event_slots(dtstart, dtend, time_slots)
            
            # Check if the event has a recurrence rule (RRULE)
            rrule = component.get("RRULE")
            if rrule:
                # Get BYDAY from the RRULE (e.g., ["MO", "WE", "FR"])
                byday = rrule.get("BYDAY", [])
                for day_abbr in byday:
                    full_day = day_mapping.get(day_abbr)
                    if full_day and full_day in schedule:
                        for slot in event_slots:
                            schedule[full_day][slot] = {"class": summary, "location": location}
            else:
                # For non-recurring events, use the event's own day (e.g., Monday)
                day_of_week = dtstart.strftime("%A")
                if day_of_week in schedule:
                    for slot in event_slots:
                        schedule[day_of_week][slot] = {"class": summary, "location": location}
    
    return schedule

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle .ics file uploads and return a JSON schedule."""
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        if file.filename.endswith(".ics"):
            schedule = extract_schedule_from_ics(file)

            # Save the schedule JSON to a file
            with open("schedule.json", "w") as f:
                json.dump(schedule, f, indent=4)

            return jsonify({"message": "Schedule JSON created successfully", "file": "schedule.json"})
        else:
            return jsonify({"error": "Invalid file format. Please upload an .ics file."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/schedule', methods=['GET'])
def get_schedule():
    try:
        with open("schedule.json") as f:
            schedule = json.load(f)
        return jsonify(schedule)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001,debug=True)



