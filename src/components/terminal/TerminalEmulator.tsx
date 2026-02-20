"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "@/lib/hooks/useTerminal";
import type { TerminalLine } from "@/lib/hooks/useTerminal";

function getLineColor(line: TerminalLine): string {
  if (line.color) {
    const colorMap: Record<string, string> = {
      "terminal-green": "text-terminal-green",
      "error-red": "text-error-red",
      "warning-yellow": "text-warning-yellow",
      "accent-primary": "text-accent-primary",
      "muted": "text-muted",
    };
    return colorMap[line.color] || "text-foreground";
  }

  switch (line.type) {
    case "input":
      return "text-terminal-green";
    case "error":
      return "text-error-red";
    case "system":
      return "text-accent-primary";
    default:
      return "text-foreground";
  }
}

function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const draw = () => {
      frame++;
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "rgba(34, 197, 94, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Moving scan line
      const scanY = (frame * 1.2) % (H + 60) - 30;
      const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0)");
      gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.04)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 30, W, 60);

      // Floating hex values
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(34, 197, 94, 0.025)";
      const hexChars = "0123456789ABCDEF";
      for (let i = 0; i < 6; i++) {
        const hx = ((frame * 0.3 + i * 170) % (W + 200)) - 100;
        const hy = (i * 137 + 50) % H;
        let hex = "";
        for (let j = 0; j < 8; j++) {
          hex += hexChars[Math.floor(((frame * 0.1 + i + j) * 7) % 16)];
        }
        ctx.fillText(`0x${hex}`, hx, hy);
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function TerminalEmulator() {
  const {
    lines,
    currentInput,
    setCurrentInput,
    submitCommand,
    clearTerminal,
    navigateHistory,
    handleTabComplete,
    matrixBoost,
    glitchActive,
  } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitCommand(currentInput);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateHistory("up");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateHistory("down");
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        clearTerminal();
      } else if (e.key === "Tab") {
        e.preventDefault();
        const completed = handleTabComplete(currentInput);
        setCurrentInput(completed);
      }
    },
    [submitCommand, currentInput, navigateHistory, clearTerminal, handleTabComplete, setCurrentInput]
  );

  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const cmd = target.closest<HTMLElement>("[data-cmd]")?.dataset.cmd;
      if (cmd) {
        e.stopPropagation();
        submitCommand(cmd);
        return;
      }
      inputRef.current?.focus();
    },
    [submitCommand]
  );

  return (
    <div
      className={`flex flex-col h-full font-mono text-sm bg-background rounded-lg border border-card-border overflow-hidden shadow-2xl ${glitchActive ? "glitch-active" : ""}`}
      onClick={handleContainerClick}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-card-bg border-b border-card-border shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error-red/80" />
          <div className="w-3 h-3 rounded-full bg-warning-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-terminal-green/80" />
        </div>
        <span className="text-terminal-green text-xs tracking-wide">
          portfolio-terminal v1.0
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 scroll-smooth relative"
      >
        <TerminalBackground />
        <div className="relative z-10">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`${getLineColor(line)} whitespace-pre-wrap break-words leading-relaxed`}
              >
                {line.html === "welcome-banner" ? (
                  <div className="flex items-center gap-5 my-2">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-terminal-green/50 shadow-lg shadow-terminal-green/10 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/moicv.png`}
                        alt="Maxime LAUNOY"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-accent-primary font-mono text-sm leading-relaxed">
                      <div className="text-terminal-green font-bold text-base">PORTFOLIO TERMINAL v1.0</div>
                      <div>Maxime LAUNOY — Cybersec Engineer & Fullstack Dev</div>
                      <div className="text-muted mt-1 italic">&quot;Building secure systems by day, shipping SaaS by night&quot;</div>
                    </div>
                  </div>
                ) : line.html === "whoami-photo" ? (
                  <div className="flex justify-center my-2">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-terminal-green/50 shadow-lg shadow-terminal-green/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/moicv.png`}
                        alt="Maxime LAUNOY"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : line.html ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: line.html }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const cmd = target.closest<HTMLElement>("[data-cmd]")?.dataset.cmd;
                      if (cmd) {
                        e.stopPropagation();
                        submitCommand(cmd);
                      } else {
                        e.stopPropagation();
                      }
                    }}
                  />
                ) : line.type === "input" ? (
                  <span>
                    <span className="text-terminal-green">$ </span>
                    {line.content}
                  </span>
                ) : (
                  <span>{line.content || "\u00A0"}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-3 bg-card-bg/50 border-t border-card-border shrink-0">
        <span className="text-terminal-green whitespace-nowrap mr-2">
          maxime@portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-foreground outline-none caret-terminal-green font-mono text-sm"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        <span className="w-2 h-4 bg-terminal-green cursor-blink ml-0.5" />
      </div>

      {/* Expose matrixBoost to parent via data attribute */}
      {matrixBoost && <div data-matrix-boost="true" className="hidden" />}
    </div>
  );
}
