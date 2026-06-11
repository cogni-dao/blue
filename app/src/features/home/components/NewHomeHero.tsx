// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/NewHomeHero`
 * Purpose: Hero section for the cogni/blue homepage — sells the mission of an
 *   autonomous AI blue team for the Cogni DAO collective.
 * Scope: Homepage only. Does not handle global layout.
 * Invariants: None.
 * Side-effects: none
 * Links: src/components/vendor/shadcn-io/sparkles.tsx, src/features/home/hooks/useTryDemo.ts
 */

"use client";

import { ArrowRight, Github, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@/components";
// eslint-disable-next-line no-restricted-imports
import { SparklesCore } from "@/components/vendor/shadcn-io/sparkles";

import { useTryDemo } from "../hooks/useTryDemo";

// Mostly blue/cyan defenders with a single red mote — the adversary that
// hasn't arrived yet, already in frame.
const PARTICLE_COLORS = [
  "#38BDF8",
  "#0EA5E9",
  "#22D3EE",
  "#60A5FA",
  "#EF4444",
];

export function NewHomeHero(): ReactElement {
  const { handleTryDemo } = useTryDemo();

  return (
    <>
      <section className="relative flex h-[28rem] w-full flex-col items-center justify-center overflow-hidden bg-background md:h-[42rem]">
        <div className="relative z-20 mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 font-medium text-muted-foreground text-sm">
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
          Autonomous defense for the Cogni DAO
        </div>

        {/* Hero Title with Sparkles */}
        <h1 className="relative z-20 max-w-4xl text-balance px-4 text-center font-bold text-3xl text-foreground md:text-5xl lg:text-6xl">
          The DAO never sleeps.{" "}
          <span className="relative inline-block text-gradient-accent">
            Neither does its defense
            {/* Sparkles Effect Container */}
            <div className="absolute top-full left-0 h-28 w-full md:h-40">
              {/* Gradients */}
              {/* eslint-disable-next-line ui-governance/no-raw-colors, ui-governance/no-arbitrary-non-token-values */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-sky-500 blur-sm [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />
              {/* eslint-disable-next-line ui-governance/no-raw-colors */}
              <div className="absolute top-0 left-0 h-px w-full bg-sky-500 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />
              {/* eslint-disable-next-line ui-governance/no-raw-colors, ui-governance/no-arbitrary-non-token-values */}
              <div className="absolute top-0 left-0 h-[5px] w-full bg-cyan-400 blur-sm [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />
              {/* eslint-disable-next-line ui-governance/no-raw-colors */}
              <div className="absolute top-0 left-0 h-px w-full bg-cyan-400 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />

              {/* Core component - Mobile */}
              <SparklesCore
                id="tsparticles-mobile"
                background="transparent"
                minSize={0.1}
                maxSize={0.9}
                particleDensity={4000}
                className="h-full w-full md:hidden"
                particleColor={PARTICLE_COLORS}
              />

              {/* Core component - Desktop */}
              <SparklesCore
                id="tsparticles-desktop"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="hidden h-full w-full md:block"
                particleColor={PARTICLE_COLORS}
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(250px_100px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
            </div>
          </span>
          .
        </h1>

        {/* Content Below Sparkles */}
        <div className="relative z-20 mx-auto mt-24 max-w-7xl px-4 sm:px-6 md:mt-44">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
              A non-stop, AI-run blue team for the Cogni collective —
              continuously evaluating, hardening, and improving the node-template
              and every node in the network. Nearly all of our code is
              AI-generated. So is the watch over it.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
                  Read the playbook
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link
                  href="https://discord.gg/3b9sSyhZ4z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 127.14 96.36"
                    fill="currentColor"
                    className="mr-2 size-4"
                    aria-hidden="true"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  Join the war room
                </Link>
              </Button>
            </div>

            <p className="mt-8 font-mono text-muted-foreground/70 text-sm uppercase tracking-widest">
              No red team yet. We&apos;re ready anyway.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
