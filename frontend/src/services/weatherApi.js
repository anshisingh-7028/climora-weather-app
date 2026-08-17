import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getWeather = async (city) => {
  const response = await API.get(
    `/weather/current?city=${encodeURIComponent(city)}`
  );

  return response.data;
};

export const getForecast = async (city) => {
  const response = await API.get(
    `/weather/forecast?city=${encodeURIComponent(city)}`
  );

  return response.data;
};

export const getWeatherByLocation = async (lat, lon) => {
  const response = await API.get(
    `/weather/location?lat=${lat}&lon=${lon}`
  );

  return response.data;
};

export const getForecastByLocation = async (lat, lon) => {
  const response = await API.get(
    `/weather/location-forecast?lat=${lat}&lon=${lon}`
  );

  return response.data;
};