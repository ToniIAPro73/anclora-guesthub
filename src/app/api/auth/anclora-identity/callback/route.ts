import { NextResponse } from 'next/server'
import { isAncloraIdentityEnabled, getAncloraIdentityConfig } from '@/lib/anclora-identity/env'
import { getAncloraIdentityOidcConfig, authorizationCodeGrant, fetchUserInfo } from '@/lib/anclora-identity/oidcClient'
import { consumeOidcStateCookie, createAncloraIdentityGuestHubSession } from '@/lib/anclora-identity/session'
import { resolveGuestHubAccess, type AncloraIdentityClaims } from '@/lib/anclora-identity/authorization'

export async function GET(request: Request) {
  if (!isAncloraIdentityEnabled()) {
    return NextResponse.json({ error: 'ANCLORA_IDENTITY_DISABLED' }, { status: 404 })
  }

  const stateCookie = await consumeOidcStateCookie()
  if (!stateCookie) {
    return NextResponse.json({ error: 'INVALID_OIDC_STATE' }, { status: 400 })
  }

  const { redirectUri } = getAncloraIdentityConfig()
  const oidcConfig = await getAncloraIdentityOidcConfig()

  const callbackUrl = new URL(redirectUri)
  new URL(request.url).searchParams.forEach((val, key) => callbackUrl.searchParams.set(key, val))

  let tokens
  try {
    tokens = await authorizationCodeGrant(oidcConfig, callbackUrl, {
      pkceCodeVerifier: stateCookie.codeVerifier,
      expectedState: stateCookie.state,
    })
  } catch {
    return NextResponse.json({ error: 'TOKEN_EXCHANGE_FAILED' }, { status: 400 })
  }

  const idClaims = tokens.claims() as unknown as AncloraIdentityClaims | undefined
  if (!idClaims?.sub) {
    return NextResponse.json({ error: 'INVALID_ID_TOKEN' }, { status: 400 })
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
    // Authenticated identity, no GuestHub membership: explicit 403, never an infinite loop
    return NextResponse.json({ error: 'ACCESS_DENIED', message: 'User does not have an active GuestHub membership' }, { status: 403 })
  }

  await createAncloraIdentityGuestHubSession({
    sub: claims.sub,
    name: claims.name ?? claims.email ?? claims.sub,
    email: claims.email ?? '',
    decision,
  })

  return NextResponse.redirect(new URL('/', request.url))
}
