#!/usr/bin/env bash
# Tests for .github/scripts/release-notes.sh (plain bash, fixtures in a temp dir).
set -uo pipefail

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
RELEASE_NOTES="$SCRIPT_DIR/release-notes.sh"

WORKDIR=$(mktemp -d "${TMPDIR:-/tmp}/release-notes-test.XXXXXX")
trap 'rm -rf "$WORKDIR"' EXIT

failures=0

pass() { printf 'ok   %s\n' "$1"; }

fail() {
  printf 'FAIL %s\n' "$1"
  printf '     %s\n' "$2"
  failures=$((failures + 1))
}

assert_eq() {
  if [ "$2" = "$3" ]; then
    pass "$1"
  else
    fail "$1" "expected [$2] got [$3]"
  fi
}

assert_contains() {
  case "$3" in
  *"$2"*) pass "$1" ;;
  *) fail "$1" "missing [$2] in [$3]" ;;
  esac
}

assert_not_contains() {
  case "$3" in
  *"$2"*) fail "$1" "unexpected [$2] in [$3]" ;;
  *) pass "$1" ;;
  esac
}

assert_code() {
  if [ "$2" = "$3" ]; then
    pass "$1"
  else
    fail "$1" "expected exit $3 got $2"
  fi
}

[ -f "$RELEASE_NOTES" ] || {
  printf 'FAIL release-notes.sh exists\n     not found at %s\n' "$RELEASE_NOTES"
  exit 1
}

# --- fixtures ---------------------------------------------------------------

cat >"$WORKDIR/changelog.md" <<'EOF'
# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added

- unreleased line that must never be published

## [0.7.0] - 2026-11-06

### Changed

- **api**: every request now carries the session token.
- **auth**: an expired session signs you out.

### Fixed

- **charts**: daily rate autofill no longer overwrites a typed value.

## [0.6.0] - 2026-11-06

### Added

- older release line that must not leak into the notes

## Resumen (ES) in the changelog is not a release heading
EOF

: >"$WORKDIR/no-es-body.md"

cat >"$WORKDIR/es-body.md" <<'EOF'
## Summary

English summary of the release.

## Changes

- **docs**: updated the README.

## Release checklist

- [x] CHANGELOG moved under `## [0.7.0] - 2026-11-06`

## Resumen (ES)

<!-- the bot publishes only what is below this comment -->
Novedades de la version 0.7.0: ahora cada solicitud lleva tu sesion iniciada
y las plantillas se autocompletan al guardar movimientos.
<!-- trailing comment that must not be published -->

## Notes

English notes that must not become part of the Spanish section.
EOF

cat >"$WORKDIR/comments-only-body.md" <<'EOF'
## Summary

Only comments in the Spanish section.

## Resumen (ES)

<!--
Written for the Discord changelog:
https://github.com/ragehardrack/tique/blob/main/.github/pull_request_template.md
-->

## Notes

Nothing else.
EOF

cat >"$WORKDIR/unreleased-only.md" <<'EOF'
# Changelog

## [Unreleased]

### Added

- nothing released yet
EOF

# --- 1. version + notes extraction -----------------------------------------

"$RELEASE_NOTES" "$WORKDIR/changelog.md" "$WORKDIR/no-es-body.md" "$WORKDIR/out1.md" >"$WORKDIR/stdout1.txt" 2>"$WORKDIR/stderr1.txt"
code=$?
assert_code "extraction succeeds" "$code" "0"
assert_eq "stdout is the version only" "$(cat "$WORKDIR/stdout1.txt")" "0.7.0"

notes1=$(cat "$WORKDIR/out1.md")
assert_contains "notes carry the newest released entry" "**api**: every request now carries the session token." "$notes1"
assert_contains "notes keep every group of the entry" "daily rate autofill" "$notes1"
assert_not_contains "notes skip [Unreleased]" "never be published" "$notes1"
assert_not_contains "notes stop at the next heading" "older release line" "$notes1"
assert_not_contains "notes have no Spanish section" "## Resumen (ES)" "$notes1"
assert_not_contains "notes skip the changelog heading noise" "not a release heading" "$notes1"

# --- 2. Spanish section appended -------------------------------------------

"$RELEASE_NOTES" "$WORKDIR/changelog.md" "$WORKDIR/es-body.md" "$WORKDIR/out2.md" >"$WORKDIR/stdout2.txt" 2>"$WORKDIR/stderr2.txt"
code=$?
assert_code "spanish run succeeds" "$code" "0"
assert_eq "spanish run still prints the version" "$(cat "$WORKDIR/stdout2.txt")" "0.7.0"

notes2=$(cat "$WORKDIR/out2.md")
assert_contains "spanish section heading appended" "## Resumen (ES)" "$notes2"
assert_contains "spanish text appended" "cada solicitud lleva tu sesion iniciada" "$notes2"
assert_not_contains "spanish html comments removed" "<!--" "$notes2"
assert_not_contains "spanish section stops at the next heading" "must not become part of the Spanish" "$notes2"
assert_not_contains "spanish checklist not copied" "- [x] CHANGELOG moved" "$notes2"
assert_contains "spanish section comes after the english notes" "- **charts**: daily rate autofill no longer overwrites a typed value.

## Resumen (ES)" "$notes2"

# --- 3. comment-only Spanish section ignored -------------------------------

"$RELEASE_NOTES" "$WORKDIR/changelog.md" "$WORKDIR/comments-only-body.md" "$WORKDIR/out3.md" >"$WORKDIR/stdout3.txt" 2>"$WORKDIR/stderr3.txt"
code=$?
assert_code "comment-only spanish run succeeds" "$code" "0"

notes3=$(cat "$WORKDIR/out3.md")
assert_not_contains "comment-only spanish section ignored" "## Resumen (ES)" "$notes3"
assert_not_contains "comment text not copied" "Discord changelog" "$notes3"
assert_contains "english notes still written" "session token." "$notes3"

# --- 4. missing released version fails -------------------------------------

"$RELEASE_NOTES" "$WORKDIR/unreleased-only.md" "$WORKDIR/no-es-body.md" "$WORKDIR/out4.md" >"$WORKDIR/stdout4.txt" 2>"$WORKDIR/stderr4.txt"
code=$?
assert_code "no released version exits 1" "$code" "1"

stderr4=$(cat "$WORKDIR/stderr4.txt")
assert_contains "failure explains the cause" "no released version" "$stderr4"
assert_contains "failure names the file" "unreleased-only.md" "$stderr4"
assert_eq "failure prints no version on stdout" "$(cat "$WORKDIR/stdout4.txt")" ""
[ ! -s "$WORKDIR/out4.md" ] && pass "failure writes no notes file" || fail "failure writes no notes file" "out4.md is not empty"

# --- 5. missing arguments fail cleanly -------------------------------------

"$RELEASE_NOTES" >"$WORKDIR/stdout5.txt" 2>"$WORKDIR/stderr5.txt"
code=$?
assert_code "no arguments exits 1" "$code" "1"
stderr5=$(cat "$WORKDIR/stderr5.txt")
assert_contains "no arguments prints usage" "usage:" "$stderr5"

# --- result -----------------------------------------------------------------

if [ "$failures" -ne 0 ]; then
  printf '\n%d assertion(s) failed\n' "$failures"
  exit 1
fi

printf '\nrelease-notes.sh: all assertions passed\n'
