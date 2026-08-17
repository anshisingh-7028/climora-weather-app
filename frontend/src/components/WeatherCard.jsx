import {
  Droplets,
  Wind,
  Eye,
  Gauge,
  MapPin,
  Heart,
} from "lucide-react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    main,
    weather: weatherInfo,
    wind,
    visibility,
    sys,
  } = weather;

  const condition = weatherInfo?.[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-2xl">

      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/10" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span className="font-medium">
              {name}, {sys?.country}
            </span>
          </div>

          <button className="rounded-full bg-white/15 p-2 transition hover:bg-white/25">
            <Heart size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between">

          <div>
            <p className="text-7xl font-bold tracking-tight">
              {Math.round(main.temp)}°
            </p>

            <p className="mt-2 text-xl capitalize">
              {condition?.description}
            </p>

            <p className="mt-1 text-white/70">
              Feels like {Math.round(main.feels_like)}°
            </p>
          </div>

          <div className="text-8xl">
            {condition?.main === "Clear"
              ? "☀️"
              : condition?.main === "Clouds"
              ? "☁️"
              : condition?.main === "Rain"
              ? "🌧️"
              : condition?.main === "Snow"
              ? "❄️"
              : "🌤️"}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <WeatherInfo
            icon={<Droplets />}
            title="Humidity"
            value={`${main.humidity}%`}
          />

          <WeatherInfo
            icon={<Wind />}
            title="Wind"
            value={`${wind.speed} m/s`}
          />

          <WeatherInfo
            icon={<Eye />}
            title="Visibility"
            value={`${(visibility / 1000).toFixed(1)} km`}
          />

          <WeatherInfo
            icon={<Gauge />}
            title="Pressure"
            value={`${main.pressure} hPa`}
          />

        </div>
      </div>
    </div>
  );
};

const WeatherInfo = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
      <div className="mb-2 text-white/70">
        {icon}
      </div>

      <p className="text-xs text-white/60">
        {title}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
};

export default WeatherCard;