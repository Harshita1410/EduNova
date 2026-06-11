import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { useOnboarding } from "../context/OnboardingContext";

function ClassSelection() {
  const navigate = useNavigate();

  const {
    selectedClass,
    setSelectedClass,
  } = useOnboarding();

  const classes = [
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];

  const handleContinue = () => {
  if (!selectedClass) return;

  if (
    selectedClass === "Class 9" ||
    selectedClass === "Class 10"
  ) {
    navigate("/language-selection");
  } else {
    navigate("/stream-selection");
  }
};
  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-4xl">

        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Select Your Class
        </h1>

        <p className="text-zinc-400 text-center mb-10">
          Let's personalize your learning journey
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {classes.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedClass(item)}
              className={`p-8 rounded-2xl border transition-all duration-300

              ${
                selectedClass === item
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500"
              }
              `}
            >
              <div className="flex flex-col items-center gap-4">

                <GraduationCap size={40} />

                <h2 className="text-2xl font-semibold">
                  {item}
                </h2>

              </div>
            </button>
          ))}
        </div>

        {selectedClass && (
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

export default ClassSelection;