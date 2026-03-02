import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Button, Badge, Modal, Input } from "../components/UI";
import { useAuth } from "../hooks/useAuth";
import { eventAPI } from "../utils/api";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/auth");
      return;
    }
    fetchEvents();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((e) => e.status === filter);

  const handleApprove = async (eventId) => {
    try {
      await eventAPI.approveEvent(eventId);
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve event");
    }
  };

  const handleReject = async () => {
    if (!selectedEvent) return;

    try {
      await eventAPI.rejectEvent(selectedEvent.id, rejectionReason);
      fetchEvents();
      setShowRejectModal(false);
      setSelectedEvent(null);
      setRejectionReason("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject event");
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/70">
            Review and approve/reject event submissions
          </p>
        </section>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 mb-8">
            {error}
          </div>
        )}

        {/* Filters */}
        <section className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize smooth ${
                filter === status
                  ? "bg-accent text-black"
                  : "glass-dark hover:border-accent border border-white/20"
              }`}
            >
              {status}
            </button>
          ))}
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Pending", count: events.filter((e) => e.status === "pending").length },
            { label: "Approved", count: events.filter((e) => e.status === "approved").length },
            { label: "Rejected", count: events.filter((e) => e.status === "rejected").length },
          ].map((stat, i) => (
            <div key={i} className="glass-dark p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold gradient-text">{stat.count}</div>
              <p className="text-white/70 mt-2">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Events List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-dark h-32 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="glass-dark p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-white/70 mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-3 items-center">
                        <Badge type={event.status}>{event.status}</Badge>
                        <span className="text-sm text-white/60">
                          🎨 {event.category}
                        </span>
                        <span className="text-sm text-white/60">
                          📅 {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-white/60">
                          📍 {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/10 text-sm text-white/60">
                    <div>
                      <span className="font-semibold text-white">Organizer:</span> {event.organizerId}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Capacity:</span> {event.capacity}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Registrations:</span> {event.registrations}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Time:</span> {event.time}
                    </div>
                  </div>

                  {/* Actions */}
                  {event.status === "pending" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleApprove(event.id)}
                      >
                        ✓ Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRejectModal(true);
                        }}
                      >
                        ✕ Reject
                      </Button>
                    </div>
                  )}

                  {event.status === "rejected" && event.rejectionReason && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm">
                        <span className="font-semibold text-white">Reason:</span>{" "}
                        <span className="text-white/60">{event.rejectionReason}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">
                  No {filter} events
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedEvent(null);
          setRejectionReason("");
        }}
        title="Reject Event"
      >
        <div className="space-y-4">
          <p className="text-white/70">
            Are you sure you want to reject "{selectedEvent?.title}"?
          </p>
          <Input
            label="Rejection Reason"
            placeholder="Explain why..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowRejectModal(false);
                setSelectedEvent(null);
                setRejectionReason("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
