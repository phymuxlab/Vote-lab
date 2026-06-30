export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Vote <span className="text-cyan-400">Lab</span>
          </h1>
        </div>

        <ul className="hidden md:flex gap-8 text-slate-300">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">Events</li>
          <li className="hover:text-cyan-400 cursor-pointer">Features</li>
          <li className="hover:text-cyan-400 cursor-pointer">About</li>
        </ul>

        <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-2 rounded-xl font-semibold transition">
          Login
        </button>
      </nav>
    </header>
  );
}