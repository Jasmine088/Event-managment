import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { EventCard } from "../components/EventCard";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { eventAPI } from "../utils/api";
import { useAuth } from "../hooks/useAuth";

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getApprovedEvents();
      setEvents(response.data.slice(0, 6)); // Show only first 6 events
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const cardElements = containerRef.current.querySelectorAll(".event-card");
    gsap.fromTo(
      cardElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, [events]);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />
      
      <Hero
        title="Discover Amazing Events"
        subtitle="Connect, Learn, and Celebrate with Your Community"
        cta={() => navigate(user ? (user.role === "student" ? "/student-dashboard" : "/organizer-dashboard") : "/auth")}
        ctaText={user ? "Go to Dashboard" : "Get Started"}
      />

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Events
          </h2>
          <p className="text-lg text-white/70">
            Explore the latest and greatest happenings
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-dark h-96 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-4 bg-gradient-to-r from-accent to-neon rounded-lg font-bold text-black hover:shadow-glow smooth"
          >
            View All Events
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "500+", label: "Active Events" },
            { number: "10K+", label: "Students" },
            { number: "99%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <p className="text-white/70 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/50">
          <p>&copy; 2024 EventHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
