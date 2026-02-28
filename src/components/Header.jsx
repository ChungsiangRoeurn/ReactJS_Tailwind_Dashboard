import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

function Header({ toggleSidebar, isOpen }) {
  return (
    <header className="relative h-16 flex items-center justify-between px-6 overflow-hidden">
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzkzaWhvaWF1Y2NvYWoyOWhvejczdmxzcXQ3OTd3emZ0OHkzdnhkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SXOdjPojfeOXzgc0J1/giphy.gif"
        alt="Header Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl hover:scale-110 transition-transform"
          >
            {isOpen ? <LuPanelLeftClose /> : <LuPanelRightClose />}
          </button>

          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-200 text-sm">Welcome back 👋</span>

          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
            C
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
