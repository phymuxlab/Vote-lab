import NomineeCard from "./NomineeCard";

interface Nominee {
  id: string;
  full_name: string;
  biography?: string | null;
  image_url?: string | null;
}

interface Category {
  id: string;
  name: string;
  description?: string | null;
  max_votes: number;
  nominees: Nominee[];
}

interface CategoryStepProps {
  category: Category;
  selectedNominee?: string;
  onSelect: (
    categoryId: string,
    nomineeId: string
  ) => void;
}

export default function CategoryStep({
  category,
  selectedNominee,
  onSelect,
}: CategoryStepProps) {
  return (
    <section className="space-y-10">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-white">
          {category.name}
        </h1>

        {category.description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            {category.description}
          </p>
        )}

        <p className="mt-4 text-cyan-400">
          Select up to {category.max_votes} candidate
          {category.max_votes > 1 ? "s" : ""}
        </p>

      </div>

      {category.nominees.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 p-12 text-center">

          <h3 className="text-xl font-semibold text-white">
            No nominees available
          </h3>

          <p className="mt-2 text-slate-400">
            This category has no nominees yet.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {category.nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              selected={
                selectedNominee === nominee.id
              }
              onSelect={() =>
                onSelect(
                  category.id,
                  nominee.id
                )
              }
            />
          ))}

        </div>
      )}

    </section>
  );
}