import os

# Update the path with your uploaded key file's name
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './studied-anchor-451016-e0-4d0f2d767424.json'


from google.cloud import vision

# Initialize client
client = vision.ImageAnnotatorClient()

# Load and analyze the image
image_path = "1.png"
with open(image_path, "rb") as image_file:
    content = image_file.read()

image = vision.Image(content=content)
response = client.text_detection(image=image)

# Extract text
extracted_text = response.text_annotations[0].description
print(extracted_text)
