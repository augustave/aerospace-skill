---
swarm_name: autonomous-aerospace-collective
type: swarm
version: "1.1.0"
owner: swarm-lead
status: active
domain_tags: [autonomy, aerospace, defense, avionics, mission-systems, reliability, business-development]
risk_level: critical
operating_environment: "High-Assurance / Export-Controlled"
topology: hierarchical
mission: "Design, build, validate, and deploy intelligent autonomous aircraft at scale."
skills:
  - defense-market-vanguard
  - mission-systems-architect
  - avionics-foundry-engineering
  - system-assurance-core
submodules:
  - chief-horizon-lab-engineer
---

# autonomous-aerospace-collective (SWARM)

## Mission
Design, build, validate, and deploy intelligent autonomous aircraft at scale under high-assurance constraints.

## Cells (Skills)
1. Vanguard — Growth & Strategy (Saudi/UAE focus)
2. Architect — Mission Systems & Flight Sciences
3. Foundry — Electrical / Avionics / PCB Engineering
4. Assurance Core — Test / Lab / Failure Analysis

## Assurance Core Authority (Lab)
- **Chief Horizon Lab Engineer** is the lab authority for:
  - HIL rig definition, calibration discipline, ESD/HV safety enforcement
  - Repeatability + automation (tests run >2 times must be scripted)
  - Validation evidence quality and gate readiness (can block release/claims)

See: `skills/chief-horizon-lab-engineer/chief-horizon-lab-engineer.skill.md`

## Global Invariants (Non-Negotiables)
- Export & Compliance: export controls (EAR/ITAR where applicable) + FCPA.
- MOSA Discipline: interfaces are modular, documented, and versioned.
- Physics Reality: architecture must fit SWaP-C and remain airworthy; Flight Sciences veto is binding.
- Traceability: external claims must map to evidence (test logs, analysis artifacts).
- No “Random Glitch” Closure: failures require mechanistic root cause or remain open.

## Artifact Bus (Shared Contract)
Only these artifacts may cross cell boundaries.

### Vanguard → Architect
- `market_requirements_doc` (markdown)
- `mission_conops_v1` (markdown)
- `constraints_export_control_v1` (markdown)

### Architect → Foundry & Assurance
- `architecture_spec_v1` (json/pdf)
- `power_budget_v1` (json)
- `rf_link_budget_v1` (pdf)
- `interface_control_doc_v1` (pdf)

### Foundry → Assurance
- `pcb_fabrication_pack_v1` (zip)
- `bringup_firmware_v1` (repo/ref)
- `prototype_build_record_v1` (markdown)

### Assurance → Architect & Foundry
- `test_validation_report_v1` (pdf/markdown)
- `bug_report_v1` (markdown + logs)
- `root_cause_analysis_v1` (pdf/markdown)

### Everyone → Vanguard
- `validated_claims_sheet_v1` (csv/markdown)
- `capture_strategy_deck` (pptx)

## Gates (Enforced)
- **G1 Architecture Gate**: ICD + budgets issued before fabrication.
- **G2 Fabrication Gate**: DFM + library checks completed before ordering.
- **G3 Validation Gate**: validation signoff required before claims are published.
- **G4 Claims Gate (Strict)**: every claim must include:
  - `evidence_ref` (artifact path)
  - `test_run_id` (run identifier)
  - `artifact_hash` (hash of evidence artifact, e.g., SHA-256)

## Release Authority
Who can sign off which gate is defined in: `docs/release_authority.md`.
