# GuestHub isolated QA access through Anclora Identity

## Goal

Allow the dedicated QA applicant to request a controlled pilot through the normal GuestHub form and receive only a QA-scoped Identity membership after Nexus approval.

## Requirements

1. QA routing is selected only by server-side deployment configuration; request body fields and email address never select the QA scope.
2. QA requests use a dedicated Nexus endpoint and credential. Missing configuration fails closed before any operational persistence or notification side effect.
3. An approved QA request creates an Identity invitation or membership with the `qa` application role. An existing non-QA membership is not changed or treated as QA approval.
4. The OIDC callback requires the correct application membership and preserves the QA role in the app session.
5. GuestHub reservation operations remain filtered by the authenticated Identity subject (`ownerId`); no other owner’s records are visible or mutable.
6. The normal production request path remains unchanged when QA mode is not configured.

## Acceptance

- No client-controlled field or matching email can route a request into QA.
- Missing QA config returns a sanitized error without writing a local/operational request.
- A QA membership is distinguished from ordinary membership and cannot be elevated during idempotent provisioning.
- Tests cover QA routing, fail-closed behavior, OIDC role acceptance, and owner scoping.
- E2E production verification is a separate gated operation and is not claimed from local tests.
