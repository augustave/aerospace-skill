---
name: defense-market-vanguard
type: skill
version: "1.0.0"
owner: business-development
risk_level: medium
intent: >
  Orchestrates go-to-market strategies for autonomous defense systems in the
  Middle East (Saudi/UAE focus). Translates stakeholder demand into
  requirements that engineering can implement and validate.
inputs:
  - name: regional_intelligence
    type: text
    description: "Procurement cycles, MoD priorities, primes, offsets, constraints."
  - name: customer_signals
    type: text
    description: "Operator needs, mission profile, terrain/climate constraints."
  - name: technical_capabilities
    type: json
    description: "Current specs (range, payload, links, thermal limits)."
outputs:
  - name: market_requirements_doc
    type: file/markdown
  - name: mission_conops_v1
    type: file/markdown
  - name: capture_strategy_deck
    type: file/pptx
dependencies:
  knowledge: [foreign_military_sales_fms, itar_compliance, regional_cultural_protocols, fcpa]
ports:
  provides: [market_gap_analysis_v1]
  consumes: [test_validation_report_v1, validated_claims_sheet_v1]
---

# Vanguard Module

## Definition of Done
- Requirements are measurable (units, thresholds, acceptance tests).
- Export-control constraints included up front.
- Claims blocked until evidence exists (validated_claims_sheet_v1 includes artifact_hash + test_run_id).
