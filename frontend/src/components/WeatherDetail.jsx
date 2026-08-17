import {
  Sunrise,
  Sunset,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";

const WeatherDetail = ({ weather }) => {
  if (!weather) return null;

  const { main, wind, sys } = weather;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

      <DetailCard
        icon={<Thermometer />}
        title="Feels Like"
        value={`${Math.round(main.feels_like)}°C`}
      />

      <DetailCard
        icon={<Droplets />}
        title="Humidity"
        value={`${main.humidity}%`}
      />

      <DetailCard
        icon={<Wind />}
        title="Wind"
        value={`${wind.speed} m/s`}
      />

      <DetailCard
        icon={<Sunrise />}
        title="Sunrise"
        value={formatTime(sys.sunrise)}
      />

      <DetailCard
        icon={<Sunset />}
        title="Sunset"
        value={formatTime(sys.sunset)}
      />

      <DetailCard
        icon={<Thermometer />}
        title="Min Temp"
        value={`${Math.round(main.temp_min)}°C`}
      />

      <DetailCard
        icon={<Thermometer />}
        title="Max Temp"
        value={`${Math.round(main.temp_max)}°C`}
      />

      <DetailCard
        icon={<Wind />}
        title="Pressure"
        value={`${main.pressure} hPa`}
      />

    </div>
  );
};

const DetailCard = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">

      <div className="mb-3 text-blue-500">
        {icon}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
        {value}
      </p>

    </div>
  );
};

export default WeatherDetail;