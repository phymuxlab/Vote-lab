import Image from "next/image";

interface ElectionHeroProps {
  title: string;
  description: string | null;
  organizationName: string;
  logo?: string | null;
}

export default function ElectionHero({
  title,
  description,
  organizationName,
  logo,
}: ElectionHeroProps) {
  return (
    <section className="text-center">

      {logo ? (
        <div className="mb-6 flex justify-center">
          <Image
            src={logo}
            alt={organizationName}
            width={100}
            height={100}
            className="rounded-full border-4 border-cyan-500 bg-white object-cover shadow-lg"
          />
        </div>
      ) : (
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-500 bg-slate-800 text-4xl">
          🗳️
        </div>
      )}

      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
        Powered by Vote Lab
      </p>

      <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-3 text-lg font-medium text-cyan-400">
        {organizationName}
      </p>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          {description}
        </p>
      )}
    </section>
  );
}