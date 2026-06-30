export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <h1 className="text-5xl font-bold text-center pt-40">
        Welcome to Vote Lab
      </h1>

      <p className="text-center mt-6 text-xl text-slate-300">
        Where Student Voices Count.
      </p>

      <div className="flex justify-center gap-6 mt-10">
        <button className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
          Get Started
        </button>

        <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
          Explore Events
        </button>
      </div>

      <p className="text-center mt-32 text-slate-500">
        Developed by <span className="font-semibold text-cyan-400">MUXLAB</span>
      </p>
    </main>
  );
}