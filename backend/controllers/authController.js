import { db } from "../config/database.js";
import { generateToken, generateId } from "../utils/tokenUtils.js";

export const login = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password, and role are required" });
  }

  const user = db.users.find(
    (u) => u.email === email && u.password === password && u.role === role
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials or role mismatch" });
  }

  const token = generateToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

export const register = (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || role !== "student") {
    return res.status(400).json({ error: "Only students can self-register" });
  }

  if (db.users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    id: generateId("user"),
    email,
    password,
    name,
    role: "student",
    createdAt: new Date(),
  };

  db.users.push(newUser);
  const token = generateToken(newUser);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  });
};

export const getCurrentUser = (req, res) => {
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
};
