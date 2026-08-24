import { createClient } from "@/lib/supabase/server";

export interface RegisterVoterData {
  election_id: string;

  full_name?: string;

  email?: string;

  phone?: string;

  student_id?: string;

  employee_id?: string;

  national_id?: string;
}

/**
 * Allowed unique identifier fields.
 */
const ALLOWED_IDENTIFIER_FIELDS = [
  "email",
  "phone",
  "student_id",
  "employee_id",
  "national_id",
];

/**
 * Get election settings.
 */
export async function getElectionSettings(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_settings")
    .select("*")
    .eq("election_id", electionId)
    .single();

  if (error) {
    console.error(
      "GET ELECTION SETTINGS ERROR:",
      error
    );

    throw error;
  }

  return data;
}

/**
 * Normalize identifier values before checking.
 *
 * Email is converted to lowercase.
 * Other identifiers are trimmed.
 */
export function normalizeIdentifier(
  field: string,
  value: string
) {
  const normalized = value.trim();

  if (field === "email") {
    return normalized.toLowerCase();
  }

  return normalized;
}

/**
 * Check whether a unique identifier
 * is already registered for an election.
 */
export async function checkUniqueIdentifier(
  electionId: string,
  field: string,
  value: string
) {
  const supabase = await createClient();

  const normalizedValue =
    normalizeIdentifier(field, value);

  if (
    !electionId ||
    !field ||
    !normalizedValue
  ) {
    return {
      available: false,
      message:
        "Please enter a valid identifier.",
    };
  }

  if (
    !ALLOWED_IDENTIFIER_FIELDS.includes(
      field
    )
  ) {
    return {
      available: false,
      message: "Invalid identifier.",
    };
  }

  const { data, error } = await supabase
    .from("voters")
    .select("id")
    .eq("election_id", electionId)
    .eq(field, normalizedValue)
    .limit(1);

  if (error) {
    console.error(
      "CHECK UNIQUE IDENTIFIER ERROR:",
      error
    );

    return {
      available: false,
      message:
        "Unable to check identifier. Please try again.",
    };
  }

  if (data && data.length > 0) {
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
}

/**
 * Check if voter already exists.
 *
 * Uses the exact same normalization
 * as checkUniqueIdentifier().
 */
export async function voterExists(
  electionId: string,
  field: string,
  value: string
) {
  if (
    !ALLOWED_IDENTIFIER_FIELDS.includes(
      field
    )
  ) {
    throw new Error(
      "Invalid identifier field."
    );
  }

  const supabase = await createClient();

  const normalizedValue =
    normalizeIdentifier(field, value);

  const { data, error } = await supabase
    .from("voters")
    .select("id")
    .eq("election_id", electionId)
    .eq(field, normalizedValue)
    .limit(1);

  if (error) {
    console.error(
      "VOTER EXISTS ERROR:",
      error
    );

    throw error;
  }

  return !!(
    data &&
    data.length > 0
  );
}

/**
 * Register voter.
 *
 * This version contains temporary diagnostics
 * to identify which Supabase request is causing
 * ECONNRESET.
 */
export async function registerVoter(
  voter: RegisterVoterData
) {
  console.log(
    "========== REGISTER VOTER =========="
  );

  console.log(
    "Election:",
    voter.election_id
  );

  console.log(
    "Email:",
    voter.email
  );

  /*
   * STEP 1
   *
   * Get election settings.
   */
  console.log(
    "STEP 1: Fetching election settings..."
  );

  let settings;

  try {
    settings =
      await getElectionSettings(
        voter.election_id
      );

    console.log(
      "STEP 1 SUCCESS:",
      settings
    );
  } catch (error) {
    console.error(
      "STEP 1 FAILED:",
      error
    );

    throw error;
  }

  /*
   * Determine the configured
   * unique identifier.
   */
  const uniqueField =
    settings.unique_identifier;

  console.log(
    "Unique field:",
    uniqueField
  );

  if (
    !ALLOWED_IDENTIFIER_FIELDS.includes(
      uniqueField
    )
  ) {
    throw new Error(
      `Invalid unique identifier configured: ${uniqueField}`
    );
  }

  const uniqueValue =
    (voter as any)[uniqueField];

  console.log(
    "Unique value:",
    uniqueValue
  );

  if (!uniqueValue) {
    throw new Error(
      `${uniqueField} is required.`
    );
  }

  /*
   * Normalize all identifiers
   * before inserting.
   */
  const normalizedVoter = {
    ...voter,

    email: voter.email
      ? normalizeIdentifier(
          "email",
          voter.email
        )
      : undefined,

    phone: voter.phone
      ? normalizeIdentifier(
          "phone",
          voter.phone
        )
      : undefined,

    student_id: voter.student_id
      ? normalizeIdentifier(
          "student_id",
          voter.student_id
        )
      : undefined,

    employee_id:
      voter.employee_id
        ? normalizeIdentifier(
            "employee_id",
            voter.employee_id
          )
        : undefined,

    national_id:
      voter.national_id
        ? normalizeIdentifier(
            "national_id",
            voter.national_id
          )
        : undefined,
  };

  const normalizedUniqueValue =
    (normalizedVoter as any)[
      uniqueField
    ];

  if (!normalizedUniqueValue) {
    throw new Error(
      `${uniqueField} is required.`
    );
  }

  /*
   * STEP 2
   *
   * Check database again.
   *
   * This protects us even if the frontend
   * identifier checker says the identifier
   * is available.
   */
  console.log(
    "STEP 2: Checking existing voter..."
  );

  try {
    const exists =
      await voterExists(
        voter.election_id,
        uniqueField,
        normalizedUniqueValue
      );

    if (exists) {
      console.log(
        "STEP 2 RESULT: Voter already exists."
      );

      throw new Error(
        "You have already registered for this election."
      );
    }

    console.log(
      "STEP 2 SUCCESS: Identifier available."
    );
  } catch (error) {
    console.error(
      "STEP 2 FAILED:",
      error
    );

    throw error;
  }

  /*
   * STEP 3
   *
   * Insert voter into database.
   */
  console.log(
    "STEP 3: Inserting voter..."
  );

  const supabase =
    await createClient();

  try {
    const {
      data,
      error,
    } = await supabase
      .from("voters")
      .insert(normalizedVoter)
      .select()
      .single();

    if (error) {
      console.error(
        "STEP 3 DATABASE ERROR:",
        error
      );

      throw error;
    }

    console.log(
      "STEP 3 SUCCESS: Voter created:",
      data.id
    );

    return data;
  } catch (error) {
    console.error(
      "STEP 3 FAILED:",
      error
    );

    throw error;
  }
}