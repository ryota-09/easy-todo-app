export type User = {
  id: string;
  userName: string;
  email: string;
}

export type RegisterUser = {
  userName: string;
  email: string;
  password: string;
}

export type LoginUser = {
  email: string;
  password: string;
}