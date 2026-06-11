// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/BlueOpsSection`
 * Purpose: Homepage section describing cogni/blue's operating loop — the
 *   continuous evaluate → harden → improve cycle the node runs over the
 *   node-template and the rest of the network.
 * Scope: Homepage only. Static, no data fetching.
 * Invariants: Token-driven colors only; responsive grid.
 * Side-effects: none
 * Links: src/app/(public)/page.tsx
 * @public
 */

import { ArrowRight, ScanSearch, ShieldCheck, Wrench } from "lucide-react";
import type { ReactElement } from "react";

interface OpsStep {
  icon: typeof ScanSearch;
  title: string;
  body: string;
}

const STEPS: OpsStep[] = [
  {
    icon: ScanSearch,
    title: "Evaluate",
    body: "Read every node like an attacker would. Probe prompts, tools, contracts, and AI-written code for the weakness that ships silently.",
  },
  {
    icon: Wrench,
    title: "Harden",
    body: "Turn each finding into a fix or a guardrail — patches, gates, and rules that land in the node-template so the whole network inherits the defense.",
  },
  {
    icon: ShieldCheck,
    title: "Improve",
    body: "Re-test, measure, repeat. Every loop raises the floor for the next red-team move — and the next AI-generated commit.",
  },
];

export function BlueOpsSection(): ReactElement {
  return (
    <section className="w-full border-border border-t bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            One loop, running forever
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nearly all Cogni code is AI-generated — which means it is fast,
            plentiful, and quietly vulnerable. Blue closes that gap on a loop
            that never stops.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card/40 p-8"
            >
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="flex items-center gap-2 font-semibold text-foreground text-xl">
                <span className="font-mono text-muted-foreground/60 text-sm">
                  0{i + 1}
                </span>
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex items-center justify-center gap-3 text-muted-foreground text-sm">
          <span className="font-mono uppercase tracking-widest">
            Blue team
          </span>
          <ArrowRight className="size-4 text-primary" aria-hidden="true" />
          <span className="font-mono uppercase tracking-widest">
            Red team — coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
