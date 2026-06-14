import { useParams } from "react-router-dom";
import { BookOpen, Target, FileText, Video, Brain } from "lucide-react";

import { ncertBooks } from "../data/ncertBooks";

function SubjectHub() {
  const { subjectName } = useParams();

  const subject = ncertBooks.find(
    (item) => item.subject === subjectName
  );

  if (!subject) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <h1 className="text-white text-3xl">
          Subject not found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-white text-4xl font-bold mb-2">
          {subject.subject}
        </h1>

        <p className="text-zinc-400 mb-8">
          Your personalized learning hub
        </p>

        {/* NCERT BOOK */}

        <div className="bg-zinc-900 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">

            <BookOpen
              size={28}
              className="text-purple-400"
            />

            <h2 className="text-white text-2xl font-semibold">
              NCERT Book
            </h2>

          </div>

          <a
            href={subject.bookUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl inline-block"
          >
            Open NCERT
          </a>

        </div>

        {/* IMPORTANT TOPICS */}

        <div className="bg-zinc-900 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">

            <Target
              size={28}
              className="text-green-400"
            />

            <h2 className="text-white text-2xl font-semibold">
              Important Topics
            </h2>

          </div>

          <div className="space-y-3">

            {subject.importantTopics.map((topic) => (
              <div
                key={topic}
                className="bg-zinc-800 p-3 rounded-xl text-white"
              >
                {topic}
              </div>
            ))}

          </div>

        </div>

        {/* COMING SOON */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <FileText
              size={32}
              className="text-yellow-400 mb-4"
            />

            <h2 className="text-white text-xl font-semibold mb-2">
              PYQs
            </h2>

            <p className="text-zinc-400">
              Coming Soon
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <Video
              size={32}
              className="text-red-400 mb-4"
            />

            <h2 className="text-white text-xl font-semibold mb-2">
              Resources
            </h2>

            <p className="text-zinc-400">
              Coming Soon
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <Brain
              size={32}
              className="text-purple-400 mb-4"
            />

            <h2 className="text-white text-xl font-semibold mb-2">
              AI Tutor
            </h2>

            <p className="text-zinc-400">
              Coming Soon
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SubjectHub;