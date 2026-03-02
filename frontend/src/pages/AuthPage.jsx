import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useAuth } from "../hooks/useAuth";
import { Input, Select, Button } from "../components/UI";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "student@college.edu",
    password: "student123",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(loginForm.email, loginForm.password, role);
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(registerForm.email, registerForm.password, registerForm.name);
      navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <AnimatedBackground />
      
      <div className="glass-dark p-8 rounded-2xl max-w-md w-full space-y-8 relative z-10 neon-glow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-white/70">
            {isLogin ? "Login to your account" : "Create a new account"}
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {isLogin ? (
            <>
              <Select
                label="Select Role"
                options={[
                  { value: "student", label: "Student" },
                  { value: "organizer", label: "Organizer" },
                  { value: "admin", label: "Admin" },
                ]}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                label="Email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Full Name"
                label="Full Name"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, name: e.target.value })
                }
                required
              />
              <Input
                type="email"
                placeholder="Email"
                label="Email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                required
              />
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                required
              />
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-secondary text-white/70">
              {isLogin ? "New user?" : "Already have an account?"}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Button>

        {/* Credentials for testing */}
        {isLogin && (
          <div className="text-xs text-white/50 space-y-1 p-3 bg-secondary/50 rounded-lg">
            <p className="font-semibold text-white/70">Demo Credentials:</p>
            <p>👤 Student: student@college.edu / student123</p>
            <p>🎯 Organizer: organizer@college.edu / org123</p>
            <p>⚙️ Admin: admin@college.edu / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};
