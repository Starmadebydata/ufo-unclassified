#!/usr/bin/env bash
# Pull a fresh snapshot of the catalog from the live site and report what changed.
# Run this before publishing a new dataset version (GitHub release / Zenodo upload).
set -euo pipefail

cd "$(dirname "$0")"

SRC="https://ufo-declassified.com/dataset/uap-documents.csv"
OUT="uap-documents.csv"

echo "Fetching $SRC"
curl -sSLf "$SRC" -o "$OUT.new"

new_rows=$(($(wc -l < "$OUT.new") - 1))
if [ -f "$OUT" ]; then
  old_rows=$(($(wc -l < "$OUT") - 1))
  echo "Records: $old_rows -> $new_rows"
else
  echo "Records: $new_rows (first snapshot)"
fi

mv "$OUT.new" "$OUT"

echo
echo "Composition:"
python3 - "$OUT" <<'PY'
import csv, sys
from collections import Counter
rows = list(csv.DictReader(open(sys.argv[1])))
print(f"  total            {len(rows)}")
print(f"  years            {min(int(r['year']) for r in rows)}-{max(int(r['year']) for r in rows)}")
print(f"  with location    {sum(1 for r in rows if r['location'])}")
for field in ('release', 'agency'):
    counts = Counter(r[field] for r in rows).most_common()
    print(f"  by {field:<13} " + ", ".join(f"{k} {v}" for k, v in counts))
for field in ('file_types', 'evidence_labels'):
    counts = Counter(t for r in rows for t in r[field].split(';') if t).most_common()
    print(f"  by {field:<13} " + ", ".join(f"{k} {v}" for k, v in counts))
PY

echo
echo "Update these in README.md and .zenodo.json if the numbers moved, then bump"
echo "the version in CITATION.cff and .zenodo.json before publishing."
