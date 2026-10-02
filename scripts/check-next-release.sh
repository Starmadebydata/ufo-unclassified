#!/usr/bin/env bash
# Detect the next PURSUE release.
#
# war.gov is unreachable from this machine (DNS blackholed to 198.18.x.x), so
# this polls independent downstream signals instead.
#
# IMPORTANT: bump CURRENT_RELEASE_NUM and BASELINE_UFOFILES below every time
# a release fires and the watch is re-armed for the next one. The prior
# version of this script hardcoded "fifth" — once Wikipedia added a permanent
# "Fifth release" section documenting the past release, that wording matched
# forever and the watch fired on every run for two weeks straight. Matching
# on release N+1 relative to a value you update, instead of a fixed word,
# is what prevents that recurring.
#
# Exit 0 = nothing new. Exit 10 = probable release. Exit 1 = all probes failed.
set -uo pipefail

# --- Bump these two on every re-arm ---
CURRENT_RELEASE_NUM=6           # last confirmed release
BASELINE_UFOFILES=158           # ufofiles.fyi file count as of the last re-arm (2026-08-22)
# ---------------------------------------

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
ORDINALS=(zeroth first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth)
NEXT_NUM=$((CURRENT_RELEASE_NUM + 1))
NEXT_ORDINAL="${ORDINALS[$NEXT_NUM]:-release-$NEXT_NUM}"
NEXT_PADDED=$(printf "%02d" "$NEXT_NUM")

hits=(); probes_ok=0

# --- Signal 1: Wikipedia. Actively edited; records each release within hours.
wiki=$(curl -s -L --max-time 25 "https://en.wikipedia.org/w/index.php?title=United_States_UFO_files&action=raw")
if [ -n "$wiki" ]; then
  probes_ok=$((probes_ok + 1))
  n=$(printf '%s' "$wiki" | grep -coiE "${NEXT_ORDINAL} release|release ${NEXT_NUM}\b|release ${NEXT_PADDED}\b" || true)
  [ "$n" -gt 0 ] && hits+=("Wikipedia: $n mention(s) of a ${NEXT_ORDINAL} release")
fi

# --- Signal 2: ufofiles.fyi. Competing archive, automated, updates fast.
comp=$(curl -s -L --max-time 25 -A "$UA" "https://ufofiles.fyi/")
if [ -n "$comp" ]; then
  probes_ok=$((probes_ok + 1))
  n=$(printf '%s' "$comp" | grep -oE "[0-9]{2,5} (declassified )?files" | grep -oE "^[0-9]+" | head -1)
  if [ -n "$n" ] && [ "$n" -gt "$BASELINE_UFOFILES" ]; then
    hits+=("ufofiles.fyi: $n files (baseline $BASELINE_UFOFILES)")
  fi
fi

# --- Signal 3: The Debrief. Covers every release within a day.
deb=$(curl -s -L --max-time 25 -A "$UA" "https://thedebrief.org/?s=PURSUE+release")
if [ -n "$deb" ]; then
  probes_ok=$((probes_ok + 1))
  n=$(printf '%s' "$deb" | grep -coiE "${NEXT_ORDINAL} (batch|release|tranche)|release ${NEXT_NUM}\b" || true)
  [ "$n" -gt 0 ] && hits+=("The Debrief: $n mention(s) of a ${NEXT_ORDINAL} release")
fi

if [ "$probes_ok" -eq 0 ]; then
  echo "ERROR: all probes failed (network down?)"
  exit 1
fi

if [ ${#hits[@]} -gt 0 ]; then
  echo "RELEASE_LIKELY (watching for Release ${NEXT_PADDED}; ${probes_ok}/3 probes ran)"
  printf '  - %s\n' "${hits[@]}"
  exit 10
fi

echo "no change (watching for Release ${NEXT_PADDED}; ${probes_ok}/3 probes ran)"
exit 0
