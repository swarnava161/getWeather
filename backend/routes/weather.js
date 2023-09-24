const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { city } = req.query; // Get the city from the query parameters

    // Make an HTTP request to the weather API using the city parameter
    const apiKey = 'cddc6423dab884bf23ce5f18d8c744d0'; // Replace with your actual API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;;
    const response = await axios.get(weatherApiUrl);

    const weatherData = response.data; // Extract the weather data from the response

    // Return the weather data as JSON
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
