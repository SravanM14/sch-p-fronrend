import axios from 'axios';
import { store } from '../../store';
import { Tuple } from '@reduxjs/toolkit';
import authService from '../auth/authService';
import { setCredintials } from '../../store/auth/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken} `;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

/*
 * Separate Axios instance for refreshing the token.
 *
 * IMPORTANT:
 * We don't use `api` here because `api`
 * already has the 401 interceptor.
 */

const refreshApi = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})
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

refreshApi.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    const orginalRequest = error.config;

    if (error.response.status !== 401) {
      return Promise.reject(error)
    }

    if (orginalRequest._retry) {
      return Promise.reject(error)
    }

    orginalRequest._retry = true;

    //No refresh token - logout
    const refreshToken = store.getState().auth.refreshToken;

    if (!refreshToken) {
      // store.dispatch(logout());
      return Promise.reject(error);
    }

    try {
      const response = await authService.refreshToken(refreshToken);

      const newAccessToken = response.data.data.refreshToken;
      /*
* Update Redux with the new access token
*/

      const currentAuth = store.getState().auth;

      if (!currentAuth.user || !currentAuth.refreshToken) {
        // store.dispatch(logout());
        return Promise.reject(error);
      }

      store.dispatch(
        setCredintials({
          user: currentAuth.user,
          accessToken: newAccessToken,
          refreshToken: currentAuth.refreshToken,
        })
      )

      orginalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(orginalRequest)
    } catch (refreshError) {
      /*
       * Refresh token is invalid/expired
       */
      //store.dispatch(logout());

      return Promise.reject(refreshError);
    }
  }


)

// Public API requests
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;