import { useAuthStore } from "@/features/auth/store";
import Constants from "@/shared/constants/Constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: Constants.BASE_URI,
});

// Attach the access token to every outgoing request
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Queue requests that arrive while a refresh is already in flight
let isRefreshing = false;
let pendingQueue = [];

function flushQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint =
      originalRequest?.url?.includes(Constants.ENDPOINT.LOGIN) ||
      originalRequest?.url?.includes(Constants.ENDPOINT.REFRESH);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
        await logout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          Constants.BASE_URI + Constants.ENDPOINT.REFRESH,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } },
        );

        const { access, refresh } = res.data.data;
        await setTokens({ accessToken: access, refreshToken: refresh });

        flushQueue(null, access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        flushQueue(refreshError, null);
        await logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
