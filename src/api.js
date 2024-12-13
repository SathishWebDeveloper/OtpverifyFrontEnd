// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const api = axios.create({
//   baseURL: 'http://localhost:4000', // Backend URL
//   withCredentials: true,           // Include cookies
// });

// let isRefreshing = false;
// let refreshSubscribers = [];

// // Add subscribers to refresh token process
// const subscribeToRefresh = (callback) => {
//   refreshSubscribers.push(callback);
// };

// const onTokenRefreshed = (newToken) => {
//   refreshSubscribers.forEach((callback) => callback(newToken));
//   refreshSubscribers = [];
// };

// api.interceptors.request.use(
//   (config) => {
//     console.log('Making API request:', config); // Log request details
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error); // Log request errors
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for debugging
// api.interceptors.response.use(
//   (response) => {
//     console.log('API response received:', response); // Log response details
//     return response;
//   },
//   (error) => {
//     console.error('Response error:', error); // Log response errors
//     return Promise.reject(error);
//   }
// );

// // Check if token is expired
// const isTokenExpired = (token) => {
//   if (!token) return true;
//   const { exp } = jwtDecode(token);
//   return Date.now() >= exp * 1000; // Convert expiration time to milliseconds
// };

// // Ensure access token is valid or refreshed
// const ensureAccessToken = async () => {
//   const accessToken = localStorage.getItem('accessToken');

//   // If the token is valid, return it
//   if (accessToken && !isTokenExpired(accessToken)) {
//     return accessToken;
//   }

//   // Refresh the token if needed
//   if (!isRefreshing) {
//     isRefreshing = true;
//     try {
//       const { data } = await axios.post('http://localhost:4000/refresh', {}, { withCredentials: true });
//       localStorage.setItem('accessToken', data.accessToken); // Save the new access token
//       onTokenRefreshed(data.accessToken);                   // Notify subscribers
//       return data.accessToken;
//     } catch (err) {
//       console.error('Token refresh failed:', err);
//       localStorage.removeItem('accessToken');
//       window.location.href = '/login'; // Redirect to login on failure
//     } finally {
//       isRefreshing = false; 
//     }
//   }

//   // Wait for token to be refreshed
//   return new Promise((resolve) => subscribeToRefresh(resolve));
// };

// // Axios request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     const token = await ensureAccessToken();
//     config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Base URL for all requests
  withCredentials: true, // Include cookies in requests
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token
        const { data } = await axios.post(
          '/refresh',
          {}, // No body required for refresh
          { withCredentials: true, baseURL: 'http://localhost:4000' }
        );

        const newAccessToken = data.accessToken;

        // Update local storage and headers
        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);

        // Clear invalid token and redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Export the Axios instance
export const apiRequest = async (url, method, data = null, params = null) => {

  console.log("123", url,method,data,params);
  try {
    const response = await api({
      url,
      method,
      data,
      params,
    });
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default api;
