import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useOnboarding } from "../context/OnboardingContext";
import { supabase } from "../lib/supabase";

function SubjectReview() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    selectedClass,
    selectedLanguage,
    selectedStream,
    selectedCombination,
    selectedOptionalSubject,

    generatedSubjects,
    setGeneratedSubjects,
  } = useOnboarding();

  useEffect(() => {
    let subjects: string[] = [];

    if (
      selectedClass === "Class 9" ||
      selectedClass === "Class 10"
    ) {
      subjects = [
        "English",
        selectedLanguage,
        "Mathematics",
        "Science",
        "Social Science",
      ];
    }

    if (selectedStream === "Science") {
      if (selectedCombination === "PCM") {
        subjects = [
          "English",
          "Physics",
          "Chemistry",
          "Mathematics",
          selectedOptionalSubject,
        ];
      }

      if (selectedCombination === "PCB") {
        subjects = [
          "English",
          "Physics",
          "Chemistry",
          "Biology",
          selectedOptionalSubject,
        ];
      }

      if (selectedCombination === "PCMB") {
        subjects = [
          "English",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology",
          selectedOptionalSubject,
        ];
      }
    }

    if (selectedStream === "Commerce") {
      subjects = [
        "English",
        "Accountancy",
        "Business Studies",
        "Economics",
        selectedOptionalSubject,
      ];
    }

    if (selectedStream === "Humanities") {
      subjects = [
        "English",
        "History",
        "Geography",
        "Political Science",
        selectedOptionalSubject,
      ];
    }

    setGeneratedSubjects(subjects);
  }, [
    selectedClass,
    selectedLanguage,
    selectedStream,
    selectedCombination,
    selectedOptionalSubject,
    setGeneratedSubjects,
  ]);

  const handleFinishSetup = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("User not found");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,

          class: selectedClass,
          language: selectedLanguage,

          stream: selectedStream,
          combination: selectedCombination,

          optional_subject: selectedOptionalSubject,

          subjects: generatedSubjects,

          xp: 0,
          streak: 0,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile saved successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-xl">
        <h1 className="text-white text-3xl font-bold mb-2 text-center">
          Subject Review
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Please review your generated subjects
        </p>

        <div className="space-y-4">
          {generatedSubjects.map((subject) => (
            <div
              key={subject}
              className="bg-zinc-800 p-4 rounded-xl text-white"
            >
              {subject}
            </div>
          ))}
        </div>

        <button
          onClick={handleFinishSetup}
          disabled={loading}
          className="w-full mt-8 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Finish Setup"}
        </button>
      </div>
    </div>
  );
}

export default SubjectReview;