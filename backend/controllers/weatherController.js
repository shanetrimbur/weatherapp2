const axios = require("axios");
const esClient = require("../config/elasticsearch");

exports.getWeather = async (req, res) => {
  try {
    const weatherData = await axios.get("https://aviationweather.gov/api/data/metar?ids=KNKX&format=json");
    const result = await esClient.index({
      index: "weather-data",
      body: {
        location: weatherData.data.features[0].properties.station,
        temperature: weatherData.data.features[0].properties.temp_c,
        wind_speed: weatherData.data.features[0].properties.wind_speed_kt,
        timestamp: weatherData.data.features[0].properties.observation_time
      }
    });
    res.json({ message: "Weather data indexed to Elasticsearch", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

