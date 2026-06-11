import { useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";

import { useOnboarding } from "../context/OnboardingContext";

function LanguageSelection() {
  const navigate = useNavigate();

  const {
    selectedLanguage,
    setSelectedLanguage,
  } = useOnboarding();

  const languages = [
    "Hindi",
    "Kannada",
    "Tamil",
    "Telugu",
  ];

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">

        <h1 className="text-white text-4xl font-bold text-center mb-3">
          Select Language Subject
        </h1>

        <p className="text-zinc-400 text-center mb-10">
          Choose your language subject
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`p-8 rounded-2xl border transition-all

              ${
                selectedLanguage === language
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-purple-500"
              }
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <Languages size={40} />
                <h2 className="text-2xl font-semibold">
                  {language}
                </h2>
              </div>
            </button>
          ))}

        </div>

        {selectedLanguage && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/next-step")}
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

export default LanguageSelection;