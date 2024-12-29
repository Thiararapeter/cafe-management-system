export type UserRole = "cashier" | "admin" | "owner" | "waiter";

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}