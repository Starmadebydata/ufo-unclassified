#!/usr/bin/env bash
# Detect the next PURSUE release (Release 05).
#
# war.gov is unreachable from this machine (DNS blackholed to 198.18.x.x), so
# this polls independent downstream signals instead. Each is a zero/known
# baseline today, so any hit means something moved.
#
# Exit 0 = nothing new. Exit 10 = probable release. Exit 1 = all probes failed.
set -uo pipefail

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
BASELINE_UFOFILES=158   # ufofiles.fyi file count as of 2026-07-27
hits=(); probes_ok=0

# --- Signal 1: Wikipedia. Actively edited; records each release within hours.
# Baseline: 0 matches. "fifth batch" (forward-looking) is deliberately excluded.
wiki=$(curl -s -L --max-time 25 "https://en.wikipedia.org/w/index.php?title=United_States_UFO_files&action=raw")
if [ -n "$wiki" ]; then
  probes_ok=$((probes_ok + 1))
  n=$(printf '%s' "$wiki" | grep -coiE "fifth release|release 5\b|release 05" || true)
  [ "$n" -gt 0 ] && hits+=("Wikipedia: $n mention(s) of a fifth release")
fi

# --- Signal 2: ufofiles.fyi. Competing archive, automated, updates fast.
# Baseline: 158 files. Any increase means new files are public.
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
  n=$(printf '%s' "$deb" | grep -coiE "fifth (batch|release|tranche)|release 5\b" || true)
  [ "$n" -gt 0 ] && hits+=("The Debrief: $n mention(s) of a fifth release")
fi

if [ "$probes_ok" -eq 0 ]; then
  echo "ERROR: all probes failed (network down?)"
  exit 1
fi

if [ ${#hits[@]} -gt 0 ]; then
  echo "RELEASE_LIKELY (${probes_ok}/3 probes ran)"
  printf '  - %s\n' "${hits[@]}"
  exit 10
fi

echo "no change (${probes_ok}/3 probes ran)"
exit 0
