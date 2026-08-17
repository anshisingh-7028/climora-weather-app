import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CloudSun,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(
        formData.email,
        formData.password
      );

      if (data?.success) {
        navigate("/");
      } else {
        setError(
          data?.message ||
            "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">

     

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 md:grid-cols-2">


          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white md:flex md:flex-col md:justify-between">

           

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10" />

            <div className="relative z-10">

              

              <div className="mb-10 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <CloudSun size={28} />
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    WeatherApp
                  </h1>

                  <p className="text-sm text-blue-100">
                    Weather at your fingertips
                  </p>
                </div>

              </div>

              <h2 className="max-w-md text-4xl font-extrabold leading-tight">
                Know the weather.
                <span className="block text-blue-200">
                  Plan your day.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-blue-100">
                Get real-time weather updates,
                hourly forecasts and detailed
                weather information for your
                favorite cities.
              </p>

            </div>

            {/* Weather icon */}

            <div className="relative z-10 flex justify-center py-8">

              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-md">

                <CloudSun
                  size={110}
                  strokeWidth={1.2}
                />

              </div>

            </div>

            <p className="relative z-10 text-sm text-blue-200">
              ☀️ Accurate • Fast • Beautiful
            </p>

          </div>

          

          <div className="p-6 sm:p-10 md:p-12">

            

            <div className="mb-8 flex items-center justify-center gap-3 md:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                <CloudSun size={25} />
              </div>

              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                ClimoraX
              </h1>

            </div>

            {/* Heading */}

            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                WELCOME BACK 👋
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Continue checking the weather
                around the world.
              </p>

            </div>

           

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {error}
                </span>

              </div>
            )}

            

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  />

                </div>

              </div>

              

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              

              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                Remember me

              </label>

             
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            

            <div className="my-7 flex items-center gap-3">

              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

              <span className="text-xs text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;