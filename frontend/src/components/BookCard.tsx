import { BookOpen } from "lucide-react";

type BookCardProps = {
  title: string;
  url: string;
};

function BookCard({
  title,
  url,
}: BookCardProps) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">

      <BookOpen
        size={40}
        className="text-purple-400 mb-4"
      />

      <h2 className="text-white text-xl font-semibold mb-4">
        {title}
      </h2>

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl inline-block"
      >
        Open Book
      </a>

    </div>
  );
}

export default BookCard;