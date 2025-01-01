import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="absolute inset-0 bg-[url('/coffee-beans-pattern.png')] opacity-5" />
      <LoginForm />
    </div>
  );
};

export default Login;