import axios from "axios";
import { store } from "../../store";
import authService from "../auth/authService";
import { setCredintials } from "../../store/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * REQUEST INTERCEPTOR
 */

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

/*
 * REFRESH ACCESS TOKEN
 */

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = store.getState().auth.refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token not available");
  }

  const response = await authService.refreshToken(refreshToken);

  const newAccessToken = response.data.data.accessToken;
  const newRefreshToken =
    response.data.data.refreshToken || refreshToken;

  const currentAuth = store.getState().auth;

  if (!currentAuth.user) {
    throw new Error("Authenticated user not available");
  }

  store.dispatch(
    setCredintials({
      user: currentAuth.user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
  );

  return newAccessToken;
};

/*
 * RESPONSE INTERCEPTOR
 */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = refreshAccessToken()
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise!;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

/*
 * PUBLIC API
 */

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;