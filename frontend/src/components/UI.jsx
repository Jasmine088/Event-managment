import React from "react";

export const GlassmorphismCard = ({ children, className = "", neon = false, ...props }) => {
  return (
    <div
      className={`glass-dark ${neon ? "neon-glow-pink" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-accent hover:bg-cyan-400 text-black",
    secondary: "bg-neon hover:bg-pink-600 text-white",
    outline: "border border-accent hover:bg-accent/10 text-accent",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={`btn-hover font-semibold rounded-lg transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({ children, type = "primary" }) => {
  const types = {
    primary: "bg-accent/20 text-accent",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${types[type]}`}>
      {children}
    </span>
  );
};

export const Input = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <input
        className="w-full px-4 py-2 rounded-lg bg-secondary border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Select = ({ label, options, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <select
        className="w-full px-4 py-2 rounded-lg bg-secondary border border-white/20 text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`glass-dark max-w-md w-full mx-4 p-6 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold gradient-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const TextField = ({ label, type = "text", placeholder, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <textarea
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-secondary border border-white/20 text-white placeholder-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none"
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};
