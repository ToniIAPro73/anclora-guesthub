/**
 * Anclora Identity GuestHub integration — configuration.
 * Fail-closed switch: when ANCLORA_IDENTITY_ENABLED is not exactly 'true',
 * legacy auth functions as before. When it is 'true', configuration must be complete.
 */

export function isAncloraIdentityEnabled(): boolean {
  return process.env.ANCLORA_IDENTITY_ENABLED === 'true'
}

export interface AncloraIdentityConfig {
  issuerUrl: string
  clientId: string
  clientSecret: string
  redirectUri: string
  sessionSecret: string
}

export function getAncloraIdentityConfig(): AncloraIdentityConfig {
  const issuerUrl = process.env.ANCLORA_IDENTITY_ISSUER_URL?.trim()
  const clientId = process.env.ANCLORA_IDENTITY_CLIENT_ID?.trim()
  const clientSecret = process.env.ANCLORA_IDENTITY_CLIENT_SECRET?.trim()
  const redirectUri = process.env.ANCLORA_IDENTITY_REDIRECT_URI?.trim()
  const sessionSecret = process.env.ANCLORA_IDENTITY_SESSION_SECRET?.trim() || process.env.GUESTHUB_SESSION_SECRET?.trim()

  const missing = Object.entries({ issuerUrl, clientId, clientSecret, redirectUri, sessionSecret })
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `ANCLORA_IDENTITY_ENABLED=true but missing required configuration: ${missing.join(', ')}. Refusing to start with a partially-configured Anclora Identity integration.`,
    )
  }

  return { issuerUrl: issuerUrl!, clientId: clientId!, clientSecret: clientSecret!, redirectUri: redirectUri!, sessionSecret: sessionSecret! }
}
