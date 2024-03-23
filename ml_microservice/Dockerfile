FROM python:3.11-slim

WORKDIR /app

# Copy only necessary files for installing dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .