import { FileText, FileJson, FileSpreadsheet, GitBranch, Hash } from 'lucide-react';
import type { Artifact } from '../data/caseStudy';

const TYPE_ICONS: Record<string, typeof FileText> = {
  json: FileJson,
  markdown: FileText,
  csv: FileSpreadsheet,
  ref: GitBranch,
  boolean: FileText,
};

const STATUS_STYLES: Record<string, string> = {
  produced: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  pass: 'bg-green-500/20 text-green-400 border-green-500/30',
  fail: 'bg-red-500/20 text-red-400 border-red-500/30',
  blocked: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const STATUS_BORDER: Record<string, string> = {
  produced: 'border-slate-700',
  pass: 'border-green-500/40',
  fail: 'border-red-500/60',
  blocked: 'border-orange-500/60',
};

interface Props {
  artifacts: Artifact[];
}

export function ArtifactInspector({ artifacts }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {artifacts.map((artifact) => {
        const Icon = TYPE_ICONS[artifact.type] ?? FileText;
        const statusClass = STATUS_STYLES[artifact.status] ?? STATUS_STYLES.produced;
        const borderClass = STATUS_BORDER[artifact.status] ?? STATUS_BORDER.produced;
        const isFail = artifact.status === 'fail' || artifact.status === 'blocked';

        return (
          <div
            key={artifact.name}
            className={`terminal-card border ${borderClass} ${isFail ? 'animate-pulse-fail' : ''}`}
          >
            {/* Terminal header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2 min-w-0">
                {/* Traffic lights */}
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-300 text-xs font-mono truncate">{artifact.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${statusClass}`}>
                  {artifact.status.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-600 border border-slate-700 px-1.5 py-0.5 rounded">
                  {artifact.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <pre className="p-4 text-slate-300 overflow-x-auto whitespace-pre-wrap break-words leading-relaxed text-[11px]">
              {artifact.content}
            </pre>

            {/* Hash footer */}
            {artifact.hash && (
              <div className="border-t border-slate-800 px-4 py-2 flex items-center gap-2">
                <Hash className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="text-[10px] font-mono text-slate-600 truncate">{artifact.hash}</span>
                <span className="text-[10px] text-slate-700 ml-auto shrink-0">tamper-evident</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
