import { useNavigate } from "react-router-dom";

import { useOnboarding } from "../context/OnboardingContext";

function StreamSelection() {
  const navigate = useNavigate();

  const {
    selectedStream,
    setSelectedStream,
  } = useOnboarding();

  const streams = [
    "Science",
    "Commerce",
    "Humanities",
  ];

  const handleContinue = () => {
    if (selectedStream === "Science") {
      navigate("/combination-selection");
      return;
    }

    navigate("/next-step");
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">

        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Select Stream
        </h1>

        <p className="text-zinc-400 text-center mb-10">
          Choose your academic stream
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {streams.map((stream) => (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`p-8 rounded-2xl border transition-all

              ${
                selectedStream === stream
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500"
              }
              `}
            >
              <h2 className="text-2xl font-semibold">
                {stream}
              </h2>
            </button>
          ))}

        </div>

        {selectedStream && (
          <div className="text-center mt-8">

            <button
              onClick={handleContinue}
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

export default StreamSelection;