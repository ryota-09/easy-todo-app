import { API_KEY, API_URL } from "../config";
import type { LoginUser, RegisterUser } from "../types";

export const registerUser = async (data: RegisterUser) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const loginUser = async (data: LoginUser) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}