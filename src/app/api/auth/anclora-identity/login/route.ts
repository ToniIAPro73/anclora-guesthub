import { NextResponse } from 'next/server'
import { isAncloraIdentityEnabled, getAncloraIdentityConfig } from '@/lib/anclora-identity/env'
import { getAncloraIdentityOidcConfig, buildLoginRedirect, randomPKCECodeVerifier, calculatePKCECodeChallenge, randomState } from '@/lib/anclora-identity/oidcClient'
import { storeOidcStateCookie } from '@/lib/anclora-identity/session'

export async function GET() {
  if (!isAncloraIdentityEnabled()) {
    return NextResponse.json({ error: 'ANCLORA_IDENTITY_DISABLED' }, { status: 404 })
  }

  const { redirectUri } = getAncloraIdentityConfig()
  const oidcConfig = await getAncloraIdentityOidcConfig()

  const codeVerifier = randomPKCECodeVerifier()
  const codeChallenge = await calculatePKCECodeChallenge(codeVerifier)
  const state = randomState()

  await storeOidcStateCookie({ state, codeVerifier })

  const redirectTo = buildLoginRedirect(oidcConfig, { redirectUri, state, codeChallenge })
  return NextResponse.redirect(redirectTo)
}
