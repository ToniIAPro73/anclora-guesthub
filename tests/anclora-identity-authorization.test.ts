import { describe, expect, it } from 'vitest'
import { resolveGuestHubAccess } from '@/lib/anclora-identity/authorization'

describe('Anclora Identity — GuestHub authorization', () => {
  it('GROUP_OWNER gets full GuestHub access with no membership required', () => {
    const decision = resolveGuestHubAccess({
      sub: 'owner-1',
      platform_roles: ['GROUP_OWNER'],
      application_memberships: [],
    })
    expect(decision).toEqual({ allowed: true, reason: 'GUESTHUB_FULL_ACCESS' })
  })

  it('a user with a guesthub membership is allowed', () => {
    const decision = resolveGuestHubAccess({
      sub: 'user-1',
      platform_roles: ['USER'],
      application_memberships: ['guesthub'],
    })
    expect(decision).toEqual({ allowed: true, reason: 'APPLICATION_MEMBERSHIP' })
  })

  it('a user with a legacy syncxml membership is allowed', () => {
    const decision = resolveGuestHubAccess({
      sub: 'user-legacy',
      platform_roles: ['USER'],
      application_memberships: ['syncxml'],
    })
    expect(decision).toEqual({ allowed: true, reason: 'APPLICATION_MEMBERSHIP' })
  })

  it('an authenticated user with NO guesthub membership is denied (ACCESS_DENIED)', () => {
    const decision = resolveGuestHubAccess({
      sub: 'user-2',
      platform_roles: ['USER'],
      application_memberships: ['data-lab', 'synergi'],
    })
    expect(decision).toEqual({ allowed: false, reason: 'NO_MEMBERSHIP' })
  })

  it('missing claims default to denied rather than throwing', () => {
    const decision = resolveGuestHubAccess({ sub: 'user-3' })
    expect(decision).toEqual({ allowed: false, reason: 'NO_MEMBERSHIP' })
  })

  it('PLATFORM_ADMIN alone (without GROUP_OWNER or guesthub membership) is denied', () => {
    const decision = resolveGuestHubAccess({
      sub: 'user-4',
      platform_roles: ['PLATFORM_ADMIN'],
      application_memberships: [],
    })
    expect(decision).toEqual({ allowed: false, reason: 'NO_MEMBERSHIP' })
  })
})
