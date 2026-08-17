"use client";

import { useEffect, useState } from "react";

interface CosmicParallaxBgProps {
  loop?: boolean;
  className?: string;
}

function generateStarBoxShadow(count: number): string {
  return Array.from({ length: count }, () => {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    return `${x}px ${y}px #2563eb`;
  }).join(", ");
}

export function CosmicParallaxBg({
  loop = true,
  className = "",
}: CosmicParallaxBgProps) {
  const [stars, setStars] = useState<[string, string, string]>(["", "", ""]);

  useEffect(() => {
    setStars([
      generateStarBoxShadow(700),
      generateStarBoxShadow(200),
      generateStarBoxShadow(100),
    ]);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`cosmic-parallax-container ${loop ? "cosmic-loop" : "cosmic-once"} ${className}`}
    >
      <div style={{ boxShadow: stars[0] }} className="cosmic-stars" />
      <div style={{ boxShadow: stars[1] }} className="cosmic-stars-medium" />
      <div style={{ boxShadow: stars[2] }} className="cosmic-stars-large" />

      <div className="cosmic-planet" />
    </div>
  );
}
