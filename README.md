# Weather Data Aggregator App with Elasticsearch and Kibana

## Overview

The **Weather Data Aggregator App** is a full-stack application designed to scrape weather data (METAR reports) from various weather sources, store it in Azure Blob Storage, and index it in Elasticsearch for analysis with Kibana. The app uses Python for scraping, Node.js as a backend API, and integrates Elasticsearch for storing and querying weather data. Kibana provides a frontend interface to visualize the weather data. 

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
- **Backend API**: A Node.js backend that retrieves the weather data from Azure Blob Storage and indexes it in Elasticsearch.
- **Elasticsearch & Kibana**: The weather data is stored in Elasticsearch for fast searching and analyzed in Kibana for visualization.
- **Azure Deployment**: The entire app (scraper, API, Elasticsearch, and Kibana) is deployed on Azure for high availability.
- **Modular Design**: The Python, Node.js, and Elasticsearch components are isolated, making it easy to extend and integrate with more data sources.

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

Installation
Prerequisites

    Python 3.x
    Node.js (v18 or above)
    Azure Storage Account
    Elasticsearch & Kibana (7.x+)
        You can run Elasticsearch on Azure as an Elastic Cloud resource, or you can spin up your own cluster.
    Azure Virtual Machines or App Services for hosting the scraper and backend

Steps

    Clone the repository:

    bash

git clone https://github.com/your-username/weather-app.git
cd weather-app

Set up the Python environment:

    Navigate to backend/python-scripts/ and create a virtual environment:

    bash

cd backend/python-scripts
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate

Install dependencies:

bash

pip install -r requirements.txt

Create a .env file with your Azure Storage account connection string:

bash

    AZURE_CONNECTION_STRING=your_azure_connection_string

Set up the Node.js environment:

    Navigate to backend/node/:

    bash

cd ../node

Install dependencies:

bash

npm install

Create a .env file with your Azure Storage account connection string and Elasticsearch settings:

bash

    AZURE_CONNECTION_STRING=your_azure_connection_string
    ELASTICSEARCH_HOST=http://your-elasticsearch-url:9200
    ELASTICSEARCH_USERNAME=your_username
    ELASTICSEARCH_PASSWORD=your_password

Elasticsearch Setup:

    You need to create an index in Elasticsearch. You can define a template for the weather data using elasticsearch/index_template.json:

    json

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

Upload the template to Elasticsearch:

bash

        curl -X PUT "http://your-elasticsearch-url:9200/_template/weather_template" \
        -H "Content-Type: application/json" \
        -d @elasticsearch/index_template.json

Usage
Python Weather Scraper

To fetch weather data and upload it to Azure Blob Storage, run the Python script:

bash

cd backend/python-scripts
python weatherdatascraper.py

This will fetch weather data from the aviation weather API and upload it as a JSON file (metar_knkx.json) to Azure Blob Storage.
Node.js Backend

To serve the weather data via a REST API and index it in Elasticsearch, start the Node.js server:

bash

cd backend/node
node server.js

The server will be running on http://localhost:3000, and you can access the weather data by navigating to:

bash

http://localhost:3000/weather

Elasticsearch and Kibana

    Elasticsearch: The Node.js backend will index the weather data into your Elasticsearch instance.
    Kibana: Use Kibana to visualize the indexed weather data. You can create custom dashboards and data visualizations to monitor temperature, humidity, or other relevant weather metrics.

Frontend

The frontend can be used as a simple dashboard, but the main visualization will be done through Kibana. For simple use cases, you can view the weather data in the browser.

bash

cd frontend
open index.html

How It Works

    Weather Data Scraping (Python):
    The Python script weatherdatascraper.py fetches METAR data from the Aviation Weather API using the requests library. The script uploads this data as a JSON file to Azure Blob Storage.

    Node.js Backend:
    The Node.js server fetches the weather data from Azure Blob Storage when a client makes a request to the /weather endpoint. It converts the data from the blob into JSON format, indexes it into Elasticsearch, and serves it as a RESTful API.

    Elasticsearch & Kibana:
    The data indexed in Elasticsearch can be queried for fast searches, and Kibana provides rich visualizations and dashboards to analyze the data.

    Frontend:
    The frontend, built with plain HTML+JavaScript, fetches the weather data from the Node.js backend. Alternatively, Kibana can be used to visualize the weather data in more advanced ways.

Deployment on Azure
Python Weather Scraper

    The Python scraper can be hosted on an Azure Virtual Machine or Azure App Services.
    You can set up a cron job to periodically fetch weather data and upload it to Azure Blob Storage.

Node.js Backend

    The Node.js backend can also be hosted on Azure App Services or Azure Kubernetes Service (AKS) for scalability.

Elasticsearch and Kibana on Azure

    Elasticsearch and Kibana can be deployed on Azure using Elastic Cloud. Elastic Cloud is a managed service that provides hosted Elasticsearch and Kibana instances directly on Azure.

Steps:

    Create Azure Virtual Machines or use Azure App Services to host both the Python scraper and the Node.js backend.
    Set up Elastic Cloud on Azure to deploy Elasticsearch and Kibana.
    Automate data ingestion by running the Python scraper at intervals (via cron or Azure Functions).
    Use Kibana dashboards to visualize real-time weather data directly from Elasticsearch.

Future Improvements

With further iterations, the following improvements can be made:

    Support for Multiple Weather APIs:
    Add additional weather sources (such as OpenWeatherMap, NOAA, etc.) to enrich the data and provide more detailed weather forecasts.

    Scheduling Data Updates:
    Implement an Azure Function or Logic App to automatically update the weather data at regular intervals.

    Enhanced Frontend with React:
    Build a more polished and professional frontend using React, with real-time weather updates and rich visualizations.

    Machine Learning with Elasticsearch:
    Use Elastic's machine learning features to analyze historical weather data and forecast trends or anomalies.

    Security Enhancements:
        Use OAuth2 for secure API access.
        Add rate limiting to prevent abuse of the weather API.
        Implement authentication for Kibana dashboards to restrict access to authorized users.

Conclusion

The Weather Data Aggregator App provides a foundation for collecting, processing, and analyzing weather data using cloud-native technologies. By integrating Elasticsearch and Kibana, this project is capable of offering powerful data visualizations and analytics. With future improvements, the app can become a highly scalable, fully featured weather monitoring platform.
