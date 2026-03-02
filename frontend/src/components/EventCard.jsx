import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "./UI";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const EventCard = ({ event, onClick, isRegistered = false }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="glass-dark p-6 rounded-2xl cursor-pointer group overflow-hidden neon-glow hover:neon-glow-pink smooth"
    >
      {/* Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-accent smooth">
              {event.title}
            </h3>
          </div>
          {isRegistered && <Badge type="success">Registered</Badge>}
        </div>

        <p className="text-sm text-white/70 line-clamp-2">{event.description}</p>

        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
          <span>⏰ {event.time}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent to-neon h-full"
              style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-white/70 whitespace-nowrap">
            {event.registrations}/{event.capacity}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge type={event.status}>{event.status}</Badge>
          <span className="text-xs text-accent font-semibold">View →</span>
        </div>
      </div>
    </div>
  );
};
