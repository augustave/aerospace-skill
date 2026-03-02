---
name: system-assurance-core
type: skill
version: "1.1.0"
owner: reliability-ops
risk_level: medium
intent: >
  Validates reality against theory. Runs qualification, performs failure analysis,
  and enforces lab discipline. Produces sign-off or blocks release with mechanistic
  root-cause requirements. Delegates lab authority to Chief Horizon Lab Engineer.
inputs:
  - name: prototype_hardware
    type: physical_ref
  - name: pcb_fabrication_pack_v1
    type: file/zip
  - name: bringup_firmware_v1
    type: repo/ref
outputs:
  - name: test_validation_report_v1
    type: file/markdown
  - name: root_cause_analysis_v1
    type: file/markdown
  - name: bug_report_v1
    type: file/markdown
  - name: validation_signoff
    type: boolean
ports:
  provides: [test_validation_report_v1, bug_report_v1, root_cause_analysis_v1]
  consumes: [pcb_fabrication_pack_v1, bringup_firmware_v1]
