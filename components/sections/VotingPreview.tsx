export default function VotingPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div>
          <span className="text-cyan-400 font-semibold uppercase tracking-wider">
            Live Demo
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Experience Modern
            <span className="text-cyan-400"> Student Voting</span>
          </h2>

          <p className="mt-6 text-slate-400 leading-8">
            Vote Lab provides secure elections, award voting, departmental
            contests, and campus-wide competitions with real-time results and a
            beautiful user experience.
          </p>

          <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold transition">
            View Demo
          </button>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl">
              🏆 Best Student Leader 2026
            </h3>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Live
            </span>
          </div>

          {/* Candidate 1 */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Sarah Johnson</span>
              <span>58%</span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-cyan-400 h-3 rounded-full w-[58%]"></div>
            </div>
          </div>

          {/* Candidate 2 */}
          <div>
            <div className="flex justify-between mb-2">
              <span>David Michael</span>
              <span>42%</span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full w-[42%]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}