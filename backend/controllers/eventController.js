import { db } from "../config/database.js";
import { generateId } from "../utils/tokenUtils.js";

// Get all approved events (public view)
export const getAllApprovedEvents = (req, res) => {
  const approvedEvents = db.events.filter((e) => e.status === "approved");
  res.json(approvedEvents);
};

// Get single event details
export const getEventById = (req, res) => {
  const event = db.events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  // Check if user is registered
  let isRegistered = false;
  if (req.user) {
    isRegistered = db.eventRegistrations.some(
      (r) => r.eventId === event.id && r.studentId === req.user.id
    );
  }

  res.json({ ...event, isRegistered });
};

// Create event (Organizer)
export const createEvent = (req, res) => {
  const { title, description, category, date, time, location, capacity, image } = req.body;

  if (!title || !description || !category || !date || !time || !location || !capacity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newEvent = {
    id: generateId("evt"),
    title,
    description,
    category,
    date: new Date(date),
    time,
    location,
    capacity: parseInt(capacity),
    registrations: 0,
    status: "pending",
    organizerId: req.user.id,
    image: image || "https://images.unsplash.com/photo-1540575467063-178f50002200?w=500&h=300&fit=crop",
    createdAt: new Date(),
  };

  db.events.push(newEvent);
  res.status(201).json(newEvent);
};

// Get organizer's events
export const getOrganizerEvents = (req, res) => {
  const events = db.events.filter((e) => e.organizerId === req.user.id);
  res.json(events);
};

// Update event (Organizer)
export const updateEvent = (req, res) => {
  const event = db.events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  if (event.organizerId !== req.user.id) {
    return res.status(403).json({ error: "Only event organizer can update" });
  }

  if (event.status !== "pending") {
    return res.status(400).json({ error: "Can only edit pending events" });
  }

  const { title, description, category, date, time, location, capacity, image } = req.body;
  
  event.title = title || event.title;
  event.description = description || event.description;
  event.category = category || event.category;
  event.date = date ? new Date(date) : event.date;
  event.time = time || event.time;
  event.location = location || event.location;
  event.capacity = capacity ? parseInt(capacity) : event.capacity;
  event.image = image || event.image;

  res.json(event);
};

// Delete event (Organizer)
export const deleteEvent = (req, res) => {
  const eventIndex = db.events.findIndex((e) => e.id === req.params.id);
  if (eventIndex === -1) {
    return res.status(404).json({ error: "Event not found" });
  }

  const event = db.events[eventIndex];
  if (event.organizerId !== req.user.id) {
    return res.status(403).json({ error: "Only event organizer can delete" });
  }

  db.events.splice(eventIndex, 1);
  res.json({ message: "Event deleted successfully" });
};

// Get all events for admin
export const getAllEvents = (req, res) => {
  res.json(db.events);
};

// Approve event (Admin)
export const approveEvent = (req, res) => {
  const event = db.events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  event.status = "approved";
  res.json(event);
};

// Reject event (Admin)
export const rejectEvent = (req, res) => {
  const { reason } = req.body;
  const event = db.events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  event.status = "rejected";
  event.rejectionReason = reason;
  res.json(event);
};

// Register for event (Student)
export const registerForEvent = (req, res) => {
  const { eventId } = req.body;
  const event = db.events.find((e) => e.id === eventId);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  if (event.status !== "approved") {
    return res.status(400).json({ error: "Event is not available for registration" });
  }

  if (event.registrations >= event.capacity) {
    return res.status(400).json({ error: "Event is full" });
  }

  const alreadyRegistered = db.eventRegistrations.some(
    (r) => r.eventId === eventId && r.studentId === req.user.id
  );

  if (alreadyRegistered) {
    return res.status(400).json({ error: "Already registered for this event" });
  }

  db.eventRegistrations.push({
    id: generateId("reg"),
    eventId,
    studentId: req.user.id,
    registeredAt: new Date(),
  });

  event.registrations += 1;
  res.json({ message: "Registered successfully", event });
};

// Unregister from event (Student)
export const unregisterFromEvent = (req, res) => {
  const { eventId } = req.body;
  const regIndex = db.eventRegistrations.findIndex(
    (r) => r.eventId === eventId && r.studentId === req.user.id
  );

  if (regIndex === -1) {
    return res.status(404).json({ error: "Registration not found" });
  }

  db.eventRegistrations.splice(regIndex, 1);
  const event = db.events.find((e) => e.id === eventId);
  event.registrations -= 1;

  res.json({ message: "Unregistered successfully" });
};

// Get student's registered events
export const getStudentRegistrations = (req, res) => {
  const registrations = db.eventRegistrations.filter((r) => r.studentId === req.user.id);
  const events = registrations.map((reg) => db.events.find((e) => e.id === reg.eventId));
  res.json(events.filter(Boolean));
};
