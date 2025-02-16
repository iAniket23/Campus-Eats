from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
from pdf2image import convert_from_path
import re
import json

app = Flask(__name__)
#app.run(debug=True)


# Helper functions
def extract_text_from_image(file):
    """Extract text from an uploaded image."""
    img = Image.open(file)
    return pytesseract.image_to_string(img)

def extract_text_from_pdf(file):
    """Extract text from a PDF by converting it to images and running OCR."""
    pages = convert_from_path(file, 300)  # Convert PDF pages to images (300 DPI)
    text = ""
    for page in pages:
        text += pytesseract.image_to_string(page)
    return text

def generate_time_slots(start, end, interval=1):
    """Generate time slots in HH:MM AM/PM format."""
    slots = []
    current_hour = start
    while current_hour <= end:
        for minute in [0, 30]:
            hour_12 = current_hour if current_hour <= 12 else current_hour - 12
            period = "AM" if current_hour < 12 else "PM"
            slots.append(f"{hour_12}:{minute:02} {period}")
        current_hour += interval
    return slots

def process_schedule_text(extracted_text):
    """Process raw text into a structured schedule."""
    # Initialize schedule structure
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    time_slots = generate_time_slots(8, 19)  # 8:00 AM to 7:00 PM
    schedule = {day: {time: "empty" for time in time_slots} for day in days}

    # Regular expressions to parse the schedule
    lines = extracted_text.split("\n")
    for line in lines:
        for day in days:
            if day in line:
                # Find time, class, and location details in the line
                match = re.search(r"(\d{1,2}:\d{2} [APM]+).+?(\w+ \d+).+?([A-Z]+\s\d+-\d+)", line)
                if match:
                    time, class_name, location = match.groups()
                    if time in schedule[day]:
                        schedule[day][time] = {"class": class_name, "location": location}

    return schedule

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads (image or PDF) and return a JSON schedule."""
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        # Detect file type
        if file.filename.endswith('.pdf'):
            extracted_text = extract_text_from_pdf(file)
        else:
            extracted_text = extract_text_from_image(file)

        # Process text into structured schedule with empty slots
        schedule = process_schedule_text(extracted_text)

        # Save JSON to file
        with open("schedule.json", "w") as json_file:
            json.dump(schedule, json_file, indent=4)

        return jsonify({"message": "Schedule JSON created successfully", "file": "schedule.json"})

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
    app.run(debug=True)