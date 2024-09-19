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

export type EditUser = {
  id: string
  userName: string;
  email: string;
}

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export type NewTask = {
  userId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
}

export type UpdateTask = {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: number;
}