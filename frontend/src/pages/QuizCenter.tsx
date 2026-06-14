import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../lib/supabase";

type Chapter = {
  id: number;
  chapter_name: string;
  chapter_order: number;
};

function QuizCenter() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [chapters, setChapters] = useState<Chapter[]>([]);

  const loadChapters = async () => {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .order("chapter_order");

      if (error) {
        toast.error(error.message);
        return;
      }

      setChapters(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load chapters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapters();
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Loading Chapters...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-white text-4xl font-bold mb-2">
          Quiz Center
        </h1>

        <p className="text-zinc-400 mb-8">
          Choose a chapter to start quiz
        </p>

        <div className="space-y-4">

          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center"
            >
              <h2 className="text-white text-lg font-semibold">
                {chapter.chapter_name}
              </h2>

              <button
                onClick={() =>
                  navigate(`/quiz/${chapter.id}`)
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
              >
                Start Quiz
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default QuizCenter;