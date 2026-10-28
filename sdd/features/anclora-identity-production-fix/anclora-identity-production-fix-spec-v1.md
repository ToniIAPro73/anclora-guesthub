# Anclora Identity Production Fix — Spec v1

## Status

Draft for review on `development`.

## Context

GuestHub and Data Lab have Anclora Identity enabled in Vercel Production, but both
production issuer values still target the retired Render hostname. GuestHub also
maps every accepted Identity session to its local `admin` role, although Identity
application membership only establishes eligibility to enter the application.

## Goals

- Point both Production integrations to the canonical Anclora Identity issuer:
  `https://anclora-identity.anclora.com`.
- Preserve each application's existing Identity callback URI.
- Keep GuestHub application eligibility separate from its local product role.
- Assign GuestHub `admin` only when the Identity session email matches the
  explicitly configured local admin email (`GUESTHUB_ADMIN_EMAIL`, with the
  existing `SYNCXML_ADMIN_EMAIL` alias).
- Assign other authorized Identity users `pilot_user`; a platform role or
  application membership alone must not grant GuestHub admin privileges.

## Non-Goals

- Do not change Identity enablement flags or OAuth client credentials.
- Do not change the GuestHub access decision or permit users without GuestHub
  membership (except existing `GROUP_OWNER` access) to sign in.
- Do not change legacy password login or SES production policy.
- Do not deploy or promote a Vercel production release as part of local
  implementation review.

## Acceptance Criteria

- GuestHub Identity sessions retain the Identity `sub` as their session ID.
- A session whose Identity email matches the configured local admin email has
  role `admin`.
- Other accepted Identity sessions have role `pilot_user`, including users with
  application membership and `GROUP_OWNER` access.
- Existing local authorization continues to return `401` for no session and
  `403` for `pilot_user` on admin-only routes.
- Vercel issuer configuration for Data Lab and GuestHub is the canonical issuer
  in every configured target; client credentials remain unchanged.
- Production rollout follows the repository promotion contract after Toni's
  development and Preview validation.
