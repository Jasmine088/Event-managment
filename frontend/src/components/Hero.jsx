import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const Hero = ({ title, subtitle, cta, ctaText = "Get Started" }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
        0.4
      );
  }, []);

  return (
    <section className="min-h-screen pt-24 px-4 flex items-center justify-center text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold gradient-text leading-tight"
        >
          {title}
        </h1>
        <p
          ref={textRef}
          className="text-xl md:text-2xl text-white/70 leading-relaxed"
        >
          {subtitle}
        </p>
        <div ref={ctaRef}>
          <button
            onClick={cta}
            className="px-8 py-4 bg-gradient-to-r from-accent to-neon rounded-lg font-bold text-black hover:shadow-glow smooth"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};
