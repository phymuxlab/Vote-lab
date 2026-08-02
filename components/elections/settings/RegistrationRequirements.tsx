interface RegistrationRequirementsProps {
  defaults?: {
    require_name?: boolean;
    require_email?: boolean;
    require_phone?: boolean;
    require_student_id?: boolean;
    require_employee_id?: boolean;
    require_national_id?: boolean;
  };
}

export default function RegistrationRequirements({
  defaults = {},
}: RegistrationRequirementsProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Registration Requirements
      </h2>

      <p className="mt-2 text-slate-400">
        Select the information every voter must provide before voting.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_name"
            defaultChecked={defaults.require_name ?? true}
          />
          <span className="text-white">
            Full Name
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_email"
            defaultChecked={defaults.require_email ?? true}
          />
          <span className="text-white">
            Email Address
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_phone"
            defaultChecked={defaults.require_phone ?? false}
          />
          <span className="text-white">
            Phone Number
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_student_id"
            defaultChecked={defaults.require_student_id ?? false}
          />
          <span className="text-white">
            Student ID
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_employee_id"
            defaultChecked={defaults.require_employee_id ?? false}
          />
          <span className="text-white">
            Employee ID
          </span>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 p-4 hover:border-cyan-500 transition">
          <input
            type="checkbox"
            name="require_national_id"
            defaultChecked={defaults.require_national_id ?? false}
          />
          <span className="text-white">
            National ID
          </span>
        </label>

      </div>

    </div>
  );
}