import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "votelab_verified";
const MAX_AGE = 60 * 60;

type Session = { electionId: string; voterId: string; tokenId: string };

function secret() {
  const value = process.env.VOTELAB_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) throw new Error("Voting session secret is not configured.");
  return value;
}

function encode(payload: Session) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function decode(value: string): Session | null {
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Session;
    if (!parsed.electionId || !parsed.voterId || !parsed.tokenId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function createVotingSession(electionId: string, voterId: string, tokenId: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encode({ electionId, voterId, tokenId }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function getVotingSession() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return null;
  return decode(value);
}

export async function clearVotingSession() {
  (await cookies()).delete(COOKIE_NAME);
}
