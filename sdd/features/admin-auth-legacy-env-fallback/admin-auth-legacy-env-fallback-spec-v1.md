# Admin authentication legacy environment fallback — Specification v1

## Goal

Ensure the admin login route continues to authenticate correctly during the
GuestHub environment-variable rename when a canonical `GUESTHUB_*` variable is
present but empty and the legacy `SYNCXML_*` variable contains the configured
value.

## Acceptance criteria

- A non-empty canonical environment value takes precedence over its legacy
  counterpart.
- An empty canonical environment value is treated as unset for value-based
  fallback and the non-empty legacy value is used.
- The admin-only login endpoint returns `200` for valid legacy credentials when
  canonical credential variables are empty.
- Existing invalid-credential and incomplete-configuration behavior remains
  unchanged.

## Scope

- Shared environment-value fallback helper.
- Admin authentication route regression coverage.

## Out of scope

- Renaming retained legacy variables.
- Changes to authentication policy, session signing, or rate limiting.
