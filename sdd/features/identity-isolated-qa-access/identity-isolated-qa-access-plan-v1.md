# GuestHub isolated QA access plan

1. Route QA only when a server-side QA deployment flag is enabled; use a separate Nexus QA URL/key and keep the normal route unchanged.
2. Reuse a UUID idempotency key across client retries so one submission creates at most one Nexus record.
3. Provision the Identity `qa` role through Nexus approval. Reject conflicting active membership and keep reservation access owner-scoped by Identity subject.
4. Validate unit/type checks locally. Do not submit live requests until the QA Nexus org/reviewer and production deployment are configured and verified.

The Identity schema migrations are owned by `anclora-identity`; Nexus schema is reused via the existing `org_id` and JSON metadata fields.
