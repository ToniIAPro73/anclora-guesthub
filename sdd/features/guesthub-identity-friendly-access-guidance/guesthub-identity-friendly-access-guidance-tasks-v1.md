# GuestHub Identity access guidance — Tasks v1

## Source

`guesthub-identity-friendly-access-guidance-spec-v1.md`

## Tasks

- [x] Add callback regression coverage for missing membership, exchange failure and expired state.
- [x] Replace raw callback errors with branded, user-facing states.
- [x] Add pilot request and retry actions.
- [x] Verify the membership and exchange states with Visual QA.
- [ ] Present the changes on `development` for Toni's validation before commit.

## Validation evidence

- `npx vitest run tests/anclora-identity-callback.test.ts` — PASS, 3 tests.
- `npm run typecheck` — PASS.
- ESLint on the changed route, login page and callback test — PASS.
- `anclora-visual-qa check` — PASS for membership-required and exchange states.
- Captured and inspected the membership-required GuestHub screen.
