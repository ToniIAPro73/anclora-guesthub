/**
 * GuestHub's local mapping from Anclora Identity claims to an access decision.
 * Mirrors the canonical pattern established in anclora-data-lab.
 *
 * `GROUP_OWNER` grants full access without requiring a GuestHub membership;
 * anyone else needs `application_memberships` to include `'guesthub'`.
 */

export const GUESTHUB_APPLICATION_ID = 'guesthub'

export interface AncloraIdentityClaims {
  sub: string
  name?: string
  email?: string
  platform_roles?: string[]
  application_memberships?: string[]
}

export type GuestHubAccessDecision =
  | { allowed: true; reason: 'GUESTHUB_FULL_ACCESS' }
  | { allowed: true; reason: 'APPLICATION_MEMBERSHIP' }
  | { allowed: false; reason: 'NO_MEMBERSHIP' }

export function resolveGuestHubAccess(claims: AncloraIdentityClaims): GuestHubAccessDecision {
  const platformRoles = claims.platform_roles ?? []
  const memberships = claims.application_memberships ?? []

  if (platformRoles.includes('GROUP_OWNER')) {
    return { allowed: true, reason: 'GUESTHUB_FULL_ACCESS' }
  }

  if (memberships.includes(GUESTHUB_APPLICATION_ID) || memberships.includes('syncxml')) {
    return { allowed: true, reason: 'APPLICATION_MEMBERSHIP' }
  }

  return { allowed: false, reason: 'NO_MEMBERSHIP' }
}
