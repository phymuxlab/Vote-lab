export default function Features() {
  const features = [
    {
      title: "Secure Voting",
      description:
        "Every vote is securely recorded with fraud prevention and transparent results.",
      icon: "🛡️",
    },
    {
      title: "Fast Results",
      description:
        "View live vote counts and instant results after elections or awards end.",
      icon: "⚡",
    },
    {
      title: "Student Focused",
      description:
        "Designed specifically for universities, colleges, departments, clubs and associations.",
      icon: "🎓",
    },
  ];

  return (
    <section 
    id="features"
    className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          Why Choose <span className="text-cyan-400">Vote Lab?</span>
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Built for modern student communities with speed, security and
          transparency at its core.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-8 hover:border-cyan-500 transition duration-300"
          >
            <div className="text-5xl mb-5">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}