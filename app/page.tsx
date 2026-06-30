import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import VotingPreview from "@/components/sections/VotingPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <VotingPreview />

      
      
    </main>
  );
}