"use client";

import { useEffect, useRef } from "react";

export function MatrixRain({ opacity = 0.3 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0,
      columns = 0;
    let drops: number[] = [];

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      const newCols = Math.floor(W / fontSize);
      if (newCols !== columns) {
        const old = drops;
        drops = Array(newCols).fill(1);
        for (let i = 0; i < Math.min(old.length, newCols); i++) drops[i] = old[i];
        columns = newCols;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)";
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx.fillText(char, x, y);

        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.fillText(char, x, y);
        }

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
