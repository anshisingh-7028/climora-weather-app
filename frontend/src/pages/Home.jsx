import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { useSearchParams } from "react-router-dom";

import {
  Search,
  MapPin,
  AlertCircle,
  Loader2,
  Heart,
} from "lucide-react";

import WeatherCard from "../components/WeatherCard";
import WeatherDetail from "../components/WeatherDetail";
import HourlyForecast from "../components/HourlyForecast";
import ForecastCard from "../components/ForecastCard";

import {
  getWeather,
  getForecast,
  getWeatherByLocation,
  getForecastByLocation,
} from "../services/weatherApi";

const Home = () => {
  

  const [searchParams] = useSearchParams();

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);


  const saveToHistory = useCallback((cityName) => {
    if (!cityName) return;

    try {
      const oldHistory =
        JSON.parse(
          localStorage.getItem("weatherHistory")
        ) || [];

      const filteredHistory = oldHistory.filter(
        (item) =>
          item.city?.toLowerCase() !==
          cityName.toLowerCase()
      );

      const newEntry = {
        city: cityName,
        searchedAt: new Date().toISOString(),
      };

      const updatedHistory = [
        newEntry,
        ...filteredHistory,
      ].slice(0, 10);

      localStorage.setItem(
        "weatherHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(
        "History save error:",
        error
      );
    }
  }, []);

  
  const checkFavorite = useCallback((cityName) => {
    if (!cityName) return false;

    try {
      const favorites =
        JSON.parse(
          localStorage.getItem(
            "weatherFavorites"
          )
        ) || [];

      return favorites.some(
        (item) =>
          item.city?.toLowerCase() ===
          cityName.toLowerCase()
      );
    } catch (error) {
      console.error(
        "Favorite check error:",
        error
      );

      return false;
    }
  }, []);

 

  const toggleFavorite = () => {
    if (!weather?.name) return;

    const cityName = weather.name;

    try {
      const favorites =
        JSON.parse(
          localStorage.getItem(
            "weatherFavorites"
          )
        ) || [];

      const alreadyFavorite = favorites.some(
        (item) =>
          item.city?.toLowerCase() ===
          cityName.toLowerCase()
      );

      let updatedFavorites = [];

      if (alreadyFavorite) {
        // REMOVE FAVORITE

        updatedFavorites = favorites.filter(
          (item) =>
            item.city?.toLowerCase() !==
            cityName.toLowerCase()
        );

        setIsFavorite(false);
      } else {
        // ADD FAVORITE

        updatedFavorites = [
          ...favorites,
          {
            city: cityName,
            addedAt:
              new Date().toISOString(),
          },
        ];

        setIsFavorite(true);
      }

      localStorage.setItem(
        "weatherFavorites",
        JSON.stringify(
          updatedFavorites
        )
      );
    } catch (error) {
      console.error(
        "Favorite update error:",
        error
      );
    }
  };

  

  const fetchWeatherByCity = useCallback(
    async (cityName) => {
      if (!cityName?.trim()) {
        setError(
          "Please enter a city name."
        );

        return;
      }

      try {
        setLoading(true);
        setError("");

        const cleanCity =
          cityName.trim();

        console.log(
          "Searching weather for:",
          cleanCity
        );

        

        const weatherResult =
          await getWeather(cleanCity);

        

        const forecastResult =
          await getForecast(cleanCity);

      

        setWeather(
          weatherResult.data
        );

       

        setForecast(
          forecastResult.data
        );

        

        const actualCity =
          weatherResult.data?.name ||
          cleanCity;

        setCity(actualCity);

       

        setIsFavorite(
          checkFavorite(actualCity)
        );

        

        saveToHistory(actualCity);

        console.log(
          "Weather loaded:",
          actualCity
        );
      } catch (error) {
        console.error(
          "Fetch weather error:",
          error
        );

        setWeather(null);

        setForecast(null);

        setIsFavorite(false);

        if (
          error?.response?.status === 404
        ) {
          setError(
            "City not found. Please enter a valid city name."
          );
        } else {
          setError(
            error?.response?.data?.message ||
              "Unable to fetch weather. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [
      checkFavorite,
      saveToHistory,
    ]
  );

  
  

  const searchWeather = async (e) => {
    e.preventDefault();

    await fetchWeatherByCity(city);
  };

  

  useEffect(() => {
    const favoriteCity =
      searchParams.get("city");

    if (favoriteCity) {
      setCity(favoriteCity);

      fetchWeatherByCity(
        favoriteCity
      );
    }
  }, [
    searchParams,
    fetchWeatherByCity,
  ]);

 

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLoading(true);

    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          const accuracy =
            position.coords.accuracy;

          console.log(
            "================================"
          );

          console.log(
            "ACTUAL BROWSER LOCATION:"
          );

          console.log(
            "Latitude:",
            latitude
          );

          console.log(
            "Longitude:",
            longitude
          );

          console.log(
            "Accuracy:",
            accuracy,
            "meters"
          );

          console.log(
            "================================"
          );

          

          const weatherResult =
            await getWeatherByLocation(
              latitude,
              longitude
            );

          setWeather(
            weatherResult.data
          );

         

          const forecastResult =
            await getForecastByLocation(
              latitude,
              longitude
            );

          setForecast(
            forecastResult.data
          );



          const locationName =
            weatherResult.data?.name ||
            "Current Location";

          setCity(locationName);

         

          setIsFavorite(
            checkFavorite(locationName)
          );

         

          saveToHistory(locationName);

          console.log(
            "Current weather city:",
            locationName
          );
        } catch (error) {
          console.error(
            "Current location weather error:",
            error
          );

          setError(
            "Unable to get weather for your current location."
          );
        } finally {
          setLoading(false);
        }
      },

      
      (error) => {
        console.error(
          "Browser geolocation error:",
          error
        );

        setLoading(false);

        if (error.code === 1) {
          setError(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setError(
            "Location information is unavailable."
          );
        } else if (error.code === 3) {
          setError(
            "Location request timed out. Please try again."
          );
        } else {
          setError(
            "Unable to detect your current location."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  

  const getBackground = () => {
    if (!weather) {
      return "from-slate-100 via-blue-50 to-indigo-100";
    }

    const condition =
      weather.weather?.[0]?.main;

    switch (condition) {
      case "Clear":
        return "from-orange-100 via-sky-100 to-blue-200";

      case "Clouds":
        return "from-slate-200 via-blue-100 to-slate-300";

      case "Rain":
        return "from-blue-200 via-slate-200 to-blue-300";

      case "Thunderstorm":
        return "from-purple-200 via-slate-200 to-indigo-300";

      case "Snow":
        return "from-blue-100 via-white to-slate-200";

      default:
        return "from-slate-100 via-blue-50 to-indigo-100";
    }
  };

  

  return (
    <div
      className={`
        min-h-screen
        bg-gradient-to-br
        transition-all
        duration-700
        ${getBackground()}
      `}
    >
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">

        
        <section className="mb-10 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-blue-600 shadow-sm backdrop-blur dark:bg-slate-800/70">
            🌤️ Real-time weather information
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">

            Weather at your

            <span className="block bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent ">
              fingertips
            </span>

          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-500 md:text-lg dark:text-slate-400">
            Search any city and get current weather,
            hourly updates and a 5-day forecast.
          </p>

        </section>
        
        <form
          onSubmit={searchWeather}
          className="mx-auto mb-4 flex max-w-2xl items-center rounded-2xl border border-white/50 bg-white/80 p-2 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
        >

          <Search
            size={22}
            className="ml-3 shrink-0 text-slate-400"
          />

          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            placeholder="Search city e.g. Mumbai..."
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                <span className="hidden sm:inline">
                  Searching
                </span>
              </>
            ) : (
              <>
                <Search size={18} />

                <span>
                  Search
                </span>
              </>
            )}

          </button>

        </form>


        {/* =====================================
            ERROR
        ====================================== */}

        {error && (
          <div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600 dark:bg-red-950/40">

            <AlertCircle size={20} />

            <span>
              {error}
            </span>

          </div>
        )}


        {/* =====================================
            CURRENT LOCATION
        ====================================== */}

        <div className="mb-8 text-center">

          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-sm font-medium text-blue-600 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800/80 dark:text-blue-400"
          >

            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Detecting location...
              </>
            ) : (
              <>
                <MapPin size={17} />

                Use My Location
              </>
            )}

          </button>

        </div>


       
        {weather ? (
          <>

           

            <div className="mb-6 flex justify-end">

              <button
                type="button"
                onClick={toggleFavorite}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2.5
                  font-semibold
                  shadow-md
                  transition
                  hover:-translate-y-0.5
                  ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white text-slate-700 hover:bg-red-50 hover:text-red-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  }
                `}
              >

                <Heart
                  size={19}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />

                {isFavorite
                  ? "Remove Favorite"
                  : "Add to Favorites"}

              </button>

            </div>


           

            <WeatherCard
              weather={weather}
            />


           

            <WeatherDetail
              weather={weather}
            />


            
            <HourlyForecast
              forecast={forecast}
            />


            

            <ForecastCard
              forecast={forecast}
            />

          </>
        ) : (

          

          <section className="py-16 text-center">

            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/70 text-6xl shadow-xl backdrop-blur dark:bg-slate-800/70">
              🌤️
            </div>

            <h2 className="text-2xl font-bold text-slate-700 dark:text-white">
              Search for a city
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Try Mumbai, Delhi, London or New York
            </p>

          </section>

        )}

      </main>
    </div>
  );
};

export default Home;