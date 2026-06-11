import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-white mb-4">
          EduNova
        </h1>

        <p className="text-zinc-400 mb-8">
          Your Smart Learning Companion
        </p>

        <div className="flex gap-4 justify-center">

          <Link to="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl transition">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Home