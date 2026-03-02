import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzkzaWhvaWF1Y2NvYWoyOWhvejczdmxzcXQ3OTd3emZ0OHkzdnhkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SXOdjPojfeOXzgc0J1/giphy.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <form className="relative z-20 bg-white/10 backdrop-blur-md border max-w-sm w-full p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-cyan-200">
          Register
        </h1>
        {/* 
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        /> */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          className="bg-cyan-500 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
        >
          Register
        </button>

        {/* Back to Login */}
        <p className="text-center text-cyan-200 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline font-semibold hover:text-white transition"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
