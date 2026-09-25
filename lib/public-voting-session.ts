import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const COOKIE_NAME = "votelab_public_ballot";
const MAX_AGE = 60 * 60 * 24 * 30;

type PublicBallot = { electionId: string; nonce: string };

function secret() {
  const value =
    process.env.VOTELAB_SESSION_SECRET ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) throw new Error("Voting session secret is not configured.");
  return value;
}

function sign(body: string) {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

function decode(value: string): PublicBallot | null {
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as PublicBallot;
    if (!parsed.electionId || !parsed.nonce || parsed.nonce.length < 16) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getOrCreatePublicBallot(electionId: string) {
  const store = await cookies();
  const current = store.get(COOKIE_NAME)?.value;

  if (current) {
    const parsed = decode(current);
    if (parsed?.electionId === electionId) {
      const admin = createAdminClient();
      const { data: existing } = await admin
        .from("public_ballots")
        .select("id")
        .eq("election_id", electionId)
        .eq("ballot_nonce", parsed.nonce)
        .maybeSingle();

      return { nonce: parsed.nonce, existing: Boolean(existing) };
    }
  }

  const payload: PublicBallot = { electionId, nonce: randomUUID() };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  store.set(COOKIE_NAME, `${body}.${sign(body)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });

  return { nonce: payload.nonce, existing: false };
}
