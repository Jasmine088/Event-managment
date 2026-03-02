import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Header } from "../components/Header";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Button, Badge } from "../components/UI";
import { useAuth } from "../hooks/useAuth";
import { eventAPI } from "../utils/api";

export const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event || !imageRef.current || !contentRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      0
    ).fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.2
    );
  }, [event]);

  const fetchEvent = async () => {
    try {
      const response = await eventAPI.getEventById(id);
      setEvent(response.data);
      setIsRegistered(response.data.isRegistered);
    } catch (error) {
      console.error("Failed to fetch event:", error);
      setError("Event not found");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (user.role !== "student") {
      setError("Only students can register for events");
      return;
    }

    setRegistering(true);
    setError("");
    setSuccess("");

    try {
      await eventAPI.registerForEvent(id);
      setIsRegistered(true);
      setSuccess("Successfully registered for the event!");
      setEvent((prev) => ({
        ...prev,
        registrations: prev.registrations + 1,
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to register");
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!confirm("Are you sure you want to unregister?")) return;

    setRegistering(true);
    setError("");
    setSuccess("");

    try {
      await eventAPI.unregisterFromEvent(id);
      setIsRegistered(false);
      setSuccess("Successfully unregistered from the event");
      setEvent((prev) => ({
        ...prev,
        registrations: prev.registrations - 1,
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to unregister");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AnimatedBackground />
        <Header />
        <div className="max-w-4xl mx-auto px-4 pt-24">
          <div className="glass-dark h-64 rounded-2xl animate-pulse mb-6"></div>
          <div className="glass-dark h-96 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen">
        <AnimatedBackground />
        <Header />
        <div className="max-w-4xl mx-auto px-4 pt-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Event not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-accent hover:text-cyan-300 mb-6 smooth"
        >
          ← Back
        </button>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 mb-6">
            {success}
          </div>
        )}

        {/* Event Image */}
        <div ref={imageRef} className="w-full h-96 rounded-2xl overflow-hidden mb-8 neon-glow">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div ref={contentRef} className="lg:col-span-2 space-y-8">
            {/* Title and Status */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white flex-1">
                  {event.title}
                </h1>
                <Badge type={event.status}>{event.status}</Badge>
              </div>
              <p className="text-lg text-white/70">{event.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "📅", label: "Date", value: new Date(event.date).toLocaleDateString() },
                { icon: "⏰", label: "Time", value: event.time },
                { icon: "📍", label: "Location", value: event.location },
                { icon: "🎨", label: "Category", value: event.category },
              ].map((detail, i) => (
                <div key={i} className="glass-dark p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">{detail.label}</p>
                  <p className="font-semibold text-white">
                    {detail.icon} {detail.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Registration Status */}
            <div className="glass-dark p-6 rounded-2xl">
              <p className="text-white/70 mb-4">Registration Status</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">
                      {event.registrations}/{event.capacity} Registered
                    </span>
                    <span className="text-accent">
                      {Math.round((event.registrations / event.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-accent to-neon h-full smooth"
                      style={{
                        width: `${(event.registrations / event.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                {event.registrations >= event.capacity && (
                  <p className="text-yellow-400 text-sm font-semibold">
                    ⚠️ Event is full. Registration is closed.
                  </p>
                )}
                {isRegistered && (
                  <p className="text-green-400 text-sm font-semibold">
                    ✓ You are registered for this event
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-dark p-8 rounded-2xl sticky top-24 space-y-6 neon-glow">
              <div>
                <p className="text-white/60 text-sm mb-2">Capacity</p>
                <p className="text-3xl font-bold text-accent">
                  {event.capacity}
                </p>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-2">Spots Available</p>
                <p className="text-3xl font-bold text-neon">
                  {event.capacity - event.registrations}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                {user && user.role === "student" ? (
                  isRegistered ? (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleUnregister}
                      disabled={registering}
                    >
                      {registering ? "Processing..." : "Unregister"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handleRegister}
                      disabled={registering || event.registrations >= event.capacity}
                    >
                      {registering
                        ? "Registering..."
                        : event.registrations >= event.capacity
                        ? "Event Full"
                        : "Register Now"}
                    </Button>
                  )
                ) : user ? (
                  <p className="text-white/70 text-center p-4 bg-secondary/50 rounded-lg">
                    Only students can register for events
                  </p>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => navigate("/auth")}
                  >
                    Login to Register
                  </Button>
                )}
              </div>

              <div className="text-xs text-white/50 text-center">
                <p>Created: {new Date(event.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
