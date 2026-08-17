import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const authApi = axios.create({
  baseURL: `${API_URL}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// REGISTER
// ==========================================

export const registerUser = async (userData) => {
  const response = await authApi.post(
    "/register",
    userData
  );

  return response.data;
};

// ==========================================
// LOGIN
// ==========================================

export const loginUser = async (userData) => {
  const response = await authApi.post(
    "/login",
    userData
  );

  return response.data;
};

// ==========================================
// GET CURRENT USER
// ==========================================

export const getCurrentUser = async (token) => {
  const response = await authApi.get(
    "/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};