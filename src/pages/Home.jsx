import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGpja2NvMzB0cHNqdDdidzE0eGh3OTcyZm10ZWl4czFnaDU1bGljdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Admin
          </h1>
          <p className="text-white/80 mb-8 text-lg">
            Manage your products efficiently and keep track of your sales. Login
            to access the admin dashboard and start managing your store now!
          </p>
          <Link
            to="/login"
            className="bg-cyan-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            Login Now
          </Link>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjNtMWtlenc5OG85dWk5aDR0Y2dzbDh4Zmhqc2NnM3d5NmE3cGJvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif"
            alt="Hero"
            className="w-80 lg:w-[900px] rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
