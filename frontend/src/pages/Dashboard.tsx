import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  BookOpen,
  Brain,
  GraduationCap,
  Trophy,
  Flame,
  Compass,
  LogOut,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import type { Profile } from "../types/profile";

function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalXpEarned: 0,
  });

  const loadQuizStats = async (
    userId: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error(error);
        return;
      }

      const attempts = data || [];

      const totalQuizzes =
        attempts.length;

      const totalScore =
        attempts.reduce(
          (sum, item) =>
            sum +
            (item.score /
              item.total_questions) *
              100,
          0
        );

      const averageScore =
        totalQuizzes > 0
          ? Math.round(
              totalScore /
                totalQuizzes
            )
          : 0;

      const totalXpEarned =
        attempts.reduce(
          (sum, item) =>
            sum + item.xp_earned,
          0
        );

      setQuizStats({
        totalQuizzes,
        averageScore,
        totalXpEarned,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error(
          "Please login first"
        );
        navigate("/login");
        return;
      }

      const { data, error } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      setProfile(data);

      await loadQuizStats(user.id);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout =
    async () => {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Logged out successfully"
      );

      navigate("/login");
    };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">
          No profile found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}

        <div className="bg-zinc-900 rounded-3xl p-8 mb-6">

          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-white text-4xl font-bold mb-2">
                Welcome Buddy 👋
              </h1>

              <p className="text-zinc-400 text-lg">
                {profile.class}

                {profile.stream &&
                  ` • ${profile.stream}`}

                {profile.combination &&
                  ` • ${profile.combination}`}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <button
            onClick={() =>
              navigate(
                "/ncert-library"
              )
            }
            className="bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition min-h-[180px] flex flex-col items-center justify-center"
          >
            <BookOpen
              size={52}
              className="text-purple-400 mb-5"
            />

            <h2 className="text-white text-2xl font-semibold text-center">
              NCERT Library
            </h2>
          </button>

          <button
            onClick={() =>
              navigate(
                "/quiz-center"
              )
            }
            className="bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition min-h-[180px] flex flex-col items-center justify-center"
          >
            <GraduationCap
              size={52}
              className="text-purple-400 mb-5"
            />

            <h2 className="text-white text-2xl font-semibold text-center">
              Quiz Center
            </h2>
          </button>

          <button className="bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition min-h-[180px] flex flex-col items-center justify-center">

            <Brain
              size={52}
              className="text-purple-400 mb-5"
            />

            <h2 className="text-white text-2xl font-semibold text-center whitespace-nowrap">
              AI Assistant
            </h2>

          </button>

          <button className="bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition min-h-[180px] flex flex-col items-center justify-center">

            <Compass
              size={52}
              className="text-purple-400 mb-5"
            />

            <h2 className="text-white text-2xl font-semibold text-center">
              Career Guidance
            </h2>

          </button>

        </div>

        {/* XP & Streak */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <div className="flex items-center gap-3 mb-3">

              <Trophy
                size={28}
                className="text-yellow-400"
              />

              <h2 className="text-white text-xl font-semibold">
                XP Points
              </h2>

            </div>

            <p className="text-4xl font-bold text-white">
              {profile.xp}
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <div className="flex items-center gap-3 mb-3">

              <Flame
                size={28}
                className="text-orange-400"
              />

              <h2 className="text-white text-xl font-semibold">
                Streak
              </h2>

            </div>

            <p className="text-4xl font-bold text-white">
              {profile.streak}
            </p>

          </div>

        </div>

        {/* Quiz Statistics */}

        <div className="bg-zinc-900 p-6 rounded-2xl mb-6">

          <h2 className="text-white text-2xl font-semibold mb-6">
            📊 Quiz Statistics
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-zinc-800 p-4 rounded-xl">

              <p className="text-zinc-400">
                Total Quizzes
              </p>

              <p className="text-white text-3xl font-bold">
                {quizStats.totalQuizzes}
              </p>

            </div>

            <div className="bg-zinc-800 p-4 rounded-xl">

              <p className="text-zinc-400">
                Average Score
              </p>

              <p className="text-white text-3xl font-bold">
                {quizStats.averageScore}%
              </p>

            </div>

            <div className="bg-zinc-800 p-4 rounded-xl">

              <p className="text-zinc-400">
                Total XP Earned
              </p>

              <p className="text-white text-3xl font-bold">
                {quizStats.totalXpEarned}
              </p>

            </div>

          </div>

        </div>

        {/* Subjects */}

        <div className="bg-zinc-900 p-6 rounded-2xl">

          <h2 className="text-white text-2xl font-semibold mb-6">
            Your Subjects
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {profile.subjects?.map(
              (subject) => (
                <div
                  key={subject}
                  className="bg-zinc-800 p-4 rounded-xl text-white"
                >
                  {subject}
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;