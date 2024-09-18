import { API_KEY, API_URL } from "../config";
import type { RegisterUser } from "../types";

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