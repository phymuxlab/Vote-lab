import { updateElectionSettings } from "@/app/actions/election-settings/update";

import { getElectionSettings } from "@/lib/election-settings";

import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

export default async function ElectionSettingsPage({
  params,
}: PageProps) {
  const {
    organizationId,
    electionId,
  } = await params;

  const settings =
    await getElectionSettings(electionId);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Election Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure how voters register
          and vote.
        </p>

      </div>

      <form
        action={updateElectionSettings}
        className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >

        <input
          type="hidden"
          name="organizationId"
          value={organizationId}
        />

        <input
          type="hidden"
          name="electionId"
          value={electionId}
        />

        {/* Voting Mode */}

        <div>

          <h2 className="text-xl font-bold text-white">
            Voting Method
          </h2>

          <div className="mt-5 space-y-4">

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 p-4">

              <input
                type="radio"
                name="voting_mode"
                value="public"
                defaultChecked={
                  settings?.voting_mode !==
                  "secure_registration"
                }
              />

              <div>

                <p className="font-semibold text-white">
                  Public Voting
                </p>

                <p className="text-sm text-slate-400">
                  Anyone with the election
                  link can vote.
                </p>

              </div>

            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 p-4">

              <input
                type="radio"
                name="voting_mode"
                value="secure_registration"
                defaultChecked={
                  settings?.voting_mode ===
                  "secure_registration"
                }
              />

              <div>

                <p className="font-semibold text-white">
                  Secure Registration
                </p>

                <p className="text-sm text-slate-400">
                  Every voter must register
                  before receiving a voting
                  token.
                </p>

              </div>

            </label>

          </div>

        </div>

        {/* Registration Fields */}

        <div>

          <h2 className="text-xl font-bold text-white">
            Registration Requirements
          </h2>

          <p className="mb-4 mt-2 text-slate-400">
            Choose the information voters
            must provide.
          </p>

          <div className="grid gap-4 md:grid-cols-2">

            <label>
              <input
                type="checkbox"
                name="require_name"
                defaultChecked={
                  settings?.require_name ??
                  true
                }
              />

              <span className="ml-2">
                Full Name
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="require_email"
                defaultChecked={
                  settings?.require_email ??
                  true
                }
              />

              <span className="ml-2">
                Email Address
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="require_phone"
                defaultChecked={
                  settings?.require_phone
                }
              />

              <span className="ml-2">
                Phone Number
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="require_student_id"
                defaultChecked={
                  settings?.require_student_id
                }
              />

              <span className="ml-2">
                Student ID
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="require_employee_id"
                defaultChecked={
                  settings?.require_employee_id
                }
              />

              <span className="ml-2">
                Employee ID
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="require_national_id"
                defaultChecked={
                  settings?.require_national_id
                }
              />

              <span className="ml-2">
                National ID
              </span>
            </label>

          </div>

        </div>

        {/* Unique Identifier */}

        <div>

          <h2 className="text-xl font-bold text-white">
            Unique Identifier
          </h2>

          <p className="mt-2 mb-4 text-slate-400">
            Prevent duplicate voter registrations.
          </p>

          <select
            name="unique_identifier"
            defaultValue={
              settings?.unique_identifier ??
              "email"
            }
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          >

            <option value="email">
              Email Address
            </option>

            <option value="phone">
              Phone Number
            </option>

            <option value="student_id">
              Student ID
            </option>

            <option value="employee_id">
              Employee ID
            </option>

            <option value="national_id">
              National ID
            </option>

          </select>

        </div>

        <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
          Save Changes
        </Button>

      </form>

    </div>
  );
}