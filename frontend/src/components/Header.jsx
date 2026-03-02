import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./UI";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-neon"></div>
          <span className="text-xl font-bold gradient-text">EventHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/70 hover:text-accent smooth">
            Home
          </Link>
          {user && (
            <Link
              to={
                user.role === "student"
                  ? "/student-dashboard"
                  : user.role === "organizer"
                  ? "/organizer-dashboard"
                  : "/admin-dashboard"
              }
              className="text-white/70 hover:text-accent smooth"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white/70">{user.name}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")} size="sm">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 p-4 space-y-4">
          <Link to="/" className="block text-white/70 hover:text-accent">
            Home
          </Link>
          {user && (
            <>
              <Link
                to={
                  user.role === "student"
                    ? "/student-dashboard"
                    : user.role === "organizer"
                    ? "/organizer-dashboard"
                    : "/admin-dashboard"
                }
                className="block text-white/70 hover:text-accent"
              >
                Dashboard
              </Link>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
          {!user && (
            <Button
              onClick={() => navigate("/auth")}
              className="w-full"
            >
              Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
};
