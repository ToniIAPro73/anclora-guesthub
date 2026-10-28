import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  isEnabled: vi.fn(),
  getConfig: vi.fn(),
  getOidcConfig: vi.fn(),
  authorizationCodeGrant: vi.fn(),
  consumeState: vi.fn(),
  createSession: vi.fn(),
}))

vi.mock('@/lib/anclora-identity/env', () => ({
  isAncloraIdentityEnabled: mocks.isEnabled,
  getAncloraIdentityConfig: mocks.getConfig,
}))
vi.mock('@/lib/anclora-identity/oidcClient', () => ({
  getAncloraIdentityOidcConfig: mocks.getOidcConfig,
  authorizationCodeGrant: mocks.authorizationCodeGrant,
  fetchUserInfo: vi.fn(),
}))
vi.mock('@/lib/anclora-identity/session', () => ({
  consumeOidcStateCookie: mocks.consumeState,
  createAncloraIdentityGuestHubSession: mocks.createSession,
}))

import { GET } from '../src/app/api/auth/anclora-identity/callback/route'

describe('GuestHub Identity callback messages', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mocks.isEnabled.mockReturnValue(true)
    mocks.getConfig.mockReturnValue({ redirectUri: 'https://guesthub.anclora.com/api/auth/anclora-identity/callback' })
    mocks.getOidcConfig.mockResolvedValue({})
    mocks.consumeState.mockResolvedValue({ state: 'state', codeVerifier: 'verifier' })
  })

  it('returns users without pilot membership to a friendly pilot access page', async () => {
    mocks.authorizationCodeGrant.mockResolvedValue({ claims: () => ({ sub: 'qa-user', application_memberships: [] }) })

    const response = await GET(new Request('https://guesthub.anclora.com/api/auth/anclora-identity/callback?code=example&state=state'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://guesthub.anclora.com/login?identity_error=membership_required')
    expect(response.headers.get('content-type')).toBeNull()
    expect(mocks.createSession).not.toHaveBeenCalled()
  })

  it('returns token exchange failures to a friendly retry page', async () => {
    mocks.authorizationCodeGrant.mockRejectedValue(new Error('invalid_client'))

    const response = await GET(new Request('https://guesthub.anclora.com/api/auth/anclora-identity/callback?code=example&state=state'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://guesthub.anclora.com/login?identity_error=exchange')
    expect(await response.text()).not.toContain('TOKEN_EXCHANGE_FAILED')
  })

  it('returns expired callback state to a friendly retry page', async () => {
    mocks.consumeState.mockResolvedValue(null)

    const response = await GET(new Request('https://guesthub.anclora.com/api/auth/anclora-identity/callback?state=expired'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://guesthub.anclora.com/login?identity_error=retry')
  })
})
