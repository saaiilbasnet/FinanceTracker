import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out!");
    navigate("/login");
  };

  const navLinkClasses = (isActive) =>
    `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
      isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center">
          <img
            src="../public/line-chart-computer-icons-bar-chart-statistics-symbol-2bfd0a5d99d340a746ade9150b7f994d.png"
            alt="Finance Tracker Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-semibold text-gray-800">Finance Tracker</span>
        </div>
      </div>

      {/* Navigation - flex-1 makes it take remaining space */}
      <nav className="flex-1 mt-10 px-2">
        <NavLink to="/" end className={({ isActive }) => navLinkClasses(isActive)}>
          <i className="fa-solid fa-house-chimney mr-4 text-2xl"></i> Dashboard
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => navLinkClasses(isActive)}>
          <i className="fa-solid fa-chart-simple mr-5 text-2xl"></i> Reports
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => navLinkClasses(isActive)}>
          <i className="fa-solid fa-clock-rotate-left mr-4 text-2xl"></i> History
        </NavLink>

        <NavLink to="/profile/1" className={({ isActive }) => navLinkClasses(isActive)}>
          <i className="fa-solid fa-user mr-5 text-2xl"></i> Profile
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => navLinkClasses(isActive)}>
          <i className="fa-solid fa-gear mr-4 text-2xl"></i> Settings
        </NavLink>
      </nav>

      {/* User info at the bottom - no absolute positioning needed */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s"
            alt="User Avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-bold text-gray-700">{username}</p>
            <div className="flex gap-3">
              <NavLink to="/profile/1" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                View Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;