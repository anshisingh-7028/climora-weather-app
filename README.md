# 🌦️ Climora – Weather Application

> A responsive full-stack weather application providing real-time weather information based on city search and user location.

## 🚀 Overview

Climora is a MERN-based weather application that allows users to search for weather information by city and retrieve weather data based on their current location.

The application provides a clean, responsive interface and communicates with a weather API through a Node.js and Express backend.

## ✨ Features

* 🌤️ Current weather information
* 🔍 Search weather by city
* 📍 Current-location weather
* 🌡️ Temperature information
* 💨 Wind information
* 💧 Humidity information
* ☁️ Weather conditions
* 📊 Weather details
* 📱 Responsive interface
* ⚡ API-based weather data

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* Vite
* React Router
* Axios
* Context API

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Authentication

* JWT

### External API

* OpenWeather API

### Deployment

* Vercel
* Render

## 🏗️ Architecture

```text
             User
               │
               ▼
       ┌───────────────┐
       │ React Frontend│
       │ Tailwind CSS  │
       └───────┬───────┘
               │
             Axios
               │
               ▼
       ┌───────────────┐
       │ Node + Express│
       │    Backend    │
       └───────┬───────┘
               │
               ▼
       ┌───────────────┐
       │ Weather API   │
       │ OpenWeather   │
       └───────────────┘
```

## 📂 Project Structure

```text
Climora/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### Clone

```bash
git clone YOUR_REPOSITORY_URL
cd Climora
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 🔐 Environment Variables

Example:

```env
OPENWEATHER_API_KEY=your_api_key
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

Never upload API keys or passwords to GitHub.

## 📸 Screenshots

Add screenshots of:

* 🏠 Home page
* 🔍 City search
* 🌤️ Weather results
* 📍 Current location
* 📱 Mobile responsive view

## 🧠 What I Learned

* React application development
* API integration
* Axios
* Context API
* Location-based functionality
* Node.js and Express
* MongoDB integration
* REST API development
* Responsive UI development
* Frontend/backend deployment

## 🔮 Future Improvements

* 📅 7-day weather forecast
* ⭐ Favorite cities
* 🌙 Dark/light mode
* 🌧️ Weather alerts
* 📊 Weather charts
* 🌍 Multiple weather data sources

## 👩‍💻 Author

**Anshika Singh**

Full Stack Developer | MERN Stack | Java Full Stack
