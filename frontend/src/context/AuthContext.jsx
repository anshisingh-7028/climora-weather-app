import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authApi";

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedToken =
        localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const data =
          await getCurrentUser(
            savedToken
          );

        if (data.success) {
          setUser(data.user);
          setToken(savedToken);
        }
      } catch (error) {
        console.error(
          "Session expired:",
          error
        );

        localStorage.removeItem(
          "token"
        );

        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ========================================
  // REGISTER
  // ========================================
const register = async (
  name,
  email,
  password
) => {
  const data =
    await registerUser({
      name,
      email,
      password,
    });

  return data;
};

  const login = async (
    email,
    password
  ) => {
    const data =
      await loginUser({
        email,
        password,
      });

    if (data.success) {
      localStorage.setItem(
        "token",
        data.token
      );

      setToken(data.token);
      setUser(data.user);
    }

    return data;
  };

  
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setToken(null);
    setUser(null);
  };

  
  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};