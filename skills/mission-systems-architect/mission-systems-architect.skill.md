---
name: mission-systems-architect
type: skill
version: "2.0.0"
owner: flight-sciences
risk_level: critical
intent: >
  Defines the aircraft’s integrated architecture: aerodynamics, comms, compute,
  sensors, and power. Balances SWaP-C and converts mission needs into a testable,
  buildable system design.
inputs:
  - name: market_requirements_doc
    type: file/markdown
  - name: mission_conops_v1
    type: file/markdown
  - name: constraints_export_control_v1
    type: file/markdown
outputs:
  - name: architecture_spec_v1
    type: file/json
  - name: power_budget_v1
    type: file/json
  - name: rf_link_budget_v1
    type: file/pdf
  - name: interface_control_doc_v1
    type: file/pdf
dependencies:
  knowledge: [mosa_standards, mil_hdbk_516c_airworthiness, link_budget_calculators, do_178c, do_254]
ports:
  provides: [architecture_spec_v1, power_budget_v1, rf_link_budget_v1, interface_control_doc_v1]
  consumes: [market_gap_analysis_v1, test_validation_report_v1, bug_report_v1]
