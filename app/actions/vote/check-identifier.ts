"use server";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  normalizeIdentifier,
} from "@/lib/voters";

export interface CheckIdentifierResult {
  available: boolean;
  message: string;
}

export async function checkIdentifierAction(
  electionId: string,
  field: string,
  value: string
): Promise<CheckIdentifierResult> {
  const normalizedValue =
    normalizeIdentifier(
      field,
      value
    );

  if (!electionId) {
    return {
      available: false,
      message: "Invalid election.",
    };
  }

  if (!field) {
    return {
      available: false,
      message: "Invalid identifier.",
    };
  }

  if (!normalizedValue) {
    return {
      available: false,
      message:
        "Enter your identifier.",
    };
  }

  const allowedFields = [
    "email",
    "phone",
    "student_id",
    "employee_id",
    "national_id",
  ];

  if (!allowedFields.includes(field)) {
    return {
      available: false,
      message:
        "Invalid identifier type.",
    };
  }

  try {
    const supabase =
      await createClient();

    const { data, error } =
      await supabase
        .from("voters")
        .select("id")
        .eq(
          "election_id",
          electionId
        )
        .eq(
          field,
          normalizedValue
        )
        .maybeSingle();

    if (error) {
      console.error(
        "CHECK IDENTIFIER ERROR:",
        error
      );

      return {
        available: false,
        message:
          "Unable to check this identifier. Please try again.",
      };
    }

    if (data) {
      return {
        available: false,
        message:
          "This identifier is already registered for this election.",
      };
    }

    return {
      available: true,
      message:
        "Identifier available. You can continue.",
    };
  } catch (error) {
    console.error(
      "CHECK IDENTIFIER EXCEPTION:",
      error
    );

    return {
      available: false,
      message:
        "Unable to check this identifier. Please try again.",
    };
  }
}