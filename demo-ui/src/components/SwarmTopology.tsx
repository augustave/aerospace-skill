import { useState } from 'react';
import { CELLS, GATES } from '../data/swarm';

interface TooltipProps {
  cell: typeof CELLS[0];
  x: number;
  y: number;
}

function CellTooltip({ cell, x, y }: TooltipProps) {
  const isRight = x > 600;
  return (
    <foreignObject
      x={isRight ? x - 260 : x + 60}
      y={y - 20}
      width="240"
      height="200"
    >
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-xs shadow-xl">
        <div className="font-semibold text-slate-100 mb-1">{cell.name}</div>
        <div className="text-slate-400 mb-2 text-[10px]">{cell.version} · {cell.owner}</div>
        <div className="mb-1">
          <span className="text-slate-500">OUTPUTS: </span>
          {cell.outputs.slice(0, 3).map(o => (
            <span key={o} className="text-green-400 font-mono text-[9px] mr-1">{o}</span>
          ))}
        </div>
        <div>
          <span className="text-slate-500">INPUTS: </span>
          {cell.inputs.slice(0, 3).map(i => (
            <span key={i} className="text-blue-400 font-mono text-[9px] mr-1">{i}</span>
          ))}
        </div>
        <p className="text-slate-400 mt-2 leading-relaxed text-[10px]">{cell.description.slice(0, 120)}…</p>
      </div>
    </foreignObject>
  );
}

// Cell node positions in the SVG (800×440)
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  vanguard: { x: 120, y: 200 },
  architect: { x: 330, y: 130 },
  foundry: { x: 540, y: 200 },
  assurance: { x: 540, y: 310 },
  lab: { x: 680, y: 390 },
};

const RISK_BORDER: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#94a3b8',
};

interface CellNodeProps {
  cell: typeof CELLS[0];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function CellNode({ cell, isHovered, onEnter, onLeave }: CellNodeProps) {
  const pos = NODE_POSITIONS[cell.id];
  const riskColor = RISK_BORDER[cell.riskLevel];
  const W = 130, H = 72;

  return (
    <g
      transform={`translate(${pos.x - W / 2},${pos.y - H / 2})`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow */}
      {isHovered && (
        <rect
          x={-4} y={-4} width={W + 8} height={H + 8}
          rx={12}
          fill="none"
          stroke={cell.hexColor}
          strokeWidth={2}
          opacity={0.4}
        />
      )}
      {/* Card body */}
      <rect
        x={0} y={0} width={W} height={H}
        rx={8}
        fill="#1e293b"
        stroke={isHovered ? cell.hexColor : riskColor}
        strokeWidth={isHovered ? 2 : 1}
        opacity={isHovered ? 1 : 0.7}
      />
      {/* Color accent bar */}
      <rect x={0} y={0} width={W} height={4} rx={8} fill={cell.hexColor} />
      <rect x={0} y={4} width={W} height={4} fill={cell.hexColor} opacity={0.4} />

      {/* Short name */}
      <text x={W / 2} y={32} textAnchor="middle" fill="#f1f5f9" fontSize={11} fontWeight="700">
        {cell.shortName}
      </text>
      {/* Role */}
      <text x={W / 2} y={46} textAnchor="middle" fill="#94a3b8" fontSize={8.5}>
        {cell.role}
      </text>
      {/* Version */}
      <text x={W / 2} y={60} textAnchor="middle" fill={cell.hexColor} fontSize={8} fontFamily="monospace">
        v{cell.version}
      </text>

      {isHovered && (
        <CellTooltip cell={cell} x={pos.x} y={pos.y} />
      )}
    </g>
  );
}

// Artifact flow arrow between two nodes
interface FlowArrowProps {
  fromId: string;
  toId: string;
  label: string;
  color: string;
  offset?: number;
}

function FlowArrow({ fromId, toId, label, color, offset = 0 }: FlowArrowProps) {
  const from = NODE_POSITIONS[fromId];
  const to = NODE_POSITIONS[toId];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  const ox = -ny * offset, oy = nx * offset;

  const x1 = from.x + nx * 68 + ox;
  const y1 = from.y + ny * 38 + oy;
  const x2 = to.x - nx * 68 + ox;
  const y2 = to.y - ny * 38 + oy;
  const mx = (x1 + x2) / 2 + ox;
  const my = (y1 + y2) / 2 + oy;

  const id = `arrow-${fromId}-${toId}-${offset}`;

  return (
    <g>
      <defs>
        <marker id={id} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={color} opacity={0.8} />
        </marker>
      </defs>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="6 3"
        markerEnd={`url(#${id})`}
        opacity={0.6}
        className="artifact-flow-line"
      />
      {/* Label */}
      <text x={mx} y={my - 6} textAnchor="middle" fill={color} fontSize={7.5} fontFamily="monospace" opacity={0.85}>
        {label}
      </text>
    </g>
  );
}

export function SwarmTopology() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Architecture</span>
        <h2 className="text-3xl font-bold text-slate-100 mt-1">Swarm Topology</h2>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Five specialized AI cells operate in a governed pipeline. Artifacts flow through
          typed contracts between cells — no cell can skip a gate or publish claims without
          validated evidence.
        </p>
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4 overflow-x-auto">
        <svg viewBox="0 0 820 460" className="w-full max-w-4xl mx-auto" style={{ minWidth: 480 }}>
          {/* Background grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="820" height="460" fill="url(#grid)" opacity={0.5} />

          {/* Artifact flow arrows */}
          <FlowArrow fromId="vanguard" toId="architect" label="requirements" color="#f59e0b" />
          <FlowArrow fromId="architect" toId="foundry" label="arch_spec + budgets" color="#3b82f6" />
          <FlowArrow fromId="architect" toId="assurance" label="ICD + rf_budget" color="#3b82f6" offset={12} />
          <FlowArrow fromId="foundry" toId="assurance" label="pcb_pack + firmware" color="#f97316" />
          <FlowArrow fromId="assurance" toId="vanguard" label="validated_claims" color="#22c55e" offset={-15} />
          <FlowArrow fromId="assurance" toId="architect" label="bug_report" color="#ef4444" offset={-12} />
          <FlowArrow fromId="assurance" toId="foundry" label="rca + bugs" color="#ef4444" offset={15} />
          <FlowArrow fromId="foundry" toId="lab" label="pcb + firmware" color="#a855f7" />

