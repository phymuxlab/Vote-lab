interface UniqueIdentifierProps {
  defaultValue?: string;
}

const options = [
  {
    value: "email",
    label: "Email Address",
    description: "Each email address can only register once.",
  },
  {
    value: "phone",
    label: "Phone Number",
    description: "Each phone number can only register once.",
  },
  {
    value: "student_id",
    label: "Student ID",
    description: "Ideal for schools and universities.",
  },
  {
    value: "employee_id",
    label: "Employee ID",
    description: "Ideal for companies and organizations.",
  },
  {
    value: "national_id",
    label: "National ID",
    description: "Use a government-issued ID as the unique identifier.",
  },
];

export default function UniqueIdentifier({
  defaultValue = "email",
}: UniqueIdentifierProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Unique Identifier
      </h2>

      <p className="mt-2 text-slate-400">
        Select the field that uniquely identifies each voter.
      </p>

      <div className="mt-8 space-y-4">

        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-700 p-5 transition hover:border-cyan-500"
          >
            <input
              type="radio"
              name="unique_identifier"
              value={option.value}
              defaultChecked={
                defaultValue === option.value
              }
              className="mt-1"
            />

            <div>

              <h3 className="font-semibold text-white">
                {option.label}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {option.description}
              </p>

            </div>

          </label>
        ))}

      </div>

    </div>
  );
}