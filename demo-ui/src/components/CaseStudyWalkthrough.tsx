import { ChevronLeft, ChevronRight, AlertTriangle, Info, CheckCircle2, XCircle, Lock } from 'lucide-react';
import { CASE_STUDY_STEPS } from '../data/caseStudy';
import { CELLS } from '../data/swarm';
import { ArtifactInspector } from './ArtifactInspector';

const CELL_LABEL: Record<string, string> = Object.fromEntries(
  CELLS.map((c) => [c.id, c.shortName])
);

const CELL_HEX: Record<string, string> = Object.fromEntries(
  CELLS.map((c) => [c.id, c.hexColor])
);

const STATUS_CONFIG = {
  pass: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
  fail: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  blocked: { icon: Lock, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
};

interface Props {
  currentStep: number;
  onStep: (step: number) => void;
}

export function CaseStudyWalkthrough({ currentStep, onStep }: Props) {
  const step = CASE_STUDY_STEPS[currentStep];
  const cfg = STATUS_CONFIG[step.status];
  const StatusIcon = cfg.icon;
  const cellColor = CELL_HEX[step.cell] ?? '#94a3b8';
  const cellName = CELL_LABEL[step.cell] ?? step.cell;
  const isFail = step.status === 'fail' || step.status === 'blocked';

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Interactive Walkthrough</span>
        <h2 className="text-3xl font-bold text-slate-100 mt-1">Case Study: Hot-Day Thermal Failure</h2>
        <p className="text-slate-400 mt-2 max-w-2xl">
          UAE procurement requires operation at +50°C ambient. Step through the full swarm pipeline
          to see how the system detects, traces, and enforces accountability for a thermal failure
          before it reaches a customer proposal.
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {CASE_STUDY_STEPS.map((s, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          const isFail_ = s.status === 'fail' || s.status === 'blocked';
          return (
            <button
              key={i}
              onClick={() => onStep(i)}
              className="flex flex-col items-center group shrink-0"
              style={{ minWidth: 72 }}
            >
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      backgroundColor: isDone ? (isFail_ ? '#ef4444' : '#22c55e') : '#334155',
                    }}
                  />
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: isActive
                      ? (isFail_ ? '#ef4444' : CELL_HEX[s.cell] ?? '#64748b')
                      : isDone
                        ? (s.status === 'fail' || s.status === 'blocked' ? '#ef4444' : '#22c55e')
                        : '#334155',
                    backgroundColor: isActive
                      ? (isFail_ ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.15)')
                      : isDone
                        ? (s.status === 'fail' || s.status === 'blocked' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)')
                        : '#1e293b',
                    color: isActive
                      ? (isFail_ ? '#ef4444' : '#f1f5f9')
                      : isDone
                        ? (s.status === 'fail' || s.status === 'blocked' ? '#ef4444' : '#22c55e')
                        : '#64748b',
                  }}
                >
                  {i + 1}
                </div>
                {i < CASE_STUDY_STEPS.length - 1 && (
                  <div className="flex-1 h-px" style={{ backgroundColor: isDone ? '#22c55e' : '#334155' }} />
                )}
              </div>
              <span
                className="text-[9px] font-mono mt-1 text-center leading-tight px-1"
                style={{ color: isActive ? '#f1f5f9' : '#475569' }}
              >
                {CELL_LABEL[s.cell]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: narrative */}
        <div className="flex flex-col gap-4">
          {/* Header card */}
          <div
            className={`rounded-xl border p-5 ${isFail ? 'animate-pulse-fail' : ''}`}
            style={{ borderColor: isFail ? '#ef4444' : cellColor + '55', backgroundColor: '#1e293b' }}
          >
            {/* Cell badge */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                style={{ color: cellColor, backgroundColor: cellColor + '20', border: `1px solid ${cellColor}40` }}
              >
                {cellName}
              </span>
              <span className={`flex items-center gap-1.5 text-xs font-mono ${cfg.color}`}>
                <StatusIcon className="w-4 h-4" />
                {step.status.toUpperCase()}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-3">{step.title}</h3>

            {/* Alert banner for fail/blocked */}
            {step.alertText && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/15 border border-red-500/40 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-red-400 font-mono font-bold text-sm">{step.alertText}</span>
              </div>
            )}

            {/* Narrative */}
            <p className="text-slate-300 text-sm leading-relaxed">{step.narrative}</p>
          </div>

          {/* Implication card */}
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
            <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-2">Implication</div>
            <p className="text-slate-400 text-sm leading-relaxed">{step.implication}</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-slate-600 text-xs font-mono">
              {currentStep + 1} / {CASE_STUDY_STEPS.length}
            </span>
            <button
              onClick={() => onStep(Math.min(CASE_STUDY_STEPS.length - 1, currentStep + 1))}
              disabled={currentStep === CASE_STUDY_STEPS.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: artifact inspector */}
        <div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            Artifacts Produced
          </div>
          <ArtifactInspector artifacts={step.artifacts} />
        </div>
      </div>
    </section>
  );
}
