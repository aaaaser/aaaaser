"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundRippleEffectProps {
  className?: string;
  cellSize?: number;
}

export function BackgroundRippleEffect({
  className,
  cellSize = 50,
}: BackgroundRippleEffectProps) {
  const [clickedCell, setClickedCell] = useState<{ row: number; col: number; timestamp: number } | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [dimensions, setDimensions] = useState({ rows: 15, cols: 25 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          cols: Math.ceil(clientWidth / cellSize) + 2,
          rows: Math.ceil(clientHeight / cellSize) + 2,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cellSize]);

  const cells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < dimensions.rows; r++) {
      for (let c = 0; c < dimensions.cols; c++) {
        arr.push({ row: r, col: c });
      }
    }
    return arr;
  }, [dimensions.rows, dimensions.cols]);

  const handleCellClick = (row: number, col: number) => {
    setClickedCell({ row, col, timestamp: Date.now() });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-auto [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_75%)] select-none opacity-40 dark:opacity-60",
        className
      )}
    >
      <div
        className="grid absolute inset-0"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${dimensions.rows}, ${cellSize}px)`,
          width: `${dimensions.cols * cellSize}px`,
          height: `${dimensions.rows * cellSize}px`,
        }}
      >
        {cells.map(({ row, col }) => {
          const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
          
          let distanceFromClick = 999;
          if (clickedCell) {
            distanceFromClick = Math.sqrt(
              Math.pow(row - clickedCell.row, 2) + Math.pow(col - clickedCell.col, 2)
            );
          }

          const isWaveActive = distanceFromClick < 7;
          const waveDelay = distanceFromClick * 0.04;

          return (
            <motion.div
              key={`${row}-${col}`}
              onMouseEnter={() => setHoveredCell({ row, col })}
              onMouseLeave={() => setHoveredCell(null)}
              onClick={() => handleCellClick(row, col)}
              initial={false}
              animate={
                isWaveActive
                  ? {
                      scale: [1, 1.15, 0.95, 1],
                      borderColor: [
                        "rgba(150, 150, 150, 0.1)",
                        "rgba(255, 255, 255, 0.4)",
                        "rgba(150, 150, 150, 0.1)",
                      ],
                      backgroundColor: [
                        "transparent",
                        "rgba(120, 120, 120, 0.08)",
                        "transparent",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: waveDelay,
                ease: "easeOut",
              }}
              className={cn(
                "border-[0.5px] border-neutral-300/40 dark:border-neutral-800/40 transition-colors duration-200 cursor-pointer relative",
                isHovered
                  ? "bg-neutral-900/10 dark:bg-neutral-100/10 border-neutral-400 dark:border-neutral-600"
                  : "hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5"
              )}
            >
              {/* Corner dot indicator */}
              <span className="absolute -top-[1.5px] -left-[1.5px] size-[3px] rounded-full bg-neutral-300 dark:bg-neutral-800 opacity-60" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
