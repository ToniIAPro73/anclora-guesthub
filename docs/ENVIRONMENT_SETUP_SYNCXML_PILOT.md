# Environment setup — GuestHub controlled pilot

Configure these variables in Vercel and in local `.env` when running the full pilot flow.

```env
DATABASE_URL=
SESSION_SECRET=
RESEND_API_KEY=
RESEND_FROM="Anclora GuestHub <piloto@syncxml.anclora.com>"
RESEND_REPLY_TO=antonio@anclora.com
ADMIN_EMAILS=antonio@anclora.com
GUESTHUB_PILOT_REQUEST_TO=antonio@anclora.com
GUESTHUB_FEEDBACK_TO=antonio@anclora.com
NEXUS_GUESTHUB_WEBHOOK_URL=
NEXUS_GUESTHUB_WEBHOOK_SECRET=
GUESTHUB_APP_URL=
GUESTHUB_LOGIN_URL=
GUESTHUB_INTERNAL_API_SECRET=
GUESTHUB_ADMIN_EMAIL=antonio@anclora.com
GUESTHUB_ADMIN_INITIAL_PASSWORD=
```

Notes:

- `GUESTHUB_INTERNAL_API_SECRET` must match the Nexus-side `SYNCXML_INTERNAL_API_SECRET` (legacy name in the Nexus repo until its own rename).
- `NEXUS_GUESTHUB_WEBHOOK_SECRET` must match the Nexus-side `SYNCXML_WEBHOOK_SECRET` (legacy name in the Nexus repo until its own rename).
- `DATABASE_URL` is required for individual `PilotUser` credentials.
- `RESEND_FROM` must use a domain verified in Resend. Configure SPF, DKIM and DMARC for the sending domain before using Gmail/Yahoo recipients in pilot tests.
- Avoid test senders such as `example.com` or `resend.dev`; use a sender aligned with the product domain, for example `piloto@syncxml.anclora.com`.
- Do not use real guest data in this pilot.

Smoke test:

```bash
DRY_RUN=true node scripts/smoke-resend-pilot-email.mjs
SMOKE_EMAIL_TO=toni@example.com DRY_RUN=false node scripts/smoke-resend-pilot-email.mjs
```

The real send refuses to run unless `SMOKE_EMAIL_TO` is set.
