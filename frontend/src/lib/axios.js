import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// Generate a unique tab ID
const getTabId = () => {
  if (!sessionStorage.getItem('tabId')) {
    sessionStorage.setItem('tabId', `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }
  return sessionStorage.getItem('tabId');
};

// Get tab-specific auth token
const getAuthToken = () => {
  const tabId = getTabId();
  return localStorage.getItem(`authToken_${tabId}`);
};

// Set tab-specific auth token
const setAuthToken = (token) => {
  const tabId = getTabId();
  if (token) {
    localStorage.setItem(`authToken_${tabId}`, token);
  } else {
    localStorage.removeItem(`authToken_${tabId}`);
  }
};

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // send cookies with the request
});

// Add auth token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Tab-ID'] = getTabId();
  return config;
});

// Handle auth token from responses
axiosInstance.interceptors.response.use(
  (response) => {
    // If login/signup response contains token, store it
    if (response.data?.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },
  (error) => {
    // Clear token on auth errors
    if (error.response?.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

// Clear auth data when tab is closed
window.addEventListener('beforeunload', () => {
  const tabId = getTabId();
  localStorage.removeItem(`authToken_${tabId}`);
  sessionStorage.removeItem('tabId');
});

// Export functions for manual token management
export const clearAuthToken = () => setAuthToken(null);
export const getCurrentTabId = () => getTabId();