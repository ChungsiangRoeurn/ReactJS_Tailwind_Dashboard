import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaStore,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = {
    name: "Chungsiang",
    role: "Administrator",
  };

  const handleLogout = () => {
    // clear token here if you have one
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <MdSpaceDashboard /> },
    { name: "Stores", path: "/admin/stores", icon: <FaStore /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`relative h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } overflow-hidden`}
    >
      {/* Background GIF */}
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzkzaWhvaWF1Y2NvYWoyOWhvejczdmxzcXQ3OTd3emZ0OHkzdnhkeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SXOdjPojfeOXzgc0J1/giphy.gif"
        alt="Sidebar Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Sidebar Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-4 backdrop-blur-md border-r border-white/10">
        {/* Navigation */}
        <div>
          <h2
            className={`text-2xl font-bold text-cyan-300 text-center mb-8 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Admin
          </h2>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`transition-opacity ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-4">
          <div
            className={`mb-4 transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-gray-300 text-xs">Logged in as</p>
            <p className="text-white font-semibold">{user.name}</p>
            <p className="text-cyan-400 text-xs">{user.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center ${
              isOpen ? "gap-2 justify-start px-2" : "justify-center"
            } bg-red-500 text-white py-2 rounded hover:bg-red-600 transition`}
          >
            <FaSignOutAlt />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
