import { useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log(data);

    toast.success("Login successful!");

    setTimeout(() => {
      navigate("/class-selection");
    }, 1000);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none"
          />

          <div onClick={handleLogin}>
            <Button text="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;