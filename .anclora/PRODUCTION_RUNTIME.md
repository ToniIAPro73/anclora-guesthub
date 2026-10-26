# Canonical user review and release protocol — workspace policy v2.2
DEVELOPMENT_VALIDATION_REQUIRED=true
CHANGES_REMAIN_UNCOMMITTED_UNTIL_VALIDATED=true
COMMIT_PUSH_REQUIRES_EXPLICIT_USER_VALIDATION=true
AUTO_COMMIT_AFTER_VALIDATION=false
AUTO_PUSH_DEVELOPMENT=false
AUTO_PUSH_WORK_BRANCH=false
PREVIEW_VALIDATION_REQUIRED_BEFORE_PROMOTION=true
PROMOTION_AUTHORIZATION_TOKEN=PROMOTE=FULL
PROMOTION_DISPATCH_FULL_CHAIN_ONCE=true
PROMOTION_REQUIRES_PREVIEW_REVIEWED_SHA=true
PROMOTION_AGENT_WAITS_FOR_SOURCE_CI=false
PROMOTION_WAIT_FOR_WORKFLOW_COMPLETION=false
PROMOTION_AGENT_POLLS_CI_OR_DEPLOYMENT=false
PROMOTION_AGENT_PER_HOP_VERIFICATION=false
PROMOTION_USER_VERIFIES_EACH_BRANCH=true
PROMOTION_DISPATCH_IMMEDIATELY=true
PROMOTION_FORCE_PUSH_ALLOWED=false
PROMOTION_PROTOCOL=Local changes -> explicit Toni validation in development -> commit/push development -> Toni Preview review -> PROMOTE=FULL + exact reviewed SHA -> one asynchronous full-chain workflow

Toni validates every change in the development environment before the agent commits or pushes it. After the push, the agent waits for Toni to review Preview. Only Toni's exact PROMOTE=FULL token authorizes the complete ordered staging -> production -> main chain, using the exact SHA reviewed in Preview. The agent dispatches one full-chain workflow per repository, does not wait for or poll CI/deployment/workflow completion, and does not verify individual target branches. That workflow rejects failed source status and branch divergence, permits pending checks, validates all target branches before writing, and updates all three refs sequentially with fast-forward pushes, and stops if development moved after Preview review. Toni reviews the resulting environments.

# Anclora Guesthub — Production Runtime Manifest

PRODUCTION_RUNTIME_MANIFEST_VERSION=2.0
PROMOTION_REPORT=SINGLE_SUMMARY_AT_END
PROMOTION_PARALLEL_ACROSS_REPOS=true
PROMOTION_MULTI_REPO_SCOPE_ALLOWED=true
PROMOTION_STOP_ON_GATE_FAILURE=true
PROMOTION_REQUIRES_PRE_STEP_GATES=true
PROMOTION_MECHANISM=.github/workflows/promote.yml
PROMOTION_FLOW=development->staging->production->main
PROMOTION_SUPPORTED=true
SECRET_COMMIT_FORBIDDEN=true
SECRET_OUTPUT_FORBIDDEN=true
PROMOTION_AUTHORIZATION_CLEAR_ON_UNAUTHORIZED_PROMPT=true
PROMOTION_AUTHORIZATION_CLEAR_ON_NEW_SESSION=true
PROMOTION_AUTHORIZATION_SCOPE=CURRENT_TASK_OR_CONVERSATION
AUTO_PROMOTE=false
TEST_EXECUTION_POLICY=BATCHED
STOP_WHEN_SUFFICIENT_EVIDENCE=true
CAVEMAN_GRANULARITY=TASK
CAVEMAN_MODE_DEFAULT=AUTO
TOKEN_ECONOMY_POLICY=ADAPTIVE
QA_MODE_DEFAULT=AUTO
STOP_AFTER_DEVELOPMENT_PUSH=true
PUSH_TARGET=origin/development
FEATURE_BRANCHES=DISALLOWED
DEFAULT_BRANCH=development
WORKING_BRANCH=development
ANCLORA_FLOW_CONTRACT_VERSION=2.0
ANCLORA_FLOW_VERSION=1
RUNTIME_CONTRACT_AUTHORITY=CANONICAL
STATUS=PRODUCTION_RUNTIME_CONFIRMED
LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

## 1. Application Identity

