import { createAdminClient } from "@/lib/supabase/admin";

export interface RegisterVoterData {
  election_id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  student_id?: string;
  employee_id?: string;
  national_id?: string;
}

const ALLOWED_IDENTIFIER_FIELDS = ["email", "phone", "student_id", "employee_id", "national_id"] as const;
type IdentifierField = (typeof ALLOWED_IDENTIFIER_FIELDS)[number];

export async function getElectionSettings(electionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("election_settings").select("*").eq("election_id", electionId).single();
  if (error) throw error;
  return data;
}

export function normalizeIdentifier(field: string, value: string) {
  const normalized = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return field === "email" ? normalized.toLowerCase() : normalized;
}

export async function checkUniqueIdentifier(electionId: string, field: string, value: string) {
  if (!ALLOWED_IDENTIFIER_FIELDS.includes(field as IdentifierField)) return { available: false, message: "Invalid identifier." };
  const normalized = normalizeIdentifier(field, value);
  if (!electionId || !normalized) return { available: false, message: "Please enter a valid identifier." };

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("voters").select("id").eq("election_id", electionId).eq(field, normalized).limit(1);
  if (error) return { available: false, message: "Unable to check identifier." };
  return data?.length ? { available: false, message: "This identifier is not available for registration." } : { available: true, message: "Identifier available." };
}

export async function voterExists(electionId: string, field: string, value: string) {
  if (!ALLOWED_IDENTIFIER_FIELDS.includes(field as IdentifierField)) throw new Error("Invalid identifier field.");
  const supabase = createAdminClient();
  const normalized = normalizeIdentifier(field, value);
  const { data, error } = await supabase.from("voters").select("id").eq("election_id", electionId).eq(field, normalized).limit(1);
  if (error) throw error;
  return Boolean(data?.length);
}

export async function registerVoter(voter: RegisterVoterData) {
  const supabase = createAdminClient();
  const { data: election, error: electionError } = await supabase
    .from("elections")
    .select("id, is_published, status, start_date, end_date")
    .eq("id", voter.election_id)
    .maybeSingle();

  if (electionError || !election) throw new Error("Election not found.");
  if (!election.is_published || !["published", "active"].includes(election.status)) {
    throw new Error("This election is not currently open for registration.");
  }
  const now = new Date();
  if (new Date(election.start_date) > now) throw new Error("Registration is not open yet.");
  if (new Date(election.end_date) <= now) throw new Error("This election has ended.");

  const settings = await getElectionSettings(voter.election_id);
  if (settings.voting_mode !== "secure_registration") throw new Error("This election does not use secure voter registration.");
  if (settings.require_name && !voter.full_name) throw new Error("Full name is required.");
  if (settings.require_email && !voter.email) throw new Error("Email is required.");
  if (settings.require_phone && !voter.phone) throw new Error("Phone number is required.");
  if (settings.require_student_id && !voter.student_id) throw new Error("Student ID is required.");
  if (settings.require_employee_id && !voter.employee_id) throw new Error("Employee ID is required.");
  if (settings.require_national_id && !voter.national_id) throw new Error("National ID is required.");

  const configuredIdentifier = settings.unique_identifier;
  if (!ALLOWED_IDENTIFIER_FIELDS.includes(configuredIdentifier as IdentifierField)) {
    throw new Error("Invalid unique identifier configured.");
  }
  const uniqueField = configuredIdentifier as IdentifierField;

  const uniqueValue = voter[uniqueField];
  if (!uniqueValue) throw new Error(`${uniqueField} is required.`);

  const normalizedVoter = {
    ...voter,
    full_name: voter.full_name?.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 120),
    email: voter.email ? normalizeIdentifier("email", voter.email).slice(0, 254) : undefined,
    phone: voter.phone ? normalizeIdentifier("phone", voter.phone).slice(0, 40) : undefined,
    student_id: voter.student_id ? normalizeIdentifier("student_id", voter.student_id).slice(0, 80) : undefined,
    employee_id: voter.employee_id ? normalizeIdentifier("employee_id", voter.employee_id).slice(0, 80) : undefined,
    national_id: voter.national_id ? normalizeIdentifier("national_id", voter.national_id).slice(0, 80) : undefined,
  };

  if (await voterExists(voter.election_id, uniqueField, normalizedVoter[uniqueField] ?? "")) {
    throw new Error("You have already registered for this election.");
  }

  const { data, error } = await supabase.from("voters").insert(normalizedVoter).select("id, election_id").single();
  if (error) throw error;
  return data;
}
