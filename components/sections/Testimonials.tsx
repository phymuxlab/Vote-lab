export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah A.",
      role: "Student Union President",
      message:
        "Vote Lab made our campus election simple, transparent and incredibly easy for students.",
    },
    {
      name: "David O.",
      role: "Event Organizer",
      message:
        "We used Vote Lab for our annual awards. The experience was seamless and professional.",
    },
    {
      name: "Grace M.",
      role: "Faculty Representative",
      message:
        "The live results feature kept everyone engaged throughout the voting process.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          What Students Are Saying
        </h2>

        <p className="text-slate-400 mt-4">
          Trusted by student leaders and campus organizations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-8"
          >
            <p className="text-slate-300 leading-7">
              "{item.message}"
            </p>

            <div className="mt-8">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-cyan-400 text-sm">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}