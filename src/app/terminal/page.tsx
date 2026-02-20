"use client";

import { useState, useEffect } from "react";
import { TerminalEmulator } from "@/components/terminal/TerminalEmulator";
import { MatrixRain } from "@/components/background/MatrixRain";

export default function TerminalPage() {
  const [matrixOpacity, setMatrixOpacity] = useState(0.3);

  // Listen for matrix boost from terminal easter egg
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const boostEl = document.querySelector("[data-matrix-boost]");
      if (boostEl) {
        setMatrixOpacity(0.8);
        setTimeout(() => setMatrixOpacity(0.3), 5000);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="h-screen w-full p-2 sm:p-4 relative">
      <MatrixRain opacity={matrixOpacity} />
      <div className="relative z-10 h-full">
        <TerminalEmulator />
      </div>
    </main>
  );
}
