import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";
import { isAncloraIdentityEnabled } from "@/lib/anclora-identity/env";
import { clearAncloraIdentityGuestHubSession } from "@/lib/anclora-identity/session";

export async function POST() {
  const response = clearSessionCookie(NextResponse.json({ ok: true }));
  if (isAncloraIdentityEnabled()) await clearAncloraIdentityGuestHubSession();
  return response;
}
