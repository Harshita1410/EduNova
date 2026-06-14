import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

type BookCardProps = {
  title: string;
  subject: string;
};

function BookCard({
  title,
  subject,
}: BookCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">

      <BookOpen
        size={40}
        className="text-purple-400 mb-4"
      />

      <h2 className="text-white text-xl font-semibold mb-4">
        {title}
      </h2>

      <button
        onClick={() =>
          navigate(`/subject/${subject}`)
        }
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
      >
        Open Subject Hub
      </button>

    </div>
  );
}

export default BookCard;