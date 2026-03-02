export type RiskLevel = 'critical' | 'high' | 'medium';

export interface Cell {
  id: string;
  name: string;
  shortName: string;
  role: string;
  version: string;
  riskLevel: RiskLevel;
  color: string;       // tailwind color token
  hexColor: string;    // raw hex for SVG
  inputs: string[];
  outputs: string[];
  description: string;
  owner: string;
}

export interface ArtifactEdge {
  from: string;
  to: string;
  artifacts: string[];
}

export const CELLS: Cell[] = [
  {
    id: 'vanguard',
    name: 'Defense Market Vanguard',
    shortName: 'Vanguard',
    role: 'Growth & Strategy',
    version: '1.0.0',
    riskLevel: 'medium',
    color: 'vanguard',
    hexColor: '#f59e0b',
    owner: 'business-development',
    description: 'Orchestrates go-to-market for autonomous defense systems in the Middle East (Saudi/UAE). Translates stakeholder demand into measurable requirements with export-control constraints.',
    inputs: ['regional_intelligence', 'customer_signals', 'technical_capabilities'],
    outputs: ['market_requirements_doc', 'mission_conops_v1', 'capture_strategy_deck'],
  },
  {
    id: 'architect',
    name: 'Mission Systems Architect',
    shortName: 'Architect',
    role: 'Mission Systems & Flight Sciences',
    version: '2.0.0',
    riskLevel: 'critical',
    color: 'architect',
    hexColor: '#3b82f6',
    owner: 'flight-sciences',
    description: 'Defines integrated aircraft architecture: aerodynamics, comms, compute, sensors, power. Balances SWaP-C. Flight Sciences veto on all architecture decisions is binding.',
    inputs: ['market_requirements_doc', 'mission_conops_v1', 'constraints_export_control_v1'],
    outputs: ['architecture_spec_v1', 'power_budget_v1', 'rf_link_budget_v1', 'interface_control_doc_v1'],
  },
  {
    id: 'foundry',
    name: 'Avionics Foundry Engineering',
    shortName: 'Foundry',
    role: 'Electrical / Avionics / PCB Engineering',
    version: '3.1.0',
    riskLevel: 'high',
    color: 'foundry',
    hexColor: '#f97316',
    owner: 'hardware-engineering',
    description: 'Executes HV/LV electronics, PCB layout, harnessing, and firmware bring-up. Converts architecture specs into manufacturable, testable hardware at 270V bus.',
    inputs: ['architecture_spec_v1', 'power_budget_v1', 'interface_control_doc_v1'],
    outputs: ['pcb_fabrication_pack_v1', 'bringup_firmware_v1', 'prototype_build_record_v1'],
  },
  {
    id: 'assurance',
    name: 'System Assurance Core',
    shortName: 'Assurance',
    role: 'Test / Lab / Failure Analysis',
    version: '1.1.0',
    riskLevel: 'medium',
    color: 'assurance',
    hexColor: '#22c55e',
    owner: 'reliability-ops',
    description: 'Validates reality against theory. Runs qualification, performs failure analysis, enforces lab discipline. Produces sign-off or blocks release with mechanistic root-cause requirements.',
    inputs: ['prototype_hardware', 'pcb_fabrication_pack_v1', 'bringup_firmware_v1'],
    outputs: ['test_validation_report_v1', 'root_cause_analysis_v1', 'bug_report_v1', 'validation_signoff'],
  },
  {
    id: 'lab',
    name: 'Chief Horizon Lab Engineer',
    shortName: 'Lab Engineer',
    role: 'Laboratory Authority',
    version: '1.0.0',
    riskLevel: 'high',
    color: 'lab',
    hexColor: '#a855f7',
    owner: 'reliability-ops',
    description: 'Owns the laboratory as a verification instrument. Builds/maintains HIL + bench infrastructure, enforces calibration/ESD/HV safety (270V). Can block G3 and G4 for insufficient evidence.',
    inputs: ['pcb_fabrication_pack_v1', 'bringup_firmware_v1', 'architecture_spec_v1', 'interface_control_doc_v1', 'test_request'],
    outputs: ['hil_rig_definition_v1', 'lab_calibration_log_v1', 'lab_safety_checklist_v1', 'test_procedure_v1', 'test_validation_report_v1'],
  },
];

export const ARTIFACT_EDGES: ArtifactEdge[] = [
  {
    from: 'vanguard',
    to: 'architect',
    artifacts: ['market_requirements_doc', 'mission_conops_v1', 'constraints_export_control_v1'],
  },
  {
    from: 'architect',
    to: 'foundry',
    artifacts: ['architecture_spec_v1', 'power_budget_v1', 'interface_control_doc_v1'],
  },
  {
    from: 'architect',
    to: 'assurance',
    artifacts: ['architecture_spec_v1', 'rf_link_budget_v1', 'interface_control_doc_v1'],
  },
  {
    from: 'foundry',
    to: 'assurance',
    artifacts: ['pcb_fabrication_pack_v1', 'bringup_firmware_v1', 'prototype_build_record_v1'],
  },
  {
    from: 'assurance',
    to: 'vanguard',
    artifacts: ['validated_claims_sheet_v1', 'capture_strategy_deck'],
  },
  {
    from: 'assurance',
    to: 'architect',
    artifacts: ['test_validation_report_v1', 'bug_report_v1'],
  },
  {
    from: 'assurance',
    to: 'foundry',
    artifacts: ['bug_report_v1', 'root_cause_analysis_v1'],
  },
];

export const GATES = [
  {
    id: 'G1',
    name: 'Architecture Gate',
    description: 'ICD + budgets issued before fabrication begins.',
    authority: 'Mission Systems Architect',
    unlocksAtStep: 1, // step index (0-based)
  },
  {
    id: 'G2',
    name: 'Fabrication Gate',
    description: 'DFM + library checks completed before ordering.',
    authority: 'Avionics Foundry Engineering',
    unlocksAtStep: 2,
  },
  {
    id: 'G3',
    name: 'Validation Gate',
    description: 'Validation signoff required before claims are published.',
    authority: 'Chief Horizon Lab Engineer',
    unlocksAtStep: 4,
    blockedAtStep: 4, // FAIL at this step blocks it
  },
  {
    id: 'G4',
    name: 'Claims Gate',
    description: 'Every claim must include evidence_ref + test_run_id + artifact_hash (SHA-256).',
    authority: 'System Assurance Core',
    blockedAtStep: 7,
  },
];
