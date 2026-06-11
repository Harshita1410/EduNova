import { useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    console.log(data);

    toast.success("Account created successfully!");
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none"
          />

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

          <div onClick={handleRegister}>
            <Button text="Create Account" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;