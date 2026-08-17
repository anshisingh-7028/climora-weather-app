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

const ForecastCard = ({ forecast }) => {
  if (!forecast?.list?.length) return null;

  const days = {};

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-CA");

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(item);
  });

  const dailyData = Object.entries(days).slice(0, 5);

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          5-Day Forecast
        </h2>

        <p className="text-sm text-slate-500">
          Daily weather forecast
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {dailyData.map(([date, items]) => {
          const temperatures = items.map((item) => item.main.temp);

          const maxTemp = Math.max(...temperatures);
          const minTemp = Math.min(...temperatures);

          const middleItem = items[Math.floor(items.length / 2)];

          const formattedDate = new Date(
            `${date}T12:00:00`
          ).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={date}
              className="rounded-2xl bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
            >
              <p className="font-semibold text-slate-700 dark:text-white">
                {formattedDate}
              </p>

              <div className="my-5 text-5xl">
                {getIcon(middleItem.weather[0].main)}
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {middleItem.weather[0].description}
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <span className="font-bold text-slate-800 dark:text-white">
                  {Math.round(maxTemp)}°
                </span>

                <span className="text-slate-400">
                  {Math.round(minTemp)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ForecastCard;