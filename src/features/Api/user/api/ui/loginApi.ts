import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api";
import { IAuthResponse } from "./types";
import { AxiosError } from "axios";

interface LoginCredentials {
  username: string;
  password: string;
}

const login = async (credentials: LoginCredentials): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>(
    "/login/access-token",
    credentials,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (response.status >= 400) {
    throw new Error("Ошибка авторизации");
  }
  localStorage.setItem("token", response.data.access_token); // Сохраняем токен
  console.log(response.data.access_token);
  return response.data;
};

// Хук для выполнения мутации входа
export const useLogin = () => {
  return useMutation<IAuthResponse, AxiosError, LoginCredentials>({
    mutationFn: login, // Передаем функцию логина
    onSuccess: (data) => {
      console.log("Успешный вход в систему", data);
      // Вы можете вызвать обновление данных пользователя здесь
      // Например, можно обновить данные пользователя или другие запросы
    },
    onError: (error) => {
      console.error("Ошибка при входе в систему:", error.message);
    },
  });
};
