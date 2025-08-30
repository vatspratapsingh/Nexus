import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// Generate a unique tab ID that persists for the tab session
const getTabId = () => {
  // Check if we already have a tab ID for this session
  let tabId = sessionStorage.getItem('currentTabId');
  
  if (!tabId) {
    // Generate a new unique tab ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    tabId = `tab_${timestamp}_${random}`;
    
    // Store it for this tab session
    sessionStorage.setItem('currentTabId', tabId);

  }
  
  return tabId;
};

// Get tab-specific auth token
const getAuthToken = () => {
  const tabId = getTabId();
  const token = localStorage.getItem(`authToken_${tabId}`);

  return token;
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
    // Only clear token on specific auth errors, not all 401s
    if (error.response?.status === 401 && 
        (error.response?.data?.message?.includes('Invalid Token') || 
         error.response?.data?.message?.includes('User not found'))) {

      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

// Clear auth data when tab is closed
window.addEventListener('beforeunload', () => {
  const tabId = getTabId();
  localStorage.removeItem(`authToken_${tabId}`);
  sessionStorage.removeItem('currentTabId');
});

// Export functions for manual token management
export const clearAuthToken = () => setAuthToken(null);
export const getCurrentTabId = () => getTabId();