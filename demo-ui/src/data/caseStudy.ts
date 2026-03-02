export type StepStatus = 'pass' | 'fail' | 'blocked' | 'info';

export interface Artifact {
  name: string;
  type: 'json' | 'markdown' | 'csv' | 'ref' | 'boolean';
  status: 'produced' | 'pass' | 'fail' | 'blocked';
  content: string;
  hash?: string;
}

export interface CaseStudyStep {
  index: number;
  cell: string;           // cell id
  gateId?: string;        // gate triggered at this step
  title: string;
  narrative: string;
  implication: string;
  artifacts: Artifact[];
  status: StepStatus;
  alertText?: string;     // shown on fail/blocked
}

export const CASE_STUDY_STEPS: CaseStudyStep[] = [
  {
    index: 0,
    cell: 'vanguard',
    title: 'Step 1 — Requirements Capture (UAE Hot-Day Mission)',
    narrative:
      'The UAE Ministry of Defense issues a procurement signal for a long-range autonomous aircraft capable of operating at +50°C ambient. Vanguard translates this into a measurable requirement with export-control constraints. The market_requirements_doc is issued to Engineering.',
    implication:
      'Claims cannot be published until validated evidence exists. Vanguard is downstream of Assurance — it waits for the validated_claims_sheet before any capability claim appears in a capture deck.',
    status: 'info',
    artifacts: [
      {
        name: 'market_requirements_doc.md',
        type: 'markdown',
        status: 'produced',
        content: `# Market Requirements Document
version: 1.0.0
origin: UAE MoD Procurement Signal

## Key Requirements
- operating_temp_max_c: 50          # hot-day design constraint
- operating_range_km: 500
- payload_kg: 25
- link_type: encrypted_datalink
- compliance: EAR/ITAR, FCPA

## Acceptance Test Criteria
All thermal claims must be validated at 50°C ambient
with test_run_id + artifact_hash before inclusion in
any capture or proposal document.`,
      },
      {
        name: 'mission_conops_v1.md',
        type: 'markdown',
        status: 'produced',
        content: `# Mission CONOPS v1
environment: Arabian Peninsula (summer peak)
hot_day_ambient_c: 50
terrain: desert / coastal
launch_mode: ground_catapult
recovery: parachute_net`,
      },
    ],
  },
  {
    index: 1,
    cell: 'architect',
    gateId: 'G1',
    title: 'Step 2 — Architecture Design + G1 Gate PASS',
    narrative:
      'The Architect translates requirements into a concrete system architecture: 270V high-voltage bus, link budget, power budget, and ICD. The G1 Architecture Gate is passed — fabrication is now authorized to begin.',
    implication:
      'MOSA discipline ensures all interfaces are documented before any hardware is ordered. Modular interfaces mean individual subsystems can be swapped without redesigning the whole aircraft.',
    status: 'pass',
    artifacts: [
      {
        name: 'architecture_spec_v1.json',
        type: 'json',
        status: 'produced',
        content: `{
  "hv_bus_v": 270,
  "lv_bus_v": 28,
  "compute_platform": "rad-tolerant-SBC",
  "datalink": "encrypted_FHSS_900MHz",
  "sensor_suite": ["EO/IR", "SAR_aperture"],
  "airframe": "fixed_wing_composite",
  "mosa_compliant": true
}`,
      },
      {
        name: 'power_budget_v1.json',
        type: 'json',
        status: 'produced',
        content: `{
  "hot_day_c": 50,
  "hv_bus_draw_w": 3800,
  "lv_bus_draw_w": 420,
  "thermal_derating_margin": "TBD",
  "capacitor_spec_note": "ESR not yet validated at 50°C"
}`,
      },
    ],
  },
  {
    index: 2,
    cell: 'foundry',
    gateId: 'G2',
    title: 'Step 3 — PCB Fabrication + G2 Gate PASS',
    narrative:
      'Foundry executes the PCB design: HV bus circuits at 270V, power conversion, avionics harness. DFM checks pass, the fabrication pack is released, and firmware is brought up on prototype hardware. G2 Fabrication Gate is passed.',
    implication:
      'Component selection at this stage is critical — the capacitor specification is designed per datasheet values, but thermal derating at 50°C has not yet been empirically validated. This gap will surface at test.',
    status: 'pass',
    artifacts: [
      {
        name: 'prototype_build_record_v1.md',
        type: 'markdown',
        status: 'produced',
        content: `# Prototype Build Record v1
board_id: PCB-POWER-001-A
hv_bus_v: 270
capacitor_part: GRM31CR71H106KA12L
capacitor_esr_25c_mohm: 8
capacitor_esr_50c_mohm: NOT_MEASURED
dfm_check: PASS
assembly_date: 2026-02-10
assembler: Foundry-Lab-Team`,
      },
      {
        name: 'bringup_firmware_v1',
        type: 'ref',
        status: 'produced',
        content: `repo: avionics-firmware
ref: deadbeef
build_config: release_hw_rev_A
flash_ok: true
boot_verified: true`,
      },
    ],
  },
  {
    index: 3,
    cell: 'lab',
    title: 'Step 4 — Lab Infrastructure Ready (HIL + Safety)',
    narrative:
      'Chief Horizon Lab Engineer configures the HIL rig, verifies all instrumentation is within calibration, and signs off the ESD and HV safety checklist. The laboratory is now a qualified verification instrument.',
    implication:
      'Out-of-calibration equipment automatically invalidates test results — a non-negotiable. This prevents "random glitch closure": failures can only be closed with mechanistic root cause, not retested until they disappear.',
    status: 'pass',
    artifacts: [
      {
        name: 'hil_rig_definition_v1.md',
        type: 'markdown',
        status: 'produced',
        content: `rig_id: HIL-1
thermal_chamber: Tenney_TJR_Series
hv_load_bank: Ametek_RS_3000
oscilloscope: Tek_MSO64 (cal_due: 2026-06-01)
logic_analyzer: Saleae_Pro16 (cal_due: 2026-05-15)
dut: PCB-POWER-001-A + bringup_firmware_v1@deadbeef`,
      },
      {
        name: 'lab_calibration_log_v1.md',
        type: 'markdown',
        status: 'pass',
        content: `scope: calibrated
thermal_chamber_cert: CAL-2025-0892 (valid)
hv_load_bank_cert: CAL-2025-1103 (valid)
oscilloscope_cert: CAL-2025-1241 (valid)
all_instruments: IN_CAL`,
      },
      {
        name: 'lab_safety_checklist_v1.md',
        type: 'markdown',
        status: 'pass',
        content: `ESD: PASS
HV_interlocks: PASS (270V isolation confirmed)
PPE_verified: PASS
emergency_shutoff_test: PASS
buddy_system: ACTIVE`,
      },
    ],
  },
  {
    index: 4,
    cell: 'assurance',
    gateId: 'G3',
    title: 'Step 5 — Hot-Day Thermal Test → ⚠ FAIL',
    narrative:
      'The thermal chamber is set to +50°C. The 270V HV bus is loaded to flight-representative draw. Test run TR-2026-02-27-001 executes. The power conversion stage enters thermal derating at 47°C — voltage droops below spec before reaching the full 50°C target. Result: FAIL. G3 Validation Gate is blocked.',
    implication:
      'The test system catches this failure before it appears in a customer proposal or a delivered aircraft. The "no random glitch closure" rule means this failure cannot be dismissed — it stays open until a mechanistic root cause is identified and fixed.',
    status: 'fail',
    alertText: 'THERMAL DERATING FAILURE — G3 BLOCKED',
    artifacts: [
      {
        name: 'test_validation_report_v1.md',
        type: 'markdown',
        status: 'fail',
        content: `run_id: RUN-2026-02-27-001
test_run_id: TR-2026-02-27-001
environment: hot_day_c=50
config_refs:
  firmware: bringup_firmware_v1@deadbeef
  board: PCB-POWER-001-A
pass_fail: FAIL
failure_point_c: 47
failure_mode: voltage_droop_below_spec
evidence_refs:
  - demo/sample_outputs/test_validation_report_v1.md
artifact_hashes:
  - demo/sample_outputs/test_validation_report_v1.md: sha256:aaaa...aaaa
mechanism: Thermal derating`,
        hash: 'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    ],
  },
  {
    index: 5,
    cell: 'assurance',
    title: 'Step 6 — Root Cause Analysis: ESR Mechanism',
    narrative:
      "The Assurance team runs impedance spectroscopy on the failing capacitors. As junction temperature rises above 45°C, ESR (Equivalent Series Resistance) increases by 3.2×. The increased ESR causes voltage ripple that trips the protection circuit. Root cause is confirmed: the capacitor part was not specified for high-temperature operation.",
    implication:
      'Every failure requires a mechanistic root cause — not just "it failed at high temp." The ESR identification gives Engineering a precise actionable fix: replace capacitor with a low-ESR X7R/X5R ceramic rated to 85°C minimum.',
    status: 'info',
    artifacts: [
      {
        name: 'root_cause_analysis_v1.md',
        type: 'markdown',
        status: 'produced',
        content: `Mechanism: ESR (Equivalent Series Resistance)
---
component: GRM31CR61H106KA12L (X5R, rated 50°C max)
measurement:
  esr_25c_mohm: 8
  esr_47c_mohm: 26   # 3.2x increase
  esr_50c_mohm: 31   # exceeds power stage margin

effect: voltage ripple exceeds protection threshold
trigger_temp_c: 47
root_cause: capacitor_esr_not_rated_for_operating_temp

fix_required:
  - Replace with X7R or C0G dielectric, 85°C min
  - Re-run thermal test after component swap`,
      },
    ],
  },
  {
    index: 6,
    cell: 'foundry',
    title: 'Step 7 — Bug Report Issued → Redesign Loop',
    narrative:
      'A formal bug_report_v1 is issued to both Foundry and Architect. Foundry must select a replacement capacitor rated for ≥85°C with ESR < 10mΩ across the temperature range. Architect must update the power budget with thermal derating margins. The loop restarts at G2.',
    implication:
      "This feedback loop is the swarm's self-correction mechanism. The artifact trail — test_run_id, artifact_hash, root_cause_analysis — provides the engineering team with a precise, auditable path from symptom to fix, with no ambiguity about what failed, when, and why.",
    status: 'info',
    artifacts: [
      {
        name: 'bug_report_v1.md',
        type: 'markdown',
        status: 'produced',
        content: `bug_id: BUG-2026-002
Mechanism: thermal (ESR-driven voltage collapse)
test_run_id: TR-2026-02-27-001
severity: CRITICAL (blocks G3 + G4)

linked_rca: root_cause_analysis_v1.md
linked_test: test_validation_report_v1.md

action_required_foundry:
  - Replace capacitor: X7R/C0G, ESR < 10mΩ @ 50°C, 85°C rated
  - Re-spin PCB-POWER-001-B
  - Re-run thermal test

action_required_architect:
  - Update power_budget_v1: add ESR thermal margin field
  - Confirm capacitor spec in BOM against updated ICD`,
      },
    ],
  },
  {
    index: 7,
    cell: 'vanguard',
    gateId: 'G4',
    title: 'Step 8 — Claims Gate BLOCKED (G4 Enforcement)',
    narrative:
      'Vanguard cannot publish any "hot-day thermal capability" claim. The validated_claims_sheet shows C-001 (hot-day thermal) is linked to test run TR-2026-02-27-001 which returned FAIL. The G4 Claims Gate is blocked — no claim enters a proposal or datasheet without a PASS-linked artifact_hash.',
    implication:
      "This is the swarm's most important integrity guarantee: claims are cryptographically linked to evidence. A SHA-256 artifact hash makes every validated claim tamper-evident. Procurement officers and auditors can trace any published specification back to a specific test run and a specific file on disk.",
    status: 'blocked',
    alertText: 'G4 CLAIMS GATE BLOCKED — Evidence FAIL-linked',
    artifacts: [
      {
        name: 'validated_claims_sheet_v1.csv',
        type: 'csv',
        status: 'blocked',
        content: `claim_id,claim_text,metric,threshold,evidence_ref,test_run_id,artifact_hash,STATUS
C-001,Hot-day thermal executed,ambient_temp_c,50,demo/sample_outputs/test_validation_report_v1.md,TR-2026-02-27-001,sha256:bbbb...bbbb,BLOCKED (FAIL evidence)`,
        hash: 'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      },
    ],
  },
];