APPLICATION_NAME=Anclora Guesthub
REPOSITORY=anclora-guesthub
APPLICATION_TYPE=fullstack
FRAMEWORK=Next.js

## 2. Runtime Topology

FRONTEND_PROVIDER=Vercel
BACKEND_PROVIDER=Vercel Serverless Functions
PRODUCTION_DOMAIN=anclora-guesthub-ediux22aa-pmi140979-6354s-projects.vercel.app
PRODUCTION_DEPLOYMENT_PROVIDER=Vercel

```text
Browser / Client
   ↓
Vercel Frontend (Next.js)
   ↓
Backend Services
   ├── Database: Neon/Postgres
   └── External Integrations
```

## 3. Production Database Contract

DATABASE_PROVIDER=Neon/Postgres
DATABASE_SCOPE=production
LOCAL_DATABASE_SCOPE=production

Local development intentionally connects to the Production database.
This is the Anclora operating model.
Do not create or switch to a Development, Preview, Staging, ephemeral,
local or alternate database unless Toni explicitly requests it.

## 4. Database Migration Contract

MIGRATION_SYSTEM=Prisma ORM
MIGRATION_STRATEGY=PRISMA_MIGRATE
MIGRATION_DIRECTORY=./prisma/migrations
MIGRATION_RUNNER=npx prisma migrate deploy

All schema migrations apply strictly against the designated production database.
Destructive drops or resets are strictly prohibited without authorization.

## 5. Storage Contract

STORAGE_PROVIDER=Vercel Blob
STORAGE_SCOPE=production

Local development utilizes production storage buckets/services according to the production-backed model.

## 6. Authentication Contract

AUTH_PROVIDER=NextAuth/Auth.js
AUTH_SCOPE=production

## 7. External Services & Integrations

EXTERNAL_SERVICES=Vercel API, Production Database, Email/Notifications

## 8. Environment Files & Loading Order

ENV_FILES=.env.local (mode 0600), .env.production.local (fallback)
All local secret variables point to production services. Never commit .env files containing credentials.

## 9. Local vs Production Model

LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

## QA Contract

QA_POLICY=WORKSPACE_PROPORTIONAL
FAST_TARGETED_TESTING_POLICY=MINIMUM_SUFFICIENT_SET
FAST_FULL_TEST_SUITE_ALLOWED=false
FULL_GATES_AFTER_EVERY_EDIT=false
REPEAT_UNCHANGED_SUCCESSFUL_GATES=false
VISUAL_QA_EXECUTION=BY_QA_MODE

QA_MINIMUM_FOR_DATABASE_MIGRATION=FULL
QA_MINIMUM_FOR_AUTH=FULL
QA_MINIMUM_FOR_RELEASE_PROMOTION=FULL


QA_AUTH_MODEL=DEDICATED_USER
QA_IS_DEDICATED=true
QA_IS_REAL_USER=false
REAL_USER_AS_QA_ALLOWED=false
QA_SCOPE=dedicated-user-owned-records
QA_REUSE=true
QA_CREATE_IF_MISSING=true
QA_DELETE_AFTER_TEST=false
QA_CREATION_CONFIRMATION_REQUIRED=false
QA_PERSISTENT_IDENTITY=qa.guesthub@anclora.local
QA_DATA_ISOLATION_MODEL=USER_OWNED_RECORDS
QA_WRITE_SCOPE=authenticated QA user records only; never query or mutate another owner's records

For dedicated human QA: Use designated production test identity. Never use Toni's personal account or operational admins as QA accounts. Never delete test account after testing.

## 11. Git Branch & Operational Policy

PROMOTION_POLICY=Default development-only operation; no automatic promotion. Explicit current-task user authorization permits only the repository-supported governed promotion path, subject to all gates.

<!-- ANCLORA-MODS:START -->
ANCLORA_MODS_COMMON_CONTRACT_VERSION=1.0.0
Canonical shared rules: [Anclora Common Agent Contract](../anclora-mods/contracts/ANCLORA_COMMON_AGENT_CONTRACT_V1.md) and [Flow Amendment v2](../anclora-mods/ANCLORA_FLUJO_UNICO_V2.md). Repository-specific facts remain in this repository's `.anclora/` contracts.
<!-- ANCLORA-MODS:END -->
