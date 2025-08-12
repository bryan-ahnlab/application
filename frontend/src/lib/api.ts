import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Try multiple sources for token
    let token = null;

    // 1. Try Zustand store
    try {
      const authState = useAuthStore.getState();
      token = authState.token;
      console.log(
        "Token from Zustand store:",
        token ? token.substring(0, 20) + "..." : "none"
      );
    } catch (error) {
      console.log("Error getting token from Zustand:", error);
    }

    // 2. If no token from Zustand, try localStorage
    if (!token) {
      const storedAuth = localStorage.getItem("auth-storage");
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          token = parsed.state?.token;
          console.log(
            "Token from localStorage:",
            token ? token.substring(0, 20) + "..." : "none"
          );
        } catch (error) {
          console.log("Error parsing localStorage auth:", error);
        }
      }
    }

    // 3. Fallback to direct localStorage access
    if (!token) {
      token = localStorage.getItem("access_token");
      console.log(
        "Token from direct localStorage:",
        token ? token.substring(0, 20) + "..." : "none"
      );
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "✅ Adding token to request:",
        token.substring(0, 20) + "..."
      );
    } else {
      console.log("❌ No token found in any source");
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (username: string, password: string) =>
    api.post("/token", new URLSearchParams({ username, password }), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  register: (userData: { email: string; username: string; password: string }) =>
    api.post("/users/", userData),
  getMe: () => api.get("/users/me/"),
};

export const postsAPI = {
  getAll: (skip = 0, limit = 100) =>
    api.get(`/posts/?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/posts/${id}`),
  create: (postData: {
    title: string;
    content: string;
    is_published: boolean;
  }) => api.post("/posts/", postData),
  update: (
    id: number,
    postData: { title: string; content: string; is_published: boolean }
  ) => api.put(`/posts/${id}`, postData),
  delete: (id: number) => api.delete(`/posts/${id}`),
  getByUser: (userId: number, skip = 0, limit = 100) =>
    api.get(`/users/${userId}/posts/?skip=${skip}&limit=${limit}`),
};

export const usersAPI = {
  getAll: (skip = 0, limit = 100) =>
    api.get(`/users/?skip=${skip}&limit=${limit}`),
  getById: (id: number) => api.get(`/users/${id}`),
};
