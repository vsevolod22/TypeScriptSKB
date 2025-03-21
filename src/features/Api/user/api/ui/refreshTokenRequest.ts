import { api } from "../../../api";
import { IAuthResponse } from "./types";

export const refreshTokenRequest = async (): Promise<string | null> => {
  try {
    const response = await api.get<IAuthResponse>("/auth/refresh");
    if (response.status >= 400) {
      throw new Error("Ошибка обновления токена");
    }
    const newToken = response.data.access_token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    localStorage.removeItem("token"); // Очищаем токен при ошибке
    return null;
  }
};
