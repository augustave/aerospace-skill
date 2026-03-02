export interface Claim {
  claim_id: string;
  claim_text: string;
  metric: string;
  threshold: string | number;
  evidence_ref: string;
  test_run_id: string;
  artifact_hash: string;
  status: 'PASS' | 'FAIL' | 'BLOCKED' | 'PENDING';
  linked_fail?: string;
}

export const CLAIMS: Claim[] = [
  {
    claim_id: 'C-001',
    claim_text: 'Aircraft operates without thermal derating at +50°C ambient',
    metric: 'ambient_temp_c',
    threshold: 50,
    evidence_ref: 'demo/sample_outputs/test_validation_report_v1.md',
    test_run_id: 'TR-2026-02-27-001',
    artifact_hash: 'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    status: 'BLOCKED',
    linked_fail: 'Test FAIL: thermal derating at 47°C (ESR mechanism)',
  },
  {
    claim_id: 'C-002',
    claim_text: 'ESD handling compliant with MIL-STD-1686',
    metric: 'esd_checklist',
    threshold: 'PASS',
    evidence_ref: 'demo/sample_outputs/lab_safety_checklist_v1.md',
    test_run_id: 'TR-2026-02-27-000',
    artifact_hash: 'sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    status: 'PASS',
  },
  {
    claim_id: 'C-003',
    claim_text: 'HIL rig instruments within calibration during all test runs',
    metric: 'cal_status',
    threshold: 'IN_CAL',
    evidence_ref: 'demo/sample_outputs/lab_calibration_log_v1.md',
    test_run_id: 'TR-2026-02-26-001',
    artifact_hash: 'sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    status: 'PASS',
  },
  {
    claim_id: 'C-004',
    claim_text: '270V HV bus architecture meets MIL-STD-704F',
    metric: 'hv_bus_compliance',
    threshold: 'PASS',
    evidence_ref: 'PENDING — redesign after BUG-2026-002',
    test_run_id: 'PENDING',
    artifact_hash: 'PENDING',
    status: 'PENDING',
  },
];
