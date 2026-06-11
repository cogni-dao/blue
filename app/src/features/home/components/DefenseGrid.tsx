// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/DefenseGrid`
 * Purpose: Animated hero backdrop for cogni/blue — a live attack-surface graph.
 *   Blue nodes form the monitored network; red threats probe inward from the
 *   edges and are intercepted at each node with a cyan detection pulse. The
 *   visual literalizes the blue-team loop (monitor → detect → contain).
 * Scope: Decorative canvas only. No data, no interaction; honors reduced-motion.
 * Invariants: Self-contained <canvas>; all animation state lives in the effect
 *   closure; cleans up its rAF + resize listener on unmount.
 * Side-effects: requestAnimationFrame, window resize listener.
 * Links: src/features/home/components/NewHomeHero.tsx
 */

"use client";

import { useEffect, useRef } from "react";

// Decorative palette tuned to the defense-azure brand; canvas can't read CSS
// tokens cheaply, so these mirror --primary (blue) + --destructive (red).
const NODE = "125, 211, 252"; // sky-300
const LINK = "56, 189, 248"; // sky-400
const PULSE = "34, 211, 238"; // cyan-400
const THREAT = "239, 68, 68"; // red-500

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
interface Threat {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
interface Pulse {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

export function DefenseGrid({
  className,
}: {
  readonly className?: string;
}): React.ReactElement {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let lastSpawn = 0;
    const nodes: Node[] = [];
    const threats: Threat[] = [];
    const pulses: Pulse[] = [];

    const LINK_DIST = 168;
    const HIT_DIST = 22;

    function seed(): void {
      nodes.length = 0;
      const count = Math.round(Math.min(28, Math.max(10, (w * h) / 42000)));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
        });
      }
    }

    function resize(): void {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function spawnThreat(): void {
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      if (!target) return;
      const edge = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      if (edge === 0) {
        x = Math.random() * w;
        y = -12;
      } else if (edge === 1) {
        x = w + 12;
        y = Math.random() * h;
      } else if (edge === 2) {
        x = Math.random() * w;
        y = h + 12;
      } else {
        x = -12;
        y = Math.random() * h;
      }
      const dx = target.x - x;
      const dy = target.y - y;
      const d = Math.hypot(dx, dy) || 1;
      const sp = 0.7 + Math.random() * 0.7;
      threats.push({ x, y, vx: (dx / d) * sp, vy: (dy / d) * sp });
    }

    function drawNetwork(): void {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            ctx!.strokeStyle = `rgba(${LINK}, ${(1 - dist / LINK_DIST) * 0.16})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${NODE}, 0.85)`;
        ctx!.fill();
      }
    }

    function frame(t: number): void {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      drawNetwork();

      if (t - lastSpawn > 620 + Math.random() * 900 && threats.length < 16) {
        lastSpawn = t;
        spawnThreat();
      }

      for (let i = threats.length - 1; i >= 0; i--) {
        const th = threats[i];
        if (!th) continue;
        th.x += th.vx;
        th.y += th.vy;

        let intercepted = false;
        for (const n of nodes) {
          const dx = n.x - th.x;
          const dy = n.y - th.y;
          if (dx * dx + dy * dy < HIT_DIST * HIT_DIST) {
            intercepted = true;
            pulses.push({ x: n.x, y: n.y, r: 3, alpha: 0.6 });
            break;
          }
        }
        const off = th.x < -48 || th.x > w + 48 || th.y < -48 || th.y > h + 48;
        if (intercepted || off) {
          threats.splice(i, 1);
          continue;
        }

        ctx!.strokeStyle = `rgba(${THREAT}, 0.22)`;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(th.x, th.y);
        ctx!.lineTo(th.x - th.vx * 9, th.y - th.vy * 9);
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.arc(th.x, th.y, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${THREAT}, 0.95)`;
        ctx!.fill();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        if (!p) continue;
        p.r += 1.5;
        p.alpha *= 0.94;
        if (p.alpha < 0.03 || p.r > 46) {
          pulses.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${PULSE}, ${p.alpha})`;
        ctx!.lineWidth = 1.4;
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    if (reduced) {
      drawNetwork();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = (): void => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
