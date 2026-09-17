"use client";

import React from "react";

export function BackgroundRipple() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Ripple Rings */}
      <div className="relative flex items-center justify-center">
        {[200, 360, 520, 680, 840, 1000].map((size, index) => (
          <div
            key={size}
            className="absolute rounded-full border border-neutral-300/40 dark:border-neutral-700/30 animate-pulse"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: "4s",
            }}
          />
        ))}

        {/* Central Ambient Glow */}
        <div className="absolute size-96 rounded-full bg-neutral-200/50 dark:bg-neutral-800/30 blur-3xl" />
      </div>
    </div>
  );
}
