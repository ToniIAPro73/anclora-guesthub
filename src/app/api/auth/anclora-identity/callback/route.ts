import { NextResponse } from 'next/server'
import { isAncloraIdentityEnabled, getAncloraIdentityConfig } from '@/lib/anclora-identity/env'
import { getAncloraIdentityOidcConfig, authorizationCodeGrant, fetchUserInfo } from '@/lib/anclora-identity/oidcClient'
import { consumeOidcStateCookie, createAncloraIdentityGuestHubSession } from '@/lib/anclora-identity/session'
import { resolveGuestHubAccess, type AncloraIdentityClaims } from '@/lib/anclora-identity/authorization'

export async function GET(request: Request) {
  if (!isAncloraIdentityEnabled()) {
    return redirectIdentityError(request.url, 'unavailable')
  }

  const stateCookie = await consumeOidcStateCookie()
  if (!stateCookie) {
    return redirectIdentityError(request.url, 'retry')
  }

  let redirectUri: string
  let oidcConfig
  try {
    ({ redirectUri } = getAncloraIdentityConfig())
    oidcConfig = await getAncloraIdentityOidcConfig()
  } catch {
    return redirectIdentityError(request.url, 'unavailable')
  }

  const callbackUrl = new URL(redirectUri)
  new URL(request.url).searchParams.forEach((val, key) => callbackUrl.searchParams.set(key, val))

  let tokens
  try {
    tokens = await authorizationCodeGrant(oidcConfig, callbackUrl, {
      pkceCodeVerifier: stateCookie.codeVerifier,
      expectedState: stateCookie.state,
    })
  } catch (error) {
    const safeCode = getSafeOidcErrorCode(error)
    console.error('[guesthub-auth] Identity token exchange failed', { code: safeCode })
    return redirectIdentityError(request.url, 'exchange')
  }

  const idClaims = tokens.claims() as unknown as AncloraIdentityClaims | undefined
  if (!idClaims?.sub) {
    return redirectIdentityError(request.url, 'retry')
  }

  let userInfoClaims: Partial<AncloraIdentityClaims> = {}
  if (tokens.access_token) {
    try {
      userInfoClaims = (await fetchUserInfo(oidcConfig, tokens.access_token, idClaims.sub)) as unknown as Partial<AncloraIdentityClaims>
    } catch {
      // Proceed with idClaims
    }
  }

  const claims: AncloraIdentityClaims = {
    ...idClaims,
    ...userInfoClaims,
  }

  const decision = resolveGuestHubAccess(claims)

  if (!decision.allowed) {
    return redirectIdentityError(request.url, 'membership_required')
  }

  await createAncloraIdentityGuestHubSession({
    sub: claims.sub,
    name: claims.name ?? claims.email ?? claims.sub,
    email: claims.email ?? '',
    decision,
  })

  return NextResponse.redirect(new URL('/', request.url))
}

function redirectIdentityError(requestUrl: string, error: 'exchange' | 'membership_required' | 'retry' | 'unavailable') {
  const destination = new URL('/login', requestUrl)
  destination.searchParams.set('identity_error', error)
  return NextResponse.redirect(destination)
}

function getSafeOidcErrorCode(error: unknown): string {
  if (!error || typeof error !== 'object' || !('error' in error)) return 'other'
  const code = error.error
  const knownCodes = new Set([
    'invalid_client',
    'invalid_grant',
    'invalid_request',
    'unauthorized_client',
    'invalid_scope',
    'server_error',
    'temporarily_unavailable',
  ])
  return typeof code === 'string' && knownCodes.has(code) ? code : 'other'
}
