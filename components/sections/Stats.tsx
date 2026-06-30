export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-bold text-cyan-400">10K+</h2>
          <p className="mt-2 text-slate-400">Votes Cast</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-bold text-cyan-400">500+</h2>
          <p className="mt-2 text-slate-400">Events Hosted</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-bold text-cyan-400">50+</h2>
          <p className="mt-2 text-slate-400">Institutions</p>
        </div>
      </div>
    </section>
  );
}