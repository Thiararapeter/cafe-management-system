export type UserRole = "cashier" | "admin" | "owner";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}