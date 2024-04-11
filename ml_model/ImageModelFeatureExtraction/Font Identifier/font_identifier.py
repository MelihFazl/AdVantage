import requests
import base64
import json

# Load image file
with open(r'C:\Users\Trelans\Downloads\hello-c.png', 'rb') as file:
    image_data = file.read()

# Encode image data to base64
encoded_image = base64.b64encode(image_data).decode('utf-8')

# API endpoint
url = 'https://www.whatfontis.com/api2/'

# API key
api_key = 'be5ebb3fe4ebd0986e5f3b1d1c36f7abdea9e9791e05a5936ef1ddbbb685bf94'

# Request payload
data = {
    'API_KEY': api_key,
    'IMAGEBASE64': '1',
    'NOTTEXTBOXSDETECTION': '0',
    'urlimage': '',
    'urlimagebase64': encoded_image,
    'limit': '20'
}

# Make POST request
response = requests.post(url, data=data)

# Check for errors
if response.status_code != 200:
    print('Error:', response.text)
else:
    # Parse JSON response
    read_fonts = json.loads(response.text)
    print(read_fonts)
