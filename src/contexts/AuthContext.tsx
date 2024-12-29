import { createContext, useContext, useState, ReactNode } from "react";
import { User, AuthContextType, UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = [
  {
    id: "1",
    username: "cashier",
    password: "cashier123",
    role: "cashier" as UserRole,
    name: "John Cashier",
  },
  {
    id: "2",
    username: "admin",
    password: "admin123",
    role: "admin" as UserRole,
    name: "Jane Admin",
  },
  {
    id: "3",
    username: "owner",
    password: "owner123",
    role: "owner" as UserRole,
    name: "Mike Owner",
  },
  {
    id: "4",
    username: "waiter",
    password: "waiter123",
    role: "waiter" as UserRole,
    name: "Sam Waiter",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (username: string, password: string) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};