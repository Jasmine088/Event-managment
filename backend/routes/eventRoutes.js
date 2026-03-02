import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
  getAllApprovedEvents,
  getEventById,
  createEvent,
  getOrganizerEvents,
  updateEvent,
  deleteEvent,
  getAllEvents,
  approveEvent,
  rejectEvent,
  registerForEvent,
  unregisterFromEvent,
  getStudentRegistrations,
} from "../controllers/eventController.js";

const router = express.Router();

// Public routes
router.get("/approved", getAllApprovedEvents);

// Student routes (must be before /:id)
router.post("/register", authMiddleware, requireRole(["student"]), registerForEvent);
router.post("/unregister", authMiddleware, requireRole(["student"]), unregisterFromEvent);
router.get("/student/registrations", authMiddleware, requireRole(["student"]), getStudentRegistrations);

// Organizer routes (must be before /:id)
router.post("/", authMiddleware, requireRole(["organizer"]), createEvent);
router.get("/organizer/events", authMiddleware, requireRole(["organizer"]), getOrganizerEvents);

// Admin routes (must be before /:id)
router.get("/admin/all", authMiddleware, requireRole(["admin"]), getAllEvents);
router.put("/:id/approve", authMiddleware, requireRole(["admin"]), approveEvent);
router.put("/:id/reject", authMiddleware, requireRole(["admin"]), rejectEvent);

// ID-based routes (must be last)
router.get("/:id", getEventById);
router.put("/:id", authMiddleware, requireRole(["organizer"]), updateEvent);
router.delete("/:id", authMiddleware, requireRole(["organizer"]), deleteEvent);

export default router;
