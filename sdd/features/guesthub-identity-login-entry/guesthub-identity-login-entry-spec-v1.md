# GuestHub Identity login entry — Spec v1

## Status

Draft for review on `development`.

## Context

GuestHub's public and admin login pages still render local password forms while
enabled-mode session resolution reads only the Anclora Identity session. The
local credential recovery and rotation endpoints also modify credentials that
are not used by Identity.

## Acceptance criteria

- `/login` and `/admin/login` redirect to the central Anclora Identity login
  endpoint when Identity is enabled.
- OIDC discovery has a bounded timeout so a provider/network failure cannot
  leave login requests pending indefinitely.
- Legacy login, admin-login, password recovery and password change endpoints
  reject requests while Identity is enabled and retain their current behavior
  when it is disabled.
- Logout clears both the legacy GuestHub cookie and the Identity session cookie
  when Identity is enabled.
- GuestHub's existing membership check and local role mapping remain in force.
