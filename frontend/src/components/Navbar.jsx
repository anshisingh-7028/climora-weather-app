import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  CloudSun,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  

  const handleLogout = () => {
    logout();
    setMobileMenu(false);
    navigate("/login");
  };

  

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Top of page
      if (currentScrollY <= 20) {
        setShowNavbar(true);
      }
      // Scrolling down
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMobileMenu(false);
      }
      // Scrolling up
      else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/50 dark:bg-slate-950/80 ${
        showNavbar
          ? "translate-y-0"
          : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* ======================================
            LOGO
        ======================================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 text-white shadow-lg">
            <CloudSun size={25} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
             ClimoraX
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Your personal weather assistant
            </p>
          </div>
        </Link>

        

        <nav className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
          >
            Favorites
          </Link>

          <Link
            to="/history"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
          >
            History
          </Link>

        </nav>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800 sm:flex">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>

              <span className="max-w-[120px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {user.name}
              </span>

            </div>
          )}

          {/* ==================================
              LOGOUT BUTTON
          =================================== */}

          {user && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="hidden items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-red-500 transition hover:bg-red-100 hover:text-red-600 dark:bg-red-950/30 dark:hover:bg-red-950/50 sm:flex"
            >
              <LogOut size={18} />

              <span className="text-sm font-semibold">
                Logout
              </span>
            </button>
          )}

          {/* ==================================
              DARK MODE
          =================================== */}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            aria-label="Toggle dark mode"
            className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* ==================================
              MOBILE MENU
          =================================== */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="rounded-xl bg-slate-100 p-2.5 text-slate-700 md:hidden dark:bg-slate-800 dark:text-white"
          >
            {mobileMenu ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>
      </div>


      {mobileMenu && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden dark:border-slate-800 dark:bg-slate-950">

          <nav className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={() =>
                setMobileMenu(false)
              }
              className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 dark:bg-blue-950/40"
            >
              Home
            </Link>

            <Link
              to="/favorites"
              onClick={() =>
                setMobileMenu(false)
              }
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Favorites
            </Link>

            <Link
              to="/history"
              onClick={() =>
                setMobileMenu(false)
              }
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              History
            </Link>

            {/* Mobile User */}

            {user && (
              <div className="my-2 flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={17} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {user.name}
                  </p>

                  <p className="max-w-[200px] truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>

              </div>
            )}

            

            {user && (
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut size={18} />

                Logout
              </button>
            )}

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;