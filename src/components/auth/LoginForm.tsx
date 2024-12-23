import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Card className="w-[350px] glass-card fade-in">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="hover-scale"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="hover-scale"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Cashier: cashier / cashier123</p>
            <p>Admin: admin / admin123</p>
            <p>Owner: owner / owner123</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full hover-scale">
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;