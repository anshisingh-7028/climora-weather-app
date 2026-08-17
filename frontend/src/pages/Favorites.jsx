import { useEffect, useState } from "react";
import {
  Heart,
  Trash2,
  MapPin,
  CloudSun,
} from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem("weatherFavorites")
      ) || [];

    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(
      (item) =>
        item.city.toLowerCase() !==
        city.toLowerCase()
    );

    localStorage.setItem(
      "weatherFavorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  };

  const clearFavorites = () => {
    localStorage.removeItem("weatherFavorites");
    setFavorites([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">

      <div className="mx-auto max-w-6xl">

        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-100 p-3 text-red-500 dark:bg-red-950/40">
              <Heart
                size={25}
                fill="currentColor"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Favorite Cities
              </h1>

              <p className="text-slate-500 dark:text-slate-400">
                Your saved favorite cities
              </p>
            </div>

          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40"
            >
              <Trash2 size={17} />
              Clear All
            </button>
          )}

        </div>

        {favorites.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {favorites.map((item) => (

              <div
                key={item.city}
                className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/80"
              >
                <div className="mb-5 flex items-start justify-between">

                  <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <CloudSun size={25} />
                  </div>

                  <button
                    onClick={() =>
                      removeFavorite(item.city)
                    }
                    className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>


               
                <div className="mb-5">

                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {item.city}
                  </h2>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={14} />
                    Favorite City
                  </p>

                </div>


                
                <Link
                  to={`/?city=${encodeURIComponent(
                    item.city
                  )}`}
                  className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:scale-[1.02]"
                >
                  View Weather
                </Link>

              </div>

            ))}

          </div>

        ) : (

          
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-900/50">

            <div className="mb-6 rounded-full bg-red-100 p-6 text-red-500 dark:bg-red-950/40">

              <Heart
                size={45}
                fill="currentColor"
              />

            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              No Favorite Cities
            </h2>

            <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
              Search for a city and click
              "Add to Favorites" to save it here.
            </p>

            <Link
              to="/"
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Search a City
            </Link>

          </div>

        )}

      </div>

    </main>
  );
};

export default Favorites;