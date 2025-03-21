import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api";
import { IAuthResponse } from "./types";
import { AxiosError } from "axios";

interface RegisterCredentials {
  email: string;
  password: string;
}

const register = async (
  credentials: RegisterCredentials
): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>("/users/signup", {
    ...credentials,
    role: "User", // Устанавливаем роль
  });
  if (response.status >= 400) {
    throw new Error("Ошибка регистрации");
  }
  localStorage.setItem("token", response.data.access_token); // Сохраняем токен
  return response.data;
};

// Хук для выполнения мутации регистрации
export const useRegister = () => {
  return useMutation<IAuthResponse, AxiosError, RegisterCredentials>({
    mutationFn: register, // Передаем функцию регистрации
    onSuccess: (data) => {
      console.log("Успешная регистрация", data);
      // Вы можете вызвать обновление данных пользователя или другие действия
    },
    onError: (error) => {
      console.error("Ошибка при регистрации:", error.message);
    },
  });
};
