import { useState } from 'react';
import './index.css';
import { Hero } from './components/Hero';
import { SwarmTopology } from './components/SwarmTopology';
import { CaseStudyWalkthrough } from './components/CaseStudyWalkthrough';
import { GateConsole } from './components/GateConsole';
import { ClaimsRegistry } from './components/ClaimsRegistry';
import { ImplicationsPanel } from './components/ImplicationsPanel';

const NAV_LINKS = [
  { href: '#topology', label: 'Topology' },
  { href: '#case-study', label: 'Case Study' },
  { href: '#gates', label: 'Gate Console' },
  { href: '#claims', label: 'Claims Registry' },
  { href: '#implications', label: 'Implications' },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase">
          AAC <span className="text-amber-400">·</span> Demo
        </span>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors hidden md:block"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-500">ACTIVE</span>
        </div>
      </div>
    </nav>
  );
}

function SectionDivider({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-12" />;
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs font-mono text-slate-600">
          autonomous-aerospace-collective · v1.1.0 · High-Assurance / Export-Controlled
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-700">
          <span>EAR/ITAR Compliant</span>
          <span>·</span>
          <span>MOSA Disciplined</span>
          <span>·</span>
          <span>DO-178C / DO-254</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <Hero />

      <SectionDivider id="topology" />
      <SwarmTopology />

      <SectionDivider id="case-study" />
      <CaseStudyWalkthrough currentStep={currentStep} onStep={setCurrentStep} />

      <SectionDivider id="gates" />
      <GateConsole currentStep={currentStep} />

      <SectionDivider id="claims" />
      <ClaimsRegistry />

      <SectionDivider id="implications" />
      <ImplicationsPanel />

      <Footer />
    </div>
  );
}
