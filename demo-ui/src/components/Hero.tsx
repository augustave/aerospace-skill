import { Shield, Zap, GitBranch, CheckCircle } from 'lucide-react';

const domainTags = [
  'Autonomy', 'Aerospace', 'Defense', 'Avionics',
  'Mission Systems', 'Reliability', 'Business Development',
];

const stats = [
  { icon: Shield, label: 'Export Controlled', sub: 'EAR / ITAR / FCPA' },
  { icon: GitBranch, label: '5 AI Skill Cells', sub: 'Hierarchical Swarm' },
  { icon: Zap, label: '4 Enforcement Gates', sub: 'G1 → G2 → G3 → G4' },
  { icon: CheckCircle, label: 'Cryptographic Claims', sub: 'SHA-256 artifact hashes' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Overline */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-amber-400" />
          <span className="text-amber-400 text-xs font-mono tracking-widest uppercase">
            Defense-Grade AI Swarm · v1.1.0
          </span>
          <div className="w-8 h-px bg-amber-400" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          <span className="text-gradient-defense">
            Autonomous Aerospace
          </span>
          <br />
          <span className="text-slate-100">Collective</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-400 font-mono mb-6">
          Design&nbsp;·&nbsp;Build&nbsp;·&nbsp;Validate&nbsp;·&nbsp;Deploy
        </p>

        {/* Mission statement */}
        <p className="text-slate-300 max-w-2xl text-lg mb-8 leading-relaxed">
          A hierarchical swarm of AI skill-cells that collaboratively designs, builds,
          and validates intelligent autonomous aircraft under high-assurance constraints —
          from market requirements to validated flight hardware.
        </p>

        {/* Domain tags */}
        <div className="flex flex-wrap gap-2 mb-14">
          {domainTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono border border-slate-700 text-slate-400 bg-slate-800/50 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors"
            >
              <Icon className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-slate-100 text-sm font-semibold">{label}</div>
                <div className="text-slate-500 text-xs font-mono">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
