# Anclora Identity Production Fix — Plan v1

## Source

`anclora-identity-production-fix-spec-v1.md`

## Plan

1. Update `ANCLORA_IDENTITY_ISSUER_URL` in the Data Lab and GuestHub Vercel
   projects. Vercel stores this key as one shared record, so the CLI updated its
   Production, Preview and Development targets together. Keep secrets and other
   OIDC values unchanged.
2. Map accepted GuestHub Identity sessions to a local role using the existing
   configured admin email. Default all other accepted sessions to `pilot_user`.
3. Inspect the final diff and leave repository changes uncommitted on
   `development` for Toni's review.
4. Roll out through the governed promotion path only after the required
   development/Preview validation and explicit promotion authorization.

## Risks and Controls

- Existing Production deployments retain their original environment snapshot
  until a new governed deployment is promoted. Updating the Vercel environment
  variable alone does not redeploy either application.
- The local admin email is an application-level role assignment. If it is absent
  or does not match the verified Identity email, the Identity user receives the
  least-privileged `pilot_user` role.
- Do not print or change client secrets, session secrets, or other Vercel values.
