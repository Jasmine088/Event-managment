import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Input, Select, Button, Modal, TextField, Badge } from "../components/UI";
import { useAuth } from "../hooks/useAuth";
import { eventAPI } from "../utils/api";

export const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technology",
    date: "",
    time: "",
    location: "",
    capacity: "",
    image: "",
  });

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/auth");
      return;
    }
    fetchEvents();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getOrganizerEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingEvent) {
        await eventAPI.updateEvent(editingEvent.id, formData);
      } else {
        await eventAPI.createEvent(formData);
      }
      setShowModal(false);
      resetForm();
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save event");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await eventAPI.deleteEvent(eventId);
        fetchEvents();
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete event");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Technology",
      date: "",
      time: "",
      location: "",
      capacity: "",
      image: "",
    });
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
      image: event.image,
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              My Events
            </h1>
            <p className="text-white/70">
              Manage and create your events
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            size="lg"
          >
            + Create Event
          </Button>
        </section>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 mb-8">
            {error}
          </div>
        )}

        {/* Events List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-dark h-32 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="glass-dark p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-white/70 mb-2">{event.description}</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Badge type={event.status}>{event.status}</Badge>
                      <span className="text-sm text-white/60">
                        📅 {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-white/60">
                        👥 {event.registrations}/{event.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {event.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg mb-4">
                  No events yet
                </p>
                <Button onClick={() => setShowModal(true)}>
                  Create Your First Event
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create/Edit Event Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingEvent ? "Edit Event" : "Create New Event"}
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <Input
            label="Event Title"
            placeholder="e.g., Tech Summit 2024"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            placeholder="Describe your event"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            rows="3"
          />
          <Select
            label="Category"
            options={[
              { value: "Technology", label: "Technology" },
              { value: "Cultural", label: "Cultural" },
              { value: "Sports", label: "Sports" },
              { value: "Academic", label: "Academic" },
              { value: "Social", label: "Social" },
            ]}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <Input
            label="Location"
            placeholder="e.g., Main Auditorium"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <Input
            label="Capacity"
            type="number"
            placeholder="Max participants"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            required
          />
          <Input
            label="Image URL"
            placeholder="https://..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <Button type="submit" className="w-full">
            {editingEvent ? "Update Event" : "Create Event"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
