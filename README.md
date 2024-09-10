Here’s the updated README with clear distinctions between code, scripting, and written instructions:

---

# Weather Data Aggregator App with Elasticsearch and Kibana

## Overview

The **Weather Data Aggregator App** is a full-stack application designed to scrape weather data (METAR reports) from various sources, store it in Azure Blob Storage, and index it in Elasticsearch for analysis with Kibana. The app uses Python for scraping, Node.js as a backend API, and integrates Elasticsearch for storing and querying weather data. Kibana provides a frontend interface to visualize the weather data.

The app is deployed on Azure, leveraging cloud resources to ensure scalability, reliability, and security.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
  - [Python Weather Scraper](#python-weather-scraper)
  - [Node.js Backend](#nodejs-backend)
  - [Elasticsearch and Kibana](#elasticsearch-and-kibana)
  - [Frontend](#frontend)
- [How It Works](#how-it-works)
- [Deployment on Azure](#deployment-on-azure)
- [Future Improvements](#future-improvements)

---

## Features

- **Weather Data Scraper**: Fetches METAR weather data using the Aviation Weather API and uploads it to Azure Blob Storage.
- **Backend API**: A Node.js backend retrieves the weather data from Azure Blob Storage and indexes it in Elasticsearch.
- **Elasticsearch & Kibana**: Weather data is stored in Elasticsearch for fast searching and analyzed in Kibana for visualization.
- **Azure Deployment**: The entire app (scraper, API, Elasticsearch, and Kibana) is deployed on Azure for high availability.
- **Modular Design**: The Python, Node.js, and Elasticsearch components are isolated, making it easy to extend and integrate more data sources.

---

## Project Structure

Here's the folder and file structure of the project:

```bash
weather-app/
├── backend/
│   ├── node/
│   │   ├── .env                   # Environment variables for Node.js
│   │   ├── package.json            # Node.js package dependencies
│   │   └── server.js               # Node.js server to serve weather data and index it in Elasticsearch
│   └── python-scripts/
│       ├── .env                    # Environment variables for Python
│       ├── weatherdatascraper.py    # Python script to fetch and upload weather data
├── elasticsearch/
│   └── index_template.json          # Elasticsearch index template for weather data
├── frontend/
│   ├── index.html                  # Simple weather dashboard (can be extended with Kibana dashboards)
└── README.md                       # Project documentation
```

---

## Installation

### Prerequisites

- **Python 3.x**
- **Node.js (v18 or above)**
- **Azure Storage Account**
- **Elasticsearch & Kibana (7.x+)**
  - You can run Elasticsearch on Azure as an Elastic Cloud resource, or you can spin up your own cluster.
- **Azure Virtual Machines** or **App Services** for hosting the scraper and backend.

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. **Set up the Python environment:**

    Navigate to `backend/python-scripts/` and create a virtual environment:

    ```bash
    cd backend/python-scripts
    python -m venv venv
    source venv/bin/activate  # On Windows use venv\Scripts\activate
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Create a `.env` file** with your Azure Storage account connection string:

    ```bash
    AZURE_CONNECTION_STRING=your_azure_connection_string
    ```

5. **Set up the Node.js environment:**

    Navigate to `backend/node/`:

    ```bash
    cd ../node
    ```

6. **Install Node.js dependencies:**

    ```bash
    npm install
    ```

7. **Create a `.env` file** with your Azure Storage account connection string and Elasticsearch settings:

    ```bash
    AZURE_CONNECTION_STRING=your_azure_connection_string
    ELASTICSEARCH_HOST=http://your-elasticsearch-url:9200
    ELASTICSEARCH_USERNAME=your_username
    ELASTICSEARCH_PASSWORD=your_password
    ```

8. **Elasticsearch Setup:**

    Define an index template using `elasticsearch/index_template.json`:

    ```json
    {
      "index_patterns": ["weather-data-*"],
      "settings": {
        "number_of_shards": 1
      },
      "mappings": {
        "properties": {
          "location": { "type": "geo_point" },
          "temperature": { "type": "float" },
          "humidity": { "type": "float" },
          "timestamp": { "type": "date" }
        }
      }
    }
    ```

9. **Upload the template to Elasticsearch:**

    ```bash
    curl -X PUT "http://your-elasticsearch-url:9200/_template/weather_template" \
    -H "Content-Type: application/json" \
    -d @elasticsearch/index_template.json
    ```

---

## Usage

### Python Weather Scraper

To fetch weather data and upload it to Azure Blob Storage, run the Python script:

```bash
cd backend/python-scripts
python weatherdatascraper.py
```

This fetches METAR weather data and uploads it to Azure Blob Storage as a JSON file (e.g., `metar_knkx.json`).

### Node.js Backend

To serve the weather data via a REST API and index it in Elasticsearch, start the Node.js server:

```bash
cd backend/node
node server.js
```

The server will be running at `http://localhost:3000`. You can access the weather data by navigating to:

```bash
http://localhost:3000/weather
```

### Elasticsearch and Kibana

- **Elasticsearch**: The Node.js backend will index the weather data in your Elasticsearch instance.
- **Kibana**: Use Kibana to visualize the indexed weather data. You can create custom dashboards to monitor weather metrics like temperature and humidity.

### Frontend

You can view the weather data in a simple dashboard using the frontend:

```bash
cd frontend
open index.html
```

---

## How It Works

1. **Weather Data Scraping (Python)**:  
   The Python script `weatherdatascraper.py` fetches METAR data from the Aviation Weather API using the `requests` library. The script uploads this data as a JSON file to Azure Blob Storage.

2. **Node.js Backend**:  
   The Node.js server fetches the weather data from Azure Blob Storage when a client makes a request to the `/weather` endpoint. It converts the data from the blob into JSON format, indexes it into Elasticsearch, and serves it via a REST API.

3. **Elasticsearch & Kibana**:  
   The data indexed in Elasticsearch can be queried quickly, and Kibana provides powerful visualizations and dashboards for analyzing the data.

4. **Frontend**:  
   The frontend, built with basic HTML+JavaScript, fetches weather data from the Node.js backend. Kibana offers more advanced data visualizations.

---

## Deployment on Azure

- **Python Weather Scraper**:  
  The Python scraper can be hosted on an Azure Virtual Machine or Azure App Services. Set up a cron job to periodically fetch weather data and upload it to Azure Blob Storage.

- **Node.js Backend**:  
  The Node.js backend can be hosted on Azure App Services or Azure Kubernetes Service (AKS) for scalability.

- **Elasticsearch and Kibana on Azure**:  
  Elasticsearch and Kibana can be deployed on Azure using Elastic Cloud, which provides hosted instances directly on Azure.

---

## Future Improvements

- **Support for Multiple Weather APIs**:  
  Add more weather sources (e.g., OpenWeatherMap, NOAA) for richer data.

- **Scheduling Data Updates**:  
  Automate data updates using Azure Functions or Logic Apps.

- **Enhanced Frontend with React**:  
  Build a more polished UI with real-time weather updates and better visualizations.

- **Machine Learning with Elasticsearch**:  
  Use Elasticsearch's machine learning features to analyze historical data and forecast trends.

- **Security Enhancements**:  
  Add OAuth2 for API access and rate limiting to prevent abuse of the weather API.

