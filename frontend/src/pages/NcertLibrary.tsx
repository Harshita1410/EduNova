import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../lib/supabase";

import type { Profile } from "../types/profile";

import { ncertBooks } from "../data/ncertBooks";

import BookCard from "../components/BookCard";

function NcertLibrary() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">
          Loading Library...
        </h1>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const filteredBooks = ncertBooks.filter(
    (book) =>
      profile.subjects.includes(book.subject)
  );

  return (
    <div className="bg-zinc-950 min-h-screen p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-white text-4xl font-bold mb-2">
          NCERT Library
        </h1>

        <p className="text-zinc-400 mb-8">
          Personalized resources based on your subjects
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredBooks.map((book) => (
            <BookCard
              key={book.subject}
              title={book.title}
              subject={book.subject}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default NcertLibrary;