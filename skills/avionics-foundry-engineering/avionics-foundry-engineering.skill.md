---
name: avionics-foundry-engineering
type: skill
version: "3.1.0"
owner: hardware-engineering
risk_level: high
intent: >
  Executes HV/LV electronics, PCB layout, harnessing, and firmware bring-up.
  Converts architecture specs into manufacturable, testable hardware.
inputs:
  - name: architecture_spec_v1
    type: file/json
  - name: power_budget_v1
    type: file/json
  - name: interface_control_doc_v1
    type: file/pdf
outputs:
  - name: pcb_fabrication_pack_v1
    type: file/zip
  - name: bringup_firmware_v1
    type: repo/ref
  - name: prototype_build_record_v1
    type: file/markdown
dependencies:
  tools: [altium_designer, spice_simulator, thermal_analyzer]
  knowledge: [high_voltage_safety_270v, ipc_layout_standards, emi_emc_mitigation, dfm, supply_chain_risk]
ports:
  provides: [pcb_fabrication_pack_v1, bringup_firmware_v1, prototype_build_record_v1]
  consumes: [architecture_spec_v1, power_budget_v1, bug_report_v1]
