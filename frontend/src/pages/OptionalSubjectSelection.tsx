import { useNavigate } from "react-router-dom";

import { useOnboarding } from "../context/OnboardingContext";

function OptionalSubjectSelection() {
  const navigate = useNavigate();

  const {
    selectedStream,
    selectedOptionalSubject,
    setSelectedOptionalSubject,
  } = useOnboarding();

  let options: string[] = [];

  if (selectedStream === "Science") {
    options = [
      "Computer Science",
      "Physical Education",
    ];
  }

  if (selectedStream === "Commerce") {
    options = [
      "Applied Mathematics",
      "Computer Science",
      "Physical Education",
    ];
  }

  if (selectedStream === "Humanities") {
    options = [
      "Psychology",
      "Computer Science",
      "Physical Education",
    ];
  }

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">

        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Select Optional Subject
        </h1>

        <p className="text-zinc-400 text-center mb-10">
          Choose one optional subject
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {options.map((subject) => (
            <button
              key={subject}
              onClick={() =>
                setSelectedOptionalSubject(subject)
              }
              className={`p-8 rounded-2xl border transition-all

              ${
                selectedOptionalSubject === subject
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500"
              }
              `}
            >
              <h2 className="text-xl font-semibold">
                {subject}
              </h2>
            </button>
          ))}

        </div>

        {selectedOptionalSubject && (
          <div className="text-center mt-8">

            <button
              onClick={() =>
                navigate("/subject-review")
              }
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

export default OptionalSubjectSelection;