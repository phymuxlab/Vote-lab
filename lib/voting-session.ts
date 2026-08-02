import { cookies } from "next/headers";

const COOKIE_NAME = "votelab_verified";

export async function createVotingSession(
  electionId: string,
  tokenId: string
) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${electionId}:${tokenId}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
}

export async function getVotingSession() {
  const cookieStore = await cookies();

  const value =
    cookieStore.get(COOKIE_NAME)?.value;

  if (!value) return null;

  const [electionId, tokenId] =
    value.split(":");

  return {
    electionId,
    tokenId,
  };
}

export async function clearVotingSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}