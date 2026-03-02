import { useState } from 'react';
import { ChevronDown, ChevronUp, Hash, FileText, TestTube2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { CLAIMS } from '../data/claims';

const STATUS_CONFIG = {
  PASS: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/15 border-green-500/30' },
  FAIL: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30' },
  BLOCKED: { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' },
  PENDING: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' },
};

export function ClaimsRegistry() {
  const [expanded, setExpanded] = useState<string | null>('C-001');

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Evidence Chain</span>
        <h2 className="text-3xl font-bold text-slate-100 mt-1">Claims Registry</h2>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Every capability claim must be traceable to a specific test run and a SHA-256 artifact hash.
          Claims with FAIL-linked evidence are automatically blocked from entering any proposal or datasheet.
        </p>
      </div>

      {/* Schema explainer */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
        {[
          { icon: FileText, label: 'evidence_ref', desc: 'Artifact file path' },
          { icon: TestTube2, label: 'test_run_id', desc: 'Unique run identifier' },
          { icon: Hash, label: 'artifact_hash', desc: 'SHA-256 tamper seal' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-mono text-blue-400">{label}</div>
              <div className="text-[10px] text-slate-500">{desc}</div>
            </div>
          </div>
        ))}
        <div className="ml-auto text-xs text-amber-400 font-mono self-center">
          All three required → G4 Claims Gate
        </div>
      </div>

      {/* Claims table */}
      <div className="rounded-xl border border-slate-700 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          <div className="col-span-1">ID</div>
          <div className="col-span-4">Claim</div>
          <div className="col-span-2">Metric</div>
          <div className="col-span-1">Threshold</div>
          <div className="col-span-2">Test Run</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1"></div>
        </div>

        {CLAIMS.map((claim) => {
          const cfg = STATUS_CONFIG[claim.status];
          const StatusIcon = cfg.icon;
          const isExpanded = expanded === claim.claim_id;

          return (
            <div key={claim.claim_id} className="border-b border-slate-700/50 last:border-0">
              {/* Row */}
              <button
                className="w-full grid grid-cols-12 gap-2 px-4 py-3.5 text-left hover:bg-slate-800/40 transition-colors group"
                onClick={() => setExpanded(isExpanded ? null : claim.claim_id)}
              >
                <div className="col-span-1 font-mono text-xs text-slate-400 font-bold self-center">
                  {claim.claim_id}
                </div>
                <div className="col-span-4 text-sm text-slate-300 self-center leading-tight">
                  {claim.claim_text}
                </div>
                <div className="col-span-2 font-mono text-xs text-blue-400 self-center">
                  {claim.metric}
                </div>
                <div className="col-span-1 font-mono text-xs text-slate-400 self-center">
                  {claim.threshold}
                </div>
                <div className="col-span-2 font-mono text-xs text-slate-500 self-center truncate">
                  {claim.test_run_id}
                </div>
                <div className="col-span-1 self-center">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cfg.bg} ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {claim.status}
                  </span>
                </div>
                <div className="col-span-1 self-center flex justify-end">
                  {isExpanded
                    ? <ChevronUp className="w-4 h-4 text-slate-500" />
                    : <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />}
                </div>
              </button>

              {/* Expanded evidence chain */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="bg-slate-900 rounded-xl border border-slate-700 p-4">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">
                      Evidence Chain
                    </div>

                    {/* Chain visualization */}
                    <div className="flex flex-col gap-0">
                      {[
                        {
                          icon: FileText,
                          label: 'Claim',
                          value: claim.claim_text,
                          sublabel: claim.claim_id,
                          color: '#f59e0b',
                        },
                        {
                          icon: TestTube2,
                          label: 'Test Run',
                          value: claim.test_run_id,
                          sublabel: 'run identifier',
                          color: '#3b82f6',
                        },
                        {
                          icon: FileText,
                          label: 'Evidence File',
                          value: claim.evidence_ref,
                          sublabel: 'artifact path',
                          color: '#a855f7',
                        },
                        {
                          icon: Hash,
                          label: 'Artifact Hash',
                          value: claim.artifact_hash,
                          sublabel: 'SHA-256 fingerprint',
                          color: '#22c55e',
                        },
                      ].map(({ icon: Icon, label, value, sublabel, color }, idx, arr) => (
                        <div key={label} className="flex gap-3">
                          {/* Left connector */}
                          <div className="flex flex-col items-center">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: color + '20', border: `1px solid ${color}40` }}
                            >
                              <Icon className="w-3.5 h-3.5" style={{ color }} />
                            </div>
                            {idx < arr.length - 1 && (
                              <div className="w-px flex-1 my-1" style={{ backgroundColor: color + '30', minHeight: 16 }} />
                            )}
                          </div>
                          {/* Content */}
                          <div className="pb-3">
                            <div className="text-[10px] font-mono uppercase tracking-wide" style={{ color }}>
                              {label}
                            </div>
                            <div className="text-xs text-slate-300 font-mono break-all">{value}</div>
                            <div className="text-[10px] text-slate-600">{sublabel}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Fail reason */}
                    {claim.linked_fail && (
                      <div className="mt-2 flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-red-400 font-mono">{claim.linked_fail}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rule note */}
      <p className="text-xs text-slate-600 font-mono mt-4 text-center">
        G4 Claims Gate (strict): evidence_ref + test_run_id + artifact_hash required for every claim •
        FAIL-linked claims are permanently blocked until a PASS re-test with new artifact_hash is produced
      </p>
    </section>
  );
}
