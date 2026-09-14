import { NextResponse } from 'next/server'
import { isAncloraIdentityEnabled } from '@/lib/anclora-identity/env'
import { getAncloraIdentityOidcConfig, authorizationCodeGrant } from '@/lib/anclora-identity/oidcClient'
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

  const oidcConfig = await getAncloraIdentityOidcConfig()

  let tokens
  try {
    tokens = await authorizationCodeGrant(oidcConfig, new URL(request.url), {
      pkceCodeVerifier: stateCookie.codeVerifier,
      expectedState: stateCookie.state,
    })
  } catch {
    return NextResponse.json({ error: 'TOKEN_EXCHANGE_FAILED' }, { status: 400 })
  }

  const claims = tokens.claims() as unknown as AncloraIdentityClaims | undefined
  if (!claims?.sub) {
    return NextResponse.json({ error: 'INVALID_ID_TOKEN' }, { status: 400 })
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
