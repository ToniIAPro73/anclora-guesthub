# CI dependency installation performance — Specification v1

## Goal

Reduce avoidable network work and duplicate setup during the GitHub Actions
quality job without changing the dependency graph or runtime behavior.

## Acceptance criteria

- CI installs dependencies with npm's local cache preference enabled.
- CI skips npm audit and funding network requests during the quality job.
- CI does not run Prisma client generation twice.
- The existing lint, typecheck, test, and build steps remain enabled.
- Dependency versions and the package lockfile remain unchanged.

## Scope

- GitHub Actions dependency-install and Prisma setup steps.

## Out of scope

- Replacing ExcelJS or changing transitive dependency versions.
- Suppressing deprecation warnings by overriding incompatible packages.
