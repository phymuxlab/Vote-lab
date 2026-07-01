import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-indigo-500/10 p-12 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Transform Student Voting?
        </h2>

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
          Launch secure elections, transparent award voting, and engaging campus
          events—all from one modern platform.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Button size="lg">
            Get Started
          </Button>

          <Button variant="outline" size="lg">
            Schedule a Demo
          </Button>
        </div>

      </div>
    </section>
  );
}