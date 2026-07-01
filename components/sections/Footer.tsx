export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold">
              Vote <span className="text-cyan-400">Lab</span>
            </h2>

            <p className="text-slate-400 mt-4">
              A modern voting platform for universities, student unions,
              clubs, awards and campus events.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>

            <ul className="space-y-2 text-slate-400">
              <li>Student Elections</li>
              <li>Awards</li>
              <li>Campus Events</li>
              <li>Live Results</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>

            <ul className="space-y-2 text-slate-400">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Developed By</h3>

            <p className="text-cyan-400 font-semibold">
              MUXLAB
            </p>

            <p className="text-slate-400 mt-2">
              Building innovative digital solutions.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
          © {new Date().getFullYear()} Vote Lab. All rights reserved.
        </div>

      </div>
    </footer>
  );
}