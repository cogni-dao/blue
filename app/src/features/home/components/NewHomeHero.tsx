// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/NewHomeHero`
 * Purpose: Hero for cogni/blue — an autonomous blue team for the Cogni DAO.
 *   Live attack-surface backdrop (DefenseGrid) + minimal, expert-framed copy.
 * Scope: Homepage only. Does not handle global layout.
 * Side-effects: none
 * Links: src/features/home/components/DefenseGrid.tsx, src/features/home/hooks/useTryDemo.ts
 */

"use client";

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@/components";

import { DefenseGrid } from "./DefenseGrid";
import { useTryDemo } from "../hooks/useTryDemo";

const LOOP = ["Detect", "Hunt", "Harden", "Contain"];

export function NewHomeHero(): ReactElement {
  const { handleTryDemo } = useTryDemo();

  return (
    <section className="relative flex min-h-[40rem] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 md:min-h-[46rem]">
      {/* Live attack-surface backdrop */}
      <DefenseGrid className="absolute inset-0 h-full w-full" />
      {/* Readability vignette + bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, transparent 0%, hsl(var(--background) / 0.55) 70%, hsl(var(--background)) 100%), linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Eyebrow: the real blue-team loop */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 font-mono text-xs text-muted-foreground uppercase tracking-widest backdrop-blur-sm">
          {LOOP.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              {i > 0 ? <span className="text-primary/60">·</span> : null}
              {step}
            </span>
          ))}
        </div>

        <h1 className="text-balance font-bold text-4xl text-foreground leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          AI writes the code.
          <br />
          <span className="text-gradient-accent">Blue hunts the threats.</span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground md:text-xl">
          An autonomous blue team for the Cogni DAO. Every node monitored, every
          machine-written commit hunted for weakness, every finding hardened
          back into the template.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={handleTryDemo}>
            Brief the blue team
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com/Cogni-DAO/blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 size-4" />
              Defense playbook
            </Link>
          </Button>
        </div>

        <p className="mt-10 font-mono text-xs text-muted-foreground/60 uppercase tracking-widest">
          No red team yet — the watch is already standing
        </p>
      </div>
    </section>
  );
}
