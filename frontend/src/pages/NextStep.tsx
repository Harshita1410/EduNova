import { useOnboarding } from "../context/OnboardingContext";

function NextStep() {
  const { selectedClass } = useOnboarding();

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-white text-4xl font-bold mb-4">
          Next Step
        </h1>

        <p className="text-zinc-400">
          Selected Class: {selectedClass}
        </p>

      </div>

    </div>
  );
}

export default NextStep;