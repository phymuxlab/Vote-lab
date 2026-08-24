import AnimatedBackground from "@/components/public/AnimatedBackground";
import ElectionHero from "@/components/public/ElectionHero";
import ElectionInfoCards from "@/components/public/ElectionInfoCards";
import ElectionCountdown from "@/components/public/ElectionCountdown";
import ElectionFeatures from "@/components/public/ElectionFeatures";
import ElectionCTA from "@/components/public/ElectionCTA";
import ElectionStats from "@/components/public/ElectionStats";
import FadeUp from "@/components/ui/FadeUp";

interface ElectionLandingProps {
  election: {
    id: string;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
  };

  organizationName: string;

  votingMode: string;

  organizationLogo?: string | null;

  totalCategories: number;
  registeredVoters: number;
  votesCast: number;
  turnout: number;
}

export default function ElectionLanding({
  election,
  organizationName,
  votingMode,
  organizationLogo,
  totalCategories,
  registeredVoters,
  votesCast,
  turnout,
}: ElectionLandingProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-16">

        <FadeUp>
          <ElectionHero
            title={election.title}
            description={election.description}
            organizationName={organizationName}
            logo={organizationLogo}
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <ElectionInfoCards
            startDate={election.start_date}
            endDate={election.end_date}
            votingMode={votingMode}
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <ElectionCountdown
            endDate={election.end_date}
          />
        </FadeUp>

        <FadeUp delay={0.4}>
          <ElectionStats
  totalCategories={totalCategories}
  registeredVoters={registeredVoters}
  votesCast={votesCast}
  turnout={turnout}
  votingMode={votingMode}
/>
        </FadeUp>

        <FadeUp delay={0.5}>
         <ElectionFeatures
  votingMode={votingMode}
/>
        </FadeUp>

        <FadeUp delay={0.6}>
          <ElectionCTA
            electionId={election.id}
            votingMode={votingMode}
          />
        </FadeUp>

        <FadeUp delay={0.75}>
          <footer className="border-t border-slate-800 pt-10 text-center">

            <h3 className="text-xl font-bold text-white">
              Powered by
              <span className="ml-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Vote Lab
              </span>
            </h3>

            <p className="mt-4 text-slate-400">
              Secure • Transparent • Reliable Online Voting Platform
            </p>

            <p className="mt-2 text-sm text-slate-600">
              © {new Date().getFullYear()} Vote Lab. All rights reserved.
            </p>

          </footer>
        </FadeUp>

      </div>

    </div>
  );
}