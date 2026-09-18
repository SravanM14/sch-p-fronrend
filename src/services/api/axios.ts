import axios from "axios";
import { store } from "../../store";
import authService from "../auth/authService";
import { setCredintials } from "../../store/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


/*
 * REQUEST INTERCEPTOR
 *
 * Automatically adds the access token
 * to protected API requests.
 */

api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/*
 * Separate Axios instance for refreshing
 * the access token.
 *
 * IMPORTANT:
 * We don't use "api" here because "api"
 * has the response interceptor.
 */

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


/*
 * RESPONSE INTERCEPTOR
 *
 * If an API returns 401:
 *
 * 1. Get refresh token from Redux
 * 2. Call refresh-token API
 * 3. Get new access token
 * 4. Update Redux
 * 5. Retry original request
 */

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {

    const originalRequest = error.config;

    /*
     * If the error is not 401,
     * return the original error.
     */

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }


    /*
     * Prevent infinite retry loop.
     */

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;


    /*
     * Get refresh token from Redux.
     */

    const refreshToken =
      store.getState().auth.refreshToken;


    /*
     * No refresh token means
     * we cannot refresh the session.
     */

    if (!refreshToken) {
      return Promise.reject(error);
    }


    try {

      /*
       * Call refresh-token API.
       */

      const response =
        await authService.refreshToken(refreshToken);


      /*
       * Get the new access token.
       *
       * IMPORTANT:
       * Confirm this property with your
       * backend refresh-token response.
       */

      const newAccessToken =
        response.data.data.accessToken;


      /*
       * Get current authentication state.
       */

      const currentAuth =
        store.getState().auth;


      /*
       * Make sure the current user
       * and refresh token still exist.
       */

      if (
        !currentAuth.user ||
        !currentAuth.refreshToken
      ) {
        return Promise.reject(error);
      }


      /*
       * Update Redux with the new
       * access token.
       */

      store.dispatch(
        setCredintials({
          user: currentAuth.user,
          accessToken: newAccessToken,
          refreshToken: currentAuth.refreshToken,
        })
      );


      /*
       * Update Authorization header
       * for the original request.
       */

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;


      /*
       * Retry the original request.
       */

      return api(originalRequest);

    } catch (refreshError) {

      /*
       * Refresh token is invalid or expired.
       *
       * Logout can be handled here later.
       */

      return Promise.reject(refreshError);
    }
  }
);


/*
 * PUBLIC API
 *
 * Used for:
 *
 * - Login
 * - Register
 * - Forgot Password
 * - Reset Password
 * - Refresh Token
 */

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;