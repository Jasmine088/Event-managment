import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const blobs = containerRef.current.querySelectorAll(".blob");

    blobs.forEach((blob, index) => {
      gsap.to(blob, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(5, 8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-primary"
    >
      {/* Animated gradient blobs */}
      <div
        className="blob absolute w-96 h-96 rounded-full mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          filter: "blur(40px)",
        }}
      ></div>
      <div
        className="blob absolute w-96 h-96 rounded-full mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,0,110,0.8) 0%, transparent 70%)",
          top: "50%",
          right: "10%",
          filter: "blur(40px)",
        }}
      ></div>
      <div
        className="blob absolute w-96 h-96 rounded-full mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.6) 0%, transparent 70%)",
          bottom: "10%",
          left: "50%",
          filter: "blur(40px)",
        }}
      ></div>

      {/* Mesh pattern */}
      <div className="absolute inset-0 bg-mesh opacity-10"></div>

      {/* Grain effect */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 1200 800%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /%3E%3C/filter%3E%3Crect width=%221200%22 height=%22800%22 fill=%22white%22 filter=%22url(%23noise)%22 /%3E%3C/svg%3E')",
      }}></div>
    </div>
  );
};
