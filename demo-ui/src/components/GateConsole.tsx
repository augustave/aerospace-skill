import { CheckCircle2, XCircle, Clock, Lock, ShieldAlert } from 'lucide-react';
import { GATES } from '../data/swarm';

type GateStatus = 'not-reached' | 'pending' | 'pass' | 'fail' | 'blocked';

function getGateStatus(gateIndex: number, currentStep: number): GateStatus {
  // G1 passes at step 1 (index 1)
  // G2 passes at step 2
  // G3 fails at step 4 (thermal FAIL)
  // G4 blocked at step 7 (claims blocked)
  const thresholds: Record<number, { passAt?: number; failAt?: number; blockedAt?: number }> = {
    0: { passAt: 1 },   // G1
    1: { passAt: 2 },   // G2
    2: { failAt: 4 },   // G3
    3: { blockedAt: 7 }, // G4
  };

  const cfg = thresholds[gateIndex];
  if (!cfg) return 'not-reached';

  if (cfg.blockedAt !== undefined && currentStep >= cfg.blockedAt) return 'blocked';
  if (cfg.failAt !== undefined && currentStep >= cfg.failAt) return 'fail';
  if (cfg.passAt !== undefined && currentStep >= cfg.passAt) return 'pass';
  if (currentStep >= (cfg.passAt ?? cfg.failAt ?? cfg.blockedAt ?? 99) - 1) return 'pending';
  return 'not-reached';
}

const STATUS_CONFIG: Record<GateStatus, {
  icon: typeof CheckCircle2;
  label: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
}> = {
  'not-reached': {
    icon: Clock,
    label: 'NOT REACHED',
    textColor: 'text-slate-500',
    borderColor: 'border-slate-700',
    bgColor: 'bg-slate-800/30',
  },
  pending: {
    icon: Clock,
    label: 'PENDING',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
  },
  pass: {
    icon: CheckCircle2,
    label: 'PASS',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/40',
    bgColor: 'bg-green-500/10',
  },
  fail: {
    icon: XCircle,
    label: 'FAIL',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/50',
    bgColor: 'bg-red-500/10',
  },
  blocked: {
    icon: Lock,
    label: 'BLOCKED',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    bgColor: 'bg-orange-500/10',
  },
};

const GATE_COLORS = ['#3b82f6', '#f97316', '#22c55e', '#f59e0b'];

interface Props {
  currentStep: number;
}

export function GateConsole({ currentStep }: Props) {
  return (
    <section className="bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Enforcement</span>
            <h2 className="text-3xl font-bold text-slate-100 mt-1">Gate Console</h2>
            <p className="text-slate-400 mt-2">
              Gate status updates as you step through the case study above.
              No cell can proceed without the prior gate passing.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldAlert className="w-4 h-4" />
            <span className="font-mono">Step {currentStep + 1} / 8</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {GATES.map((gate, i) => {
            const status = getGateStatus(i, currentStep);
            const cfg = STATUS_CONFIG[status];
            const StatusIcon = cfg.icon;
            const gateColor = GATE_COLORS[i];

            return (
              <div
                key={gate.id}
                className={`rounded-xl border p-5 transition-all ${cfg.bgColor} ${cfg.borderColor}`}
              >
                {/* Gate ID */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono border"
                    style={{
                      color: gateColor,
                      borderColor: gateColor + '50',
                      backgroundColor: gateColor + '15',
                    }}
                  >
                    {gate.id}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-mono font-bold ${cfg.textColor}`}>
                    <StatusIcon className="w-4 h-4" />
                    {cfg.label}
                  </div>
                </div>

                <h3 className="text-slate-100 font-semibold text-sm mb-1">{gate.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{gate.description}</p>
                <div className="text-[10px] font-mono text-slate-600">
                  Authority: <span className="text-slate-500">{gate.authority}</span>
                </div>

                {/* Status bar */}
                <div className="mt-3 h-1 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: status === 'pass' ? '100%' : status === 'fail' || status === 'blocked' ? '100%' : status === 'pending' ? '50%' : '0%',
                      backgroundColor:
                        status === 'pass' ? '#22c55e'
                          : status === 'fail' ? '#ef4444'
                            : status === 'blocked' ? '#f97316'
                              : status === 'pending' ? '#f59e0b'
                                : '#334155',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Rule callout */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <ShieldAlert className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">Non-negotiable:</span>{' '}
            Failures require mechanistic root cause or remain open. There is no "random glitch closure" —
            a FAIL at G3 blocks all downstream gates until evidence of a true fix exists.
          </p>
        </div>
      </div>
    </section>
  );
}
