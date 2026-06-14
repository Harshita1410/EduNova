import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../lib/supabase";

type Question = {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
};

function QuizPage() {
  const { chapterId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [answers, setAnswers] =
    useState<Record<number, string>>({});

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] = useState(0);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("chapter_id", chapterId);

      if (error) {
        toast.error(error.message);
        return;
      }

      const shuffledQuestions =
        (data || [])
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [chapterId]);

  const handleSubmit = async () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      if (
        answers[question.id] ===
        question.correct_answer
      ) {
        correctAnswers++;
      }
    });

    const xpEarned = correctAnswers * 10;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("User not found");
        return;
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (profileError) {
        toast.error(profileError.message);
        return;
      }

      const { error: attemptError } =
        await supabase
          .from("quiz_attempts")
          .insert({
            user_id: user.id,
            chapter_id: Number(chapterId),
            score: correctAnswers,
            total_questions: questions.length,
            xp_earned: xpEarned,
          });

      if (attemptError) {
        toast.error(attemptError.message);
        return;
      }

      const { error: xpError } =
        await supabase
          .from("profiles")
          .update({
            xp: profile.xp + xpEarned,
          })
          .eq("user_id", user.id);

      if (xpError) {
        toast.error(xpError.message);
        return;
      }

      setScore(correctAnswers);

      setSubmitted(true);

      toast.success(
        `${xpEarned} XP added successfully!`
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to save quiz");
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Loading Quiz...
        </h1>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">

        <div className="bg-zinc-900 p-8 rounded-2xl text-center max-w-md w-full">

          <h1 className="text-white text-4xl font-bold mb-4">
            Quiz Completed 🎉
          </h1>

          <p className="text-zinc-300 text-2xl mb-4">
            Score: {score} / {questions.length}
          </p>

          <p className="text-purple-400 text-2xl font-semibold mb-2">
            XP Earned: {score * 10}
          </p>

          <p className="text-zinc-400 mb-8">
            Great work! Keep practicing to earn more XP.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">

            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
            >
              🔄 Retake Quiz
            </button>

            <button
              onClick={() => navigate("/quiz-center")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              📚 Quiz Center
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              🏠 Dashboard
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-white text-4xl font-bold mb-8">
          Quiz
        </h1>

        <p className="text-zinc-400 mb-8">
          Random 10 questions selected for this attempt
        </p>

        <div className="space-y-8">

          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-zinc-900 p-6 rounded-2xl"
            >

              <h2 className="text-white text-xl font-semibold mb-4">
                {index + 1}. {question.question}
              </h2>

              <div className="space-y-3">

                {[
                  question.option_a,
                  question.option_b,
                  question.option_c,
                  question.option_d,
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        [question.id]: option,
                      })
                    }
                    className={`w-full text-left p-3 rounded-xl border ${
                      answers[question.id] === option
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-zinc-800 border-zinc-700 text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}

              </div>

            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-semibold"
          >
            Submit Quiz
          </button>

        </div>

      </div>

    </div>
  );
}

export default QuizPage;