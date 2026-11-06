#!/usr/bin/env bash
# release-notes.sh — build the GitHub Release notes for a Lascar project.
#
#   release-notes.sh <changelog> <pr-body-file> <out-file>
#
# Reads the newest released version from a Keep a Changelog file and writes its
# entry to <out-file>. When the merged release PR body carries a non-empty
# "## Resumen (ES)" section, that Spanish text (the Discord changelog) is
# appended to <out-file> under the same heading.
#
# stdout: the version number without the leading "v" (e.g. 0.7.0).
# exit 1: the changelog has no released version heading, so there is nothing
#         to publish; <out-file> is left untouched.
set -euo pipefail

usage() {
  printf 'usage: release-notes.sh <changelog> <pr-body-file> <out-file>\n' >&2
}

if [ "$#" -ne 3 ]; then
  usage
  exit 1
fi

CHANGELOG=$1
PR_BODY=$2
OUT=$3

if [ ! -f "$CHANGELOG" ]; then
  printf 'release-notes.sh: changelog not found: %s\n' "$CHANGELOG" >&2
  exit 1
fi

if [ ! -f "$PR_BODY" ]; then
  printf 'release-notes.sh: pull request body file not found: %s\n' "$PR_BODY" >&2
  exit 1
fi

# Drop the leading and trailing blank lines of a section.
trim_blanks() {
  awk '
    { lines[NR] = $0 }
    END {
      first = 1
      last = NR
      while (first <= last && lines[first] ~ /^[[:space:]]*$/) { first++ }
      while (last >= first && lines[last] ~ /^[[:space:]]*$/) { last-- }
      for (i = first; i <= last; i++) { print lines[i] }
    }
  '
}

# Remove HTML comments, single-line or spanning several lines.
strip_html_comments() {
  awk '
    BEGIN { in_comment = 0 }
    {
      line = $0
      out = ""
      while (length(line) > 0) {
        if (in_comment) {
          end = index(line, "-->")
          if (end == 0) { line = ""; break }
          line = substr(line, end + 3)
          in_comment = 0
        } else {
          start = index(line, "<!--")
          if (start == 0) { out = out line; break }
          out = out substr(line, 1, start - 1)
          line = substr(line, start + 4)
          in_comment = 1
        }
      }
      if (!in_comment) { print out }
      else if (length(out) > 0) { print out }
    }
  '
}

# Line number and version of the first "## [X.Y.Z] - YYYY-MM-DD" heading.
# [Unreleased] never matches: only a dated version heading is a release.
heading=$(
  awk '
    /^## \[[0-9]+\.[0-9]+\.[0-9]+\] - [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][[:space:]]*$/ {
      version = $0
      sub(/^## \[/, "", version)
      sub(/\].*$/, "", version)
      print NR ":" version
      exit
    }
  ' "$CHANGELOG"
)

if [ -z "$heading" ]; then
  printf 'release-notes.sh: %s has no released version: expected a "## [X.Y.Z] - YYYY-MM-DD" heading under [Unreleased], add one in the release PR\n' "$CHANGELOG" >&2
  exit 1
fi

line=${heading%%:*}
version=${heading##*:}

body=$(awk -v start="$line" '
  NR < start { next }
  NR > start && /^## / { exit }
  NR > start { print }
' "$CHANGELOG" | trim_blanks)

# The Spanish section the Discord bot publishes: text up to the next "## "
# heading, with HTML comments removed.
spanish=$(awk '
  !in_section && /^## Resumen \(ES\)[[:space:]]*$/ { in_section = 1; next }
  in_section && /^## / { exit }
  in_section { print }
' "$PR_BODY" | strip_html_comments | trim_blanks)

{
  if [ -n "$body" ]; then
    printf '%s\n' "$body"
  fi
  if [ -n "$spanish" ]; then
    printf '\n## Resumen (ES)\n'
    printf '%s\n' "$spanish"
  fi
} >"$OUT"

printf '%s\n' "$version"
