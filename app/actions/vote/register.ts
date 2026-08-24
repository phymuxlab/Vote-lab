"use server";

import { registerVoter } from "@/lib/voters";
import { generateVotingToken } from "@/lib/voter-tokens";

export interface RegisterVoterState {
  success: boolean;
  message?: string;
  token?: string;
  electionId?: string;
}

export async function registerVoterAction(
  prevState: RegisterVoterState,
  formData: FormData
): Promise<RegisterVoterState> {
  const electionId = String(
    formData.get("election_id") ?? ""
  ).trim();

  if (!electionId) {
    return {
      success: false,
      message: "Invalid election.",
    };
  }

  const fullName = String(
    formData.get("full_name") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const phone = String(
    formData.get("phone") ?? ""
  ).trim();

  const studentId = String(
    formData.get("student_id") ?? ""
  ).trim();

  const employeeId = String(
    formData.get("employee_id") ?? ""
  ).trim();

  const nationalId = String(
    formData.get("national_id") ?? ""
  ).trim();

  try {
    console.log("========== REGISTER VOTER ==========");
    console.log("Election:", electionId);
    console.log("Email:", email);

    const voter = await registerVoter({
      election_id: electionId,

      full_name:
        fullName || undefined,

      email:
        email || undefined,

      phone:
        phone || undefined,

      student_id:
        studentId || undefined,

      employee_id:
        employeeId || undefined,

      national_id:
        nationalId || undefined,
    });

    console.log(
      "Voter created:",
      voter.id
    );

    const token =
      await generateVotingToken(
        voter.election_id,
        voter.id
      );

    console.log(
      "Voting token created:",
      token.id
    );

    /*
     * IMPORTANT:
     * We intentionally return the token instead
     * of redirecting.
     *
     * The token will be shown in the success
     * popup on the registration page.
     *
     * It is NOT placed in the URL.
     */

    return {
      success: true,
      token: token.token,
      electionId: voter.election_id,
      message:
        "Registration successful. Your voting token has been generated.",
    };

  } catch (error) {
    console.error(
      "REGISTER VOTER ERROR:",
      error
    );

    if (
      error instanceof Error &&
      error.message.includes(
        "already registered"
      )
    ) {
      return {
        success: false,
        message:
          "You have already registered for this election. Please use your voting token to continue.",
      };
    }

    return {
      success: false,
      message:
        "Unable to complete registration. Please check your details and try again.",
    };
  }
}