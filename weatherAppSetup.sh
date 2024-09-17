#!/bin/bash

# Create the main project directory
mkdir aviation-weather-dashboard
cd aviation-weather-dashboard

# Set up the React frontend
npx create-react-app frontend

# Create backend directory
mkdir backend
cd backend

# Initialize Node.js backend
npm init -y
npm install express axios dotenv @azure/storage-blob

# Create basic backend files
cat <<EOL > server.js
const express = require('express');
const axios = require('axios');
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Azure Blob Storage Configuration
const connectionString = process.env.AZURE_CONNECTION_STRING;
const containerName = "weathercontainer1";

// Get weather data from Aviation Weather API
app.get('/api/weather', async (req, res) => {
    const apiUrl = 'https://aviationweather.gov/api/data/metar?ids=KNKX&format=json&taf=true&hours=96&bbox=40%2C-90%2C45%2C-85&date=2024-08-13T20%3A10%3A01Z';
    
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const weatherData = response.data;
            // Return the weather data to the frontend
            res.json(weatherData);
        } else {
            res.status(response.status).send("Failed to fetch weather data.");
        }
    } catch (error) {
        res.status(500).send("Error fetching weather data.");
    }
});

// API to upload weather data to Azure Blob Storage
app.post('/api/upload', async (req, res) => {
    const blobName = 'metar_knkx.json';
    const weatherData = JSON.stringify(req.body);

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        await blockBlobClient.upload(weatherData, weatherData.length);
        res.send(\`Data uploaded to Azure Blob Storage: \${blobName}\`);
    } catch (error) {
        res.status(500).send("Error uploading data to Azure Blob Storage.");
    }
});

app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
});
EOL

# Create .env for storing Azure connection string
touch .env

# Create directory for Python weather scraper
cd ..
mkdir weather-scraper
cd weather-scraper

# Add Python weather scraper
cat <<EOL > weatherdatascraper.py
from azure.storage.blob import BlobServiceClient
import requests

# Azure Blob Storage Configuration
connection_string = "DefaultEndpointsProtocol=https;AccountName=weatherstorageaccount;AccountKey=[INSERT KEY]EndpointSuffix=core.usgovcloudapi.net"
container_name = "weathercontainer1"
blob_name = "metar_knkx.json"

# Aviation Weather API Configuration
api_url = "https://aviationweather.gov/api/data/metar?ids=KNKX&format=json&taf=true&hours=96&bbox=40%2C-90%2C45%2C-85&date=2024-08-13T20%3A10%3A01Z"
response = requests.get(api_url)

if response.status_code == 200:
    data = response.content
else:
    raise Exception(f"Failed to retrieve data: {response.status_code}")

# Upload to Azure Blob Storage
blob_service_client = BlobServiceClient.from_connection_string(connection_string)
blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)
blob_client.upload_blob(data, overwrite=True)

print(f"Data uploaded to Azure Blob Storage: {blob_name}")
EOL

# Go back to project root
cd ..

# Create a README file
cat <<EOL > README.md
# Aviation Weather Dashboard

## Project Structure

- **frontend/**: React app for the interactive weather dashboard.
- **backend/**: Node.js backend to fetch weather data from APIs and upload to Azure Blob Storage.
- **weather-scraper/**: Python script to scrape weather data from APIs and upload to Azure Blob Storage.

## Setup Instructions

1. **Frontend (React)**:
   - Navigate to \`frontend\` directory and run \`npm start\` to run the development server.
   - Install dependencies:
     \`\`\`bash
     cd frontend
     npm install
     \`\`\`

2. **Backend (Node.js)**:
   - Navigate to \`backend\` directory and run \`npm start\` to start the Node.js server.
   - Install dependencies:
     \`\`\`bash
     cd backend
     npm install
     \`\`\`
   - Add Azure connection string to \`.env\` file in \`backend\`:
     \`\`\`
     AZURE_CONNECTION_STRING=your_connection_string
     \`\`\`

3. **Python Weather Scraper**:
   - Navigate to \`weather-scraper\` directory and run the Python script:
     \`\`\`bash
     python3 weatherdatascraper.py
     \`\`\`

4. **Deployment**:
   - Deploy the backend to Azure App Services.
   - Deploy the frontend to Azure Static Web Apps.

## Tools Integrated

- React for frontend.
- Node.js for backend API.
- Python for weather data scraping.
- Azure Blob Storage for weather data storage.
EOL

# Output completion message
echo "Project structure created successfully!"

