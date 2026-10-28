# GuestHub isolated QA access tasks

- [x] Add a server-only QA intake configuration and dedicated Nexus delivery path.
- [x] Preserve idempotency across retries and ensure no QA request is written to GuestHub operational storage.
- [x] Accept only a QA-scoped Identity membership for the isolated QA path.
- [x] Add focused unit/API tests for authorization and reservation ownership.
- [x] Verify the reusable Nexus QA organization and dedicated reviewer membership read-only.
- [x] Record provider and release gates without creating requests or changing service configuration.

Live production E2E, request creation, Nexus approval, and inbox verification remain blocked: Vercel environment access returned 403, current Preview deployments predate these changes, and no approved development push/deployment is available yet.
