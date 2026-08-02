import {
  ShieldCheck,
  KeyRound,
  BarChart3,
  Zap,
} from "lucide-react";

export default function ElectionFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Voting",
      description:
        "Every vote is securely recorded and protected.",
      color: "text-green-400",
    },
    {
      icon: KeyRound,
      title: "One-Time Voting Token",
      description:
        "Each voter can only vote once using a unique token.",
      color: "text-cyan-400",
    },
    {
      icon: BarChart3,
      title: "Transparent Results",
      description:
        "Election organizers decide when results become visible.",
      color: "text-yellow-400",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description:
        "Powered by Vote Lab for a seamless voting experience.",
      color: "text-purple-400",
    },
  ];

  return (
    <section className="space-y-8">

      <div className="text-center">

        <h2 className="text-3xl font-bold text-white">
          Why Vote With Confidence?
        </h2>

        <p className="mt-3 text-slate-400">
          Built with security, transparency and reliability
          at its core.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <Icon
                className={`mb-5 h-10 w-10 ${feature.color}`}
              />

              <h3 className="text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
}