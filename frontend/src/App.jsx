import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";


// ==========================================
// WEATHER LAYOUT
// ==========================================

function WeatherLayout({
  darkMode,
  setDarkMode,
}) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="pt-24">
        <Outlet />
      </main>
    </>
  );
}


// ==========================================
// APP
// ==========================================

function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  return (
    <div
      className={
        darkMode
          ? "dark"
          : ""
      }
    >
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

        <BrowserRouter>

          <Routes>

            {/* ==============================
                PUBLIC
            =============================== */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />


            {/* ==============================
                PROTECTED
            =============================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                element={
                  <WeatherLayout
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                }
              >

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/favorites"
                  element={<Favorites />}
                />

                <Route
                  path="/history"
                  element={<History />}
                />

              </Route>

            </Route>

          </Routes>

        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;