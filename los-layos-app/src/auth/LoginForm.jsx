import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";

export function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);
    if (signInError) setError("Email o contraseña incorrectos.");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-zinc-700/50"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Panel admin</h1>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
        >
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
