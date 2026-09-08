import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const USER_SESSION_COOKIE = "aegis_bay_user_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

type UserSessionPayload = {
  userId: number;
  expiresAt: string;
};

async function encrypt(payload: UserSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecretKey());
}

export async function decryptUserSession(
  session: string | undefined
): Promise<UserSessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as UserSessionPayload;
  } catch {
    return null;
  }
}

export async function createUserSession(userId: number) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await encrypt({ userId, expiresAt: expiresAt.toISOString() });
  const cookieStore = await cookies();

  cookieStore.set(USER_SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
}

export async function getUserSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(USER_SESSION_COOKIE)?.value;
}

export { USER_SESSION_COOKIE };
