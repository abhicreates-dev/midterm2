// url : http://localhost:3000/signup
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export function Signup() {

  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await apiClient.post<LoginResponse>("/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/signin");
    } catch {
      setErrorMessage("Signup failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md h-screen gap-4 flex flex-col justify-center">
    

      <h1 className="text-2xl font-semibold">Login</h1>

        <div className="flex gap-2">
        <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Name"
        className="w-full rounded border p-2"
      />

      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder="Email"
        className="w-full rounded border p-2"
      />
      </div>

      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
        className="w-full rounded border p-2"
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </section>
  );
}