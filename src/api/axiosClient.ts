import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_K_PORTAL_BACKEND,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 例: レスポンスエラーハンドリング
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーロギング、401/403時のリダイレクト処理など
    return Promise.reject(error);
  }
);
