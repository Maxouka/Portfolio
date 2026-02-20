"use client";

import { useState, useCallback, useRef } from "react";
import {
  type TerminalLine,
  type CommandResult,
  executeCommand,
  getWelcomeMessage,
  COMMAND_LIST,
} from "@/components/terminal/commands";

export type { TerminalLine };

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(getWelcomeMessage);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const savedInput = useRef("");

  // Special action states
  const [matrixBoost, setMatrixBoost] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const addInputLine = useCallback((input: string): TerminalLine => {
    return {
      id: `input-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: "input",
      content: input,
    };
  }, []);

  const submitCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();

      // Add input echo
      const inputLine = addInputLine(trimmed);
      const result: CommandResult = executeCommand(trimmed);

      if (result.action === "clear") {
        setLines(getWelcomeMessage());
      } else {
        setLines((prev) => [...prev, inputLine, ...result.lines]);
      }

      // Handle special actions
      if (result.action === "matrix") {
        setMatrixBoost(true);
        setTimeout(() => setMatrixBoost(false), 5000);
      }
      if (result.action === "hack") {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 2000);
      }
      if (result.action === "download") {
        const a = document.createElement("a");
        a.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`;
        a.download = "resume.pdf";
        a.click();
      }

      // Update history
      if (trimmed) {
        setHistory((prev) => [trimmed, ...prev]);
      }
      setHistoryIndex(-1);
      savedInput.current = "";
      setCurrentInput("");
    },
    [addInputLine]
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (direction === "up") {
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          if (historyIndex === -1) {
            savedInput.current = currentInput;
          }
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      } else {
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput(savedInput.current);
        }
      }
    },
    [history, historyIndex, currentInput]
  );

  const clearTerminal = useCallback(() => {
    setLines(getWelcomeMessage());
  }, []);

  const handleTabComplete = useCallback(
    (input: string): string => {
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return input;

      const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(trimmed));
      if (matches.length === 1) {
        return matches[0];
      }
      return input;
    },
    []
  );

  return {
    lines,
    currentInput,
    setCurrentInput,
    submitCommand,
    clearTerminal,
    navigateHistory,
    handleTabComplete,
    matrixBoost,
    glitchActive,
  };
}
