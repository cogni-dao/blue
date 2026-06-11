// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/BlueOpsSection`
 * Purpose: Homepage section framing cogni/blue's operating loop in real
 *   blue-team terms — detect (monitoring + detection engineering), hunt
 *   (hypothesis-driven threat hunting), harden (push fixes into the template).
 * Scope: Homepage only. Static, no data fetching.
 * Invariants: Token-driven colors only; responsive grid.
 * Side-effects: none
 * Links: src/app/(public)/page.tsx
 * @public
 */

import { Crosshair, Radar, ShieldCheck } from "lucide-react";
import type { ReactElement } from "react";

interface OpsStep {
  icon: typeof Radar;
  title: string;
  body: string;
}

const STEPS: OpsStep[] = [
  {
    icon: Radar,
    title: "Detect",
    body: "Continuous monitoring and detection engineering on every node — surface indicators of compromise before they spread.",
  },
  {
    icon: Crosshair,
    title: "Hunt",
    body: "Hypothesis-driven threat hunting through AI-written code: assume breach, chase the weakness an attacker reaches for, map it to MITRE ATT&CK.",
  },
  {
    icon: ShieldCheck,
    title: "Harden",
    body: "Every confirmed finding becomes a guardrail in the node-template — patched and gated, so the whole network inherits the fix.",
  },
];

export function BlueOpsSection(): ReactElement {
  return (
    <section className="w-full border-border border-t bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Defense on a loop
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nearly all Cogni code is machine-written — fast, plentiful, and
            quietly vulnerable. Blue never stops closing the gap.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card/40 p-7"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="flex items-baseline gap-2 font-semibold text-foreground text-xl">
                <span className="font-mono text-muted-foreground/50 text-sm">
                  0{i + 1}
                </span>
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex items-center justify-center gap-3 font-mono text-muted-foreground/70 text-xs uppercase tracking-widest">
          <span className="text-primary">Blue team: live</span>
          <span aria-hidden="true">//</span>
          <span>Red team: inbound</span>
        </div>
      </div>
    </section>
  );
}
