import { Shield, Zap, Globe, TrendingUp, Lock, RotateCcw } from 'lucide-react';

const IMPLICATIONS = [
  {
    icon: Shield,
    color: '#3b82f6',
    title: 'Procurement & Compliance',
    subtitle: 'Defense Acquisition Readiness',
    bullets: [
      'Complete artifact audit trail from requirement to evidence — every claim is traceable',
      'SHA-256 artifact hashes provide cryptographic tamper evidence for all test reports',
      'Export control constraints (EAR/ITAR/FCPA) baked in at requirements stage — not bolted on later',
      'Gate authority is documented and role-specific — auditors know exactly who signed off what',
      'Procurement officers can point to a specific test_run_id to verify any published specification',
    ],
  },
  {
    icon: Zap,
    color: '#f59e0b',
    title: 'Engineering Velocity',
    subtitle: 'Parallel Cells, Closed-Loop Feedback',
    bullets: [
      'Foundry and Assurance run concurrently after G1 — architecture unlocks parallel execution',
      'Failures loop back with mechanistic root cause, giving engineers a precise, actionable fix',
      'No wasted effort: "no random glitch closure" prevents re-testing until the problem disappears',
      'Automation trigger: any test run more than twice must be scripted — removes human variability',
      'Typed artifact contracts mean cells can evolve independently without breaking downstream consumers',
    ],
  },
  {
    icon: Globe,
    color: '#a855f7',
    title: 'Scale & Reliability',
    subtitle: 'From Prototype to Fleet',
    bullets: [
      'MOSA discipline (modular, documented, versioned interfaces) enables component swap without full redesign',
      'Hierarchical topology supports submodule specialization (Chief Lab Engineer = lab authority submodule)',
      'Validated claims sheet becomes the product datasheet — built from evidence, not marketing copy',
      'Every test run stores environment snapshot + config ref → enables exact reproduction years later',
      'CI gate checker (validate_swarm.py) runs on every commit — schema violations caught before review',
    ],
  },
];

const SECOND_ORDER = [
  {
    icon: TrendingUp,
    title: 'Competitive Moat',
    text: 'The evidence infrastructure is itself a moat. Competitors selling on specs alone cannot produce an auditable claim lineage. Defense customers increasingly require this.',
  },
  {
    icon: Lock,
    title: 'Risk Containment',
    text: 'The thermal failure was caught before a prototype flew. The ESR root cause prevented a fleet-level rework. Each gate is a firewall against downstream cost amplification.',
  },
  {
    icon: RotateCcw,
    title: 'Institutional Memory',
    text: 'Every bug report, RCA, and test run is a permanent artifact. When the team scales, new engineers inherit a complete history — not tribal knowledge.',
  },
];

export function ImplicationsPanel() {
  return (
    <section className="bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Analysis</span>
          <h2 className="text-3xl font-bold text-slate-100 mt-1">Implications</h2>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            What this architecture means for defense procurement, engineering teams, and
            the long-term program health of autonomous aircraft at scale.
          </p>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {IMPLICATIONS.map(({ icon: Icon, color, title, subtitle, bullets }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color + '18', border: `1px solid ${color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-slate-100 font-bold text-base">{title}</h3>
                  <div className="text-xs font-mono mt-0.5" style={{ color }}>{subtitle}</div>
                </div>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-slate-400 leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Second-order effects */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-300 mb-4 font-mono">
            <span className="text-slate-600 mr-2">//</span>
            Second-Order Effects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SECOND_ORDER.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-300">{title}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 70%)',
            }}
          />
          <blockquote className="relative text-lg text-slate-300 font-light italic max-w-3xl mx-auto">
            "A defense program is only as trustworthy as its evidence chain. This swarm doesn't just build
            autonomous aircraft — it builds the audit trail that makes those aircraft credible to
            operators, regulators, and procurement officers."
          </blockquote>
          <div className="mt-4 text-xs font-mono text-slate-600">
            autonomous-aerospace-collective · v1.1.0 · High-Assurance / Export-Controlled
          </div>
        </div>
      </div>
    </section>
  );
}
