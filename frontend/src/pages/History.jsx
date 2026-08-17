import { useEffect, useState } from "react";

import {
  History as HistoryIcon,
  Search,
  Trash2,
  MapPin,
} from "lucide-react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(
        localStorage.getItem("weatherHistory")
      ) || [];

    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("weatherHistory");

    setHistory([]);
  };

  const removeHistoryItem = (city) => {
    const updatedHistory = history.filter(
      (item) =>
        item.city.toLowerCase() !==
        city.toLowerCase()
    );

    localStorage.setItem(
      "weatherHistory",
      JSON.stringify(updatedHistory)
    );

    setHistory(updatedHistory);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/50">
              <HistoryIcon />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Search History
              </h1>

              <p className="text-slate-500 dark:text-slate-400">
                Your recently searched cities
              </p>

            </div>

          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/70"
            >
              <Trash2 size={17} />

              Clear History
            </button>
          )}

        </div>

        {/* History List */}

        {history.length > 0 ? (

          <div className="space-y-3">

            {history.map((item, index) => (

              <div
                key={`${item.city}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
              >

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <MapPin size={20} />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-800 dark:text-white">
                      {item.city}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(
                        item.searchedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    removeHistoryItem(item.city)
                  }
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-900/50">

            <div className="mb-5 rounded-full bg-slate-100 p-6 text-slate-500 dark:bg-slate-800">
              <Search size={45} />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              No search history
            </h2>

            <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
              Search a city from the Home page and
              it will appear here.
            </p>

          </div>

        )}

      </div>

    </main>
  );
};

export default History;