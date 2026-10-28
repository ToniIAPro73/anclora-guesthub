# GuestHub Identity access guidance — Spec v1

## Status

Draft for review on `development`.

## Context

GuestHub authenticates through Anclora Identity, then requires an active
GuestHub application membership. When Identity authentication succeeds but
the membership is absent, or when the OIDC exchange fails, the callback must
not leave a visitor on a raw technical response.

## Requirements

- Keep the active-membership authorization decision unchanged.
- Return visitors without an approved GuestHub membership to a branded,
  plain-language access page.
- Give visitors a direct path to request the controlled pilot.
- Show a separate retry message for a temporary OIDC exchange failure.
- Keep diagnostic details in server logs limited to standard OAuth error
  categories; never log authorization codes, tokens, or credentials.

## Acceptance criteria

- Missing GuestHub membership redirects to `/login` with a non-sensitive
  state marker and does not grant a session.
- The page explains that access requires pilot approval and links to `/piloto`.
- OIDC exchange failures show a retry action and no raw JSON or protocol error.
- Successful active-membership login behavior remains unchanged.
