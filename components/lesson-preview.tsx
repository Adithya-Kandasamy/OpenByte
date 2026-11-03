"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArduinoFigure } from "./figures";
import { BLINK_CODE } from "../lib/site-content";

// Only interpret the supported Blink sketch. User code is never executed.
function blinkTiming(code: string) {
  const high = code.match(
    /digitalWrite\(\s*13\s*,\s*HIGH\s*\)\s*;\s*delay\(\s*(\d+)\s*\)/,
  );
  const low = code.match(
    /digitalWrite\(\s*13\s*,\s*LOW\s*\)\s*;\s*delay\(\s*(\d+)\s*\)/,
  );
  if (!high || !low) return null;
  const on = Number(high[1]);
  const off = Number(low[1]);
  return on >= 100 && off >= 100 && on <= 10000 && off <= 10000
    ? { on, off }
    : null;
}

export function LessonPreview() {
  const id = useId();
  const [code, setCode] = useState(BLINK_CODE);
  const [typing, setTyping] = useState(false);
  const [running, setRunning] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [lit, setLit] = useState(true);
  const interrupted = useRef(false);
  const timing = blinkTiming(code);
  const on = timing?.on ?? 500;
  const off = timing?.off ?? 500;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    if (!media.matches) {
      setCode("");
      setTyping(true);
      timer = setInterval(() => {
        if (interrupted.current || media.matches) {
          clearInterval(timer);
          setTyping(false);
          if (media.matches) setCode(BLINK_CODE);
          return;
        }
        index += 4;
        setCode(BLINK_CODE.slice(0, index));
        if (index >= BLINK_CODE.length) {
          clearInterval(timer);
          setTyping(false);
        }
      }, 22);
    }
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    setLit(true);
    if (reduced || !running || (!typing && !timing)) return;
    let timer: ReturnType<typeof setTimeout>;
    let current = true;
    const tick = () => {
      timer = setTimeout(
        () => {
          current = !current;
          setLit(current);
          tick();
        },
        current ? on : off,
      );
    };
    tick();
    return () => clearTimeout(timer);
  }, [on, off, running, reduced, typing, Boolean(timing)]);

  function reset() {
    interrupted.current = true;
    setTyping(false);
    setCode(BLINK_CODE);
    setRunning(true);
  }

  return (
    <div className="blink-demo" data-lit={lit}>
      <div className="blink-toolbar">
        <label htmlFor={id}>
          <span className="file-icon" aria-hidden="true">
            {"</>"}
          </span>{" "}
          blink.ino
        </label>
        <div className="blink-controls">
          <button type="button" onClick={reset} aria-label="Reset Blink sketch">
            Reset
          </button>
          <button
            type="button"
            onClick={() => setRunning(!running)}
            disabled={reduced}
            aria-label={running ? "Pause LED" : "Run LED"}
          >
            {running ? "Pause" : "Run"}
          </button>
        </div>
      </div>
      <div className="blink-workspace">
        <div className="editor-field">
          <div className="line-numbers" aria-hidden="true">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            id={id}
            aria-label="Edit the Arduino Blink example"
            aria-describedby={`${id}-help`}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            value={code}
            onFocus={() => {
              if (typing) {
                interrupted.current = true;
                setTyping(false);
                setCode(BLINK_CODE);
              }
            }}
            onChange={(event) => {
              interrupted.current = true;
              setTyping(false);
              setCode(event.target.value);
            }}
          />
        </div>
        <div className="blink-circuit" aria-hidden="true">
          <span className="mono">OUTPUT / PIN 13</span>
          <ArduinoFigure />
          <span className="circuit-state">
            <i />
            {reduced
              ? "Static preview"
              : !timing && !typing
                ? "Check sketch"
                : lit
                  ? "HIGH"
                  : "LOW"}
          </span>
        </div>
      </div>
      <div className="blink-status">
        <span className="mono">
          <i />
          {typing
            ? "Writing sketch…"
            : reduced
              ? "Reduced motion"
              : !timing
                ? "Unsupported sketch"
                : running
                  ? `Running · ${on} ms / ${off} ms`
                  : "Paused"}
        </span>
        <span className="mono">Arduino Uno</span>
      </div>
      <p id={`${id}-help`} className="editor-help">
        Live Blink preview. Edit delay values (100–10,000 ms) to change the LED.
        A browser simulation, not connected hardware.
      </p>
    </div>
  );
}