          {/* Gate markers */}
          {[
            { x: 225, y: 140, label: 'G1', color: '#3b82f6' },
            { x: 434, y: 168, label: 'G2', color: '#f97316' },
            { x: 540, y: 262, label: 'G3', color: '#22c55e' },
            { x: 207, y: 230, label: 'G4', color: '#f59e0b' },
          ].map(({ x, y, label, color }) => (
            <g key={label}>
              <circle cx={x} cy={y} r={12} fill="#0f172a" stroke={color} strokeWidth={1.5} />
              <text x={x} y={y + 4} textAnchor="middle" fill={color} fontSize={9} fontWeight="700" fontFamily="monospace">
                {label}
              </text>
            </g>
          ))}

          {/* Cell nodes */}
          {CELLS.map((cell) => (
            <CellNode
              key={cell.id}
              cell={cell}
              isHovered={hoveredCell === cell.id}
              onEnter={() => setHoveredCell(cell.id)}
              onLeave={() => setHoveredCell(null)}
            />
          ))}

          {/* Legend */}
          <g transform="translate(16, 16)">
            <rect width="170" height="80" rx="6" fill="#0f172a" stroke="#1e293b" />
            <text x="10" y="18" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="700">RISK LEVEL</text>
            {[
              { color: '#ef4444', label: 'Critical' },
              { color: '#f97316', label: 'High' },
              { color: '#94a3b8', label: 'Medium' },
            ].map(({ color, label }, i) => (
              <g key={label} transform={`translate(10, ${28 + i * 16})`}>
                <rect width="12" height="8" rx="2" fill={color} opacity={0.7} />
                <text x="18" y="7" fill="#94a3b8" fontSize="8">{label}</text>
              </g>
            ))}
            <text x="10" y="76" fill="#475569" fontSize="7">Hover cell for details</text>
          </g>
        </svg>
      </div>

      {/* Gate descriptions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {GATES.map((gate) => (
          <div key={gate.id} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-blue-400">{gate.id}</span>
              <span className="text-xs text-slate-300 font-semibold">{gate.name}</span>
            </div>
            <p className="text-xs text-slate-500">{gate.description}</p>
            <div className="text-[10px] text-slate-600 font-mono mt-1">Authority: {gate.authority}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
