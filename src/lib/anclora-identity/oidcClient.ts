import * as client from 'openid-client'
import { getAncloraIdentityConfig } from './env'

let cachedConfig: client.Configuration | undefined

/**
 * Lazily discovers and caches the OIDC configuration for Anclora Identity.
 * Uses the standard Authorization Code + PKCE flow via `openid-client`.
 */
export async function getAncloraIdentityOidcConfig(): Promise<client.Configuration> {
  if (cachedConfig) return cachedConfig

  const { issuerUrl, clientId, clientSecret } = getAncloraIdentityConfig()
  cachedConfig = await client.discovery(new URL(issuerUrl), clientId, clientSecret, client.ClientSecretBasic(clientSecret))
  return cachedConfig
}

export function buildLoginRedirect(config: client.Configuration, params: { redirectUri: string; state: string; codeChallenge: string }): URL {
  return client.buildAuthorizationUrl(config, {
    redirect_uri: params.redirectUri,
    scope: 'openid profile email anclora_platform',
    code_challenge: params.codeChallenge,
    code_challenge_method: 'S256',
    state: params.state,
  })
}

export const randomPKCECodeVerifier = client.randomPKCECodeVerifier
export const calculatePKCECodeChallenge = client.calculatePKCECodeChallenge
export const randomState = client.randomState
export const authorizationCodeGrant = client.authorizationCodeGrant
