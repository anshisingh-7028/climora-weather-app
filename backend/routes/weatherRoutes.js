const express = require("express");
const router = express.Router();

const {
  getCurrentWeather,
  getForecast,
  getWeatherByLocation,
  getForecastByLocation,
} = require("../controllers/weatherController");

router.get("/current", getCurrentWeather);
router.get("/forecast", getForecast);
router.get("/location", getWeatherByLocation);
router.get("/location-forecast", getForecastByLocation);

module.exports = router;