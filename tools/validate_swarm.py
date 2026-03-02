#!/usr/bin/env python3
import re, sys, csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SWARM = (ROOT / "SWARM.md").read_text(encoding="utf-8")

def fail(msg: str):
    print(f"[FAIL] {msg}")
    sys.exit(1)

def ok(msg: str):
    print(f"[OK] {msg}")

tokens = sorted(set(re.findall(r"`([a-zA-Z0-9_]+)`", SWARM)))
if not tokens:
    fail("No artifact tokens found in SWARM.md.")
ok("Artifact tokens present")

demo = ROOT / "demo/sample_outputs"
claims = demo / "validated_claims_sheet_v1.csv"
if not claims.exists():
    fail("Missing validated_claims_sheet_v1.csv")
ok("Claims CSV present")

# Validation report fields
val = (demo / "test_validation_report_v1.md").read_text(encoding="utf-8")
for rf in ["run_id:", "test_run_id:", "environment:", "config_refs:", "pass_fail:", "evidence_refs:", "artifact_hashes:", "mechanism:"]:
    if rf not in val:
        fail(f"Validation report missing required field: {rf}")
ok("Validation report schema ok")

# Root cause obligation
for p in ["bug_report_v1.md", "root_cause_analysis_v1.md"]:
    txt = (demo / p).read_text(encoding="utf-8")
    if "Mechanism" not in txt:
        fail(f"{p} missing 'Mechanism'")
ok("Root-cause obligation ok")

with claims.open("r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    must = ["claim_id","claim_text","metric","threshold","evidence_ref","test_run_id","artifact_hash"]
    if reader.fieldnames != must:
        fail(f"Claims columns must be {must}; got {reader.fieldnames}")
    for i, row in enumerate(reader, start=1):
        ev = (row["evidence_ref"] or "").strip()
        tr = (row["test_run_id"] or "").strip()
        ah = (row["artifact_hash"] or "").strip()
        if not ev or not (ROOT / ev).exists():
            fail(f"Row {i}: evidence_ref invalid: {ev}")
        if not tr:
            fail(f"Row {i}: test_run_id empty")
        if not ah.startswith("sha256:") or len(ah.split("sha256:",1)[1]) != 64:
            fail(f"Row {i}: artifact_hash invalid")
ok("Claims strict schema ok")

print("All gates passed.")
