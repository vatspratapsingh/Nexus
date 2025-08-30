import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
}

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getAuthUser = async() => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser: ", error)
    
    // Only return null for actual auth errors, not network issues
    if (error.response?.status === 401) {
      return null; // User is not authenticated
    }
    
    // For other errors (network, server issues), throw the error
    // This will trigger the retry logic in useQuery
    throw error;
  }
}

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
}

export async function getUserfriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests(){
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId){
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

export async function getRecentConversations() {
  const response = await axiosInstance.get("/users/recent-conversations");
  return response.data;
}