import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/admin");
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzkzaWhvaWF1Y2NvYWoyOWhvejczdmxzcXQ3OTd3emZ0OHkzdnhkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SXOdjPojfeOXzgc0J1/giphy.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-20 bg-white/10 backdrop-blur-md border max-w-sm w-full p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center mb-4 text-cyan-200">
          Login
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className={`${loading ? "opacity-50 cursor-not-allowed" : ""} bg-cyan-500 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105 ...`}
        >
          {loading ? "Logging in" : "Login"}
        </button>

        <p className="text-center text-cyan-200 mt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="underline font-semibold hover:text-white transition"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
