const axios = require("axios");

const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;

    console.log("City received:", city);

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    console.log(
      "API Key exists:",
      !!process.env.OPENWEATHER_API_KEY
    );

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    console.log("Weather API success:", response.data.name);

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {

    console.log(
      "Weather API Error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Weather API error",
    });
  }
};


const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    console.log("Forecast city:", city);

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {

    console.log(
      "Forecast API Error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Forecast API error",
    });
  }
};

const getWeatherByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error(
      "Location weather error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to get location weather",
    });
  }
};

const getForecastByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Location forecast error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Unable to get location forecast",
    });
  }
};


module.exports = {
  getCurrentWeather,
  getForecast,
  getWeatherByLocation,
  getForecastByLocation,
};