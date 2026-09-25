# Anclora Guesthub — Agent Project Context

AGENT_PROJECT_CONTEXT_VERSION=2.0
STATUS=ACTIVE

ANCLORA_AUTHORITY_MODEL_VERSION=1.0
ANCLORA_PROJECT_RULES_OVERRIDE_AGENT_DEFAULTS=true
ANCLORA_PROJECT_RULES_OVERRIDE_HOME_AGENT_CONFIG=true
ANCLORA_PROJECT_RULES_OVERRIDE_GENERIC_BEST_PRACTICES=true
AGENT_HOME_CONFIG_IS_SUBORDINATE=true
AGENT_GENERIC_DEFAULTS_ARE_SUBORDINATE=true
IMMUTABLE_PLATFORM_CONSTRAINTS_REMAIN_SUPERIOR=true

ON_AGENT_RULE_CONFLICT=FOLLOW_ANCLORA
ON_GENERIC_DEFAULT_CONFLICT=FOLLOW_ANCLORA
ON_HOME_CONFIG_CONFLICT=FOLLOW_ANCLORA
ON_PLATFORM_CONSTRAINT_CONFLICT=REPORT_AND_STOP_AFFECTED_ACTION

## 1. Project Identity

APPLICATION_NAME=Anclora Guesthub
REPOSITORY=anclora-guesthub
PROJECT_ROLE=Core Application (Next.js)
PRODUCT_FAMILY=Anclora Group

## 2. Mandatory Bootstrap

When starting work in this repository, agents must read sources in this exact order:

1. Current explicit instruction from Toni (highest operational priority).
2. Workspace agent policy (`../../ANCLORA_WORKSPACE_AGENT_POLICY.md` — currently `WORKSPACE_POLICY_STATUS=PENDING_GLOBAL_INSTALLATION`, with `../../AGENTS.md` as interim workspace guidance).
3. Repository agent rules (`../AGENTS.md`).
4. `.anclora/AGENT_PROJECT_CONTEXT.md` (this file — bootstrap, index, routing, and authority map).
5. `.anclora/PRODUCTION_RUNTIME.md` (canonical runtime contract: topology, database, migrations, QA, Git).
6. `.anclora/AOS_ADOPTION.md` (governance declaration, canonical AOS sources, decisions, exceptions).
7. Repository-specific agent instructions (`../CLAUDE.md`, `../GEMINI.md`, etc., when present).
8. Task-specific canonical sources (see Section 4: Task Routing).

## Authority & Precedence

ANCLORA contracts are the highest project/workspace-level operational authority.
They override agent-specific defaults, home-directory rules, generic workflows,
personal presets, and repository-agnostic conventions whenever those rules conflict
with Anclora.

Only immutable platform/system/security constraints that sit above project/user
instructions remain higher authority.

### Canonical Hierarchy of Authority:

```text
LEVEL 0: Immutable platform / system / security constraints
   ↓
LEVEL 1: Current explicit instruction from Toni for the current mission
   ↓
LEVEL 2: ANCLORA_WORKSPACE_AGENT_POLICY.md (when installed)
   ↓
LEVEL 3: Repository canonical Anclora contracts (.anclora/)
   ├── AGENT_PROJECT_CONTEXT.md (bootstrap, routing, precedence and authority map)
   ├── PRODUCTION_RUNTIME.md (runtime, infra, DB, migrations, QA, env and Git model)
   └── AOS_ADOPTION.md (governance, decisions, exceptions, AOS adoption)
   ↓
LEVEL 4: Canonical task/domain sources (SDD, Constitution, Master Decisions, Vault contracts)
   ↓
LEVEL 5: Repository adapter/instruction files (AGENTS.md, CLAUDE.md, GEMINI.md)
   ↓
LEVEL 6: Agent-specific user/home configuration (~/.claude/, ~/.codex/, ~/.gemini/, etc.)
   ↓
LEVEL 7: Generic agent defaults and conventions
   ↓
LEVEL 8: Historical / non-normative context (MEMORY.md, archives, legacy notes)
```

### Conflict Resolution Invariant:
If an agent-specific instruction, global agent preset, home-directory rule,
generic best practice, or repository-agnostic convention conflicts with an
applicable Anclora canonical contract, the Anclora contract MUST be followed.

An agent default is never sufficient justification to override an Anclora contract.
Generic reasoning such as "best practice", "safer default", "usual workflow",
"recommended pattern", or "standard agent behavior" MUST NOT override a documented
Anclora decision.

If a conflict arises with an immutable Level 0 platform security constraint:
report `ANCLORA_AUTHORITY_CONFLICT` with details and stop the affected action.

## 4. Core Project Contracts

- **PRODUCTION_RUNTIME**: [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md)
  - Governs real runtime architecture, hosting, Neon/Postgres database connection, PRISMA_MIGRATE migration strategy, auth, and production-backed local model.
- **AOS_ADOPTION**: [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md)
  - Governs AOS alignment, governance level, standards, and referenced authoritative knowledge.

## Canonical QA Bootstrap

QA governance is inherited from:
[`../../ANCLORA_WORKSPACE_AGENT_POLICY.md`](../../ANCLORA_WORKSPACE_AGENT_POLICY.md)

Default:
`QA_MODE=AUTO`

Before planning verification, classify:
- `FAST`
- `STANDARD`
- `FULL`

Task-level historical QA boilerplate does not override workspace QA classification.
Only explicit mission tokens change the mode:
- `QA_OVERRIDE=FAST`
- `QA_OVERRIDE=STANDARD`
- `QA_OVERRIDE=FULL`

Testing, lint, and build execution must follow the workspace batched execution cadence:
no repeated gates per micro-edit, and no rerun of unchanged successful gates without invalidation.
Repository-specific runtime minima are defined in [`PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md).

## 4. Task Routing

| Task Domain | Primary Authority to Read First | Secondary / Operational Sources |
| :--- | :--- | :--- |
| **Runtime / Hosting / Env** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `.env.local` (mode 0600) |
| **Database / Migrations** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `./prisma/migrations` |
| **AOS Governance** | [`.anclora/AOS_ADOPTION.md`](AOS_ADOPTION.md) | [`../../anclora-governance/`](../../anclora-governance/) |
| **Design / UI Tokens** | [`../../anclora-design-system/`](../../anclora-design-system/) | [`../../anclora-vault/00-governance/contracts/`](../../anclora-vault/00-governance/contracts/) |
| **Git Workflow** | [`.anclora/PRODUCTION_RUNTIME.md`](PRODUCTION_RUNTIME.md) | `../AGENTS.md` |

## 5. Source Authority

- Operational Rules: `../AGENTS.md`
- Governance: [`../../anclora-governance/`](../../anclora-governance/)
