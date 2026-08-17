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



export const registerUser = async (userData) => {
  const response = await authApi.post(
    "/register",
    userData
  );

  return response.data;
};



export const loginUser = async (userData) => {
  const response = await authApi.post(
    "/login",
    userData
  );

  return response.data;
};



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