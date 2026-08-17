const getIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Drizzle":
      return "🌦️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    default:
      return "🌤️";
  }
};

const HourlyForecast = ({ forecast }) => {
  if (!forecast?.list?.length) return null;

  const hours = forecast.list.slice(0, 8);

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Hourly Forecast
        </h2>

        <p className="text-sm text-slate-500">
          Weather for the next few hours
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {hours.map((item, index) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });

          return (
            <div
              key={item.dt}
              className={`min-w-[110px] rounded-2xl p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 ${
                index === 0
                  ? "bg-blue-600 text-white shadow-blue-200"
                  : "bg-white text-slate-800 dark:bg-slate-800 dark:text-white"
              }`}
            >
              <p className="text-sm opacity-70">
                {index === 0 ? "Now" : time}
              </p>

              <div className="my-3 text-3xl">
                {getIcon(item.weather[0].main)}
              </div>

              <p className="text-xl font-bold">
                {Math.round(item.main.temp)}°
              </p>

              <p className="mt-1 text-xs opacity-60">
                {item.weather[0].main}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;