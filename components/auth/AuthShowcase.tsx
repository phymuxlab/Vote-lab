export default function AuthShowcase() {
  return (
    <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-600 via-cyan-500 to-indigo-700 text-white p-12">

      <h1 className="text-5xl font-bold leading-tight">
        Welcome to
        <br />
        Vote Lab
      </h1>

      <p className="mt-6 text-lg text-cyan-100 leading-8">
        The modern platform for student elections, award voting,
        campus competitions and secure online polls.
      </p>

      <div className="mt-12 space-y-4">
        <div>✅ Secure Voting</div>
        <div>⚡ Live Results</div>
        <div>🏆 Award Management</div>
        <div>🎓 Built for Universities</div>
      </div>
    </div>
  );
}