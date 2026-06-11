import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

function CombinationSelection() {
  const navigate = useNavigate();

  const {
    selectedCombination,
    setSelectedCombination,
  } = useOnboarding();

  const combinations = [
    {
      title: "PCM",
      description: "Physics, Chemistry, Mathematics",
    },
    {
      title: "PCB",
      description: "Physics, Chemistry, Biology",
    },
    {
      title: "PCMB",
      description: "Physics, Chemistry, Mathematics, Biology",
    },
  ];

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">

        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Select Combination
        </h1>

        <p className="text-zinc-400 text-center mb-10">
          Choose your science combination
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {combinations.map((item) => (
            <button
              key={item.title}
              onClick={() =>
                setSelectedCombination(item.title)
              }
              className={`p-8 rounded-2xl border text-left transition-all

              ${
                selectedCombination === item.title
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500"
              }
              `}
            >
              <h2 className="text-3xl font-bold mb-2">
                {item.title}
              </h2>

              <p>
                {item.description}
              </p>
            </button>
          ))}

        </div>

        {selectedCombination && (
          <div className="text-center mt-8">

            <button
              onClick={() => navigate("/optional-subject")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
            >
              Continue
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default CombinationSelection;