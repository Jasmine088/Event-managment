import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/Header";
import { EventCard } from "../components/EventCard";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Button } from "../components/UI";
import { useAuth } from "../hooks/useAuth";
import { eventAPI } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("browse");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/auth");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, registrationsRes] = await Promise.all([
        eventAPI.getApprovedEvents(),
        eventAPI.getStudentRegistrations(),
      ]);
      setEvents(eventsRes.data);
      setRegisteredEvents(registrationsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((e) => e.id === eventId);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="glass-dark p-8 rounded-2xl neon-glow">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome, {user?.name}!
            </h1>
            <p className="text-white/70">
              Discover and register for amazing events
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-8 flex gap-4 border-b border-white/10 overflow-x-auto">
          {["browse", "registered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent smooth"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab === "browse" ? "Browse Events" : "My Registrations"}
              {tab === "registered" && (
                <span className="ml-2 text-accent">({registeredEvents.length})</span>
              )}
            </button>
          ))}
        </section>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-dark h-96 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : activeTab === "browse" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} onClick={() => navigate(`/event/${event.id}`)}>
                  <EventCard event={event} isRegistered={isRegistered(event.id)} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/70 text-lg">No events available</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event) => (
                <div key={event.id} onClick={() => navigate(`/event/${event.id}`)}>
                  <EventCard event={event} isRegistered={true} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/70 text-lg mb-4">
                  You haven't registered for any events yet
                </p>
                <Button onClick={() => setActiveTab("browse")}>
                  Browse Events
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
