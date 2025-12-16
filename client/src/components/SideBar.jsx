import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logged out successfully!");
    navigate("/login");
    closeLogoutModal();
  };

  const navLinkClasses = ({ isActive }) =>
    `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <>
      <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              src="/line-chart-computer-icons-bar-chart-statistics-symbol-2bfd0a5d99d340a746ade9150b7f994d.png"
              alt="Finance Tracker Logo"
              className="h-8 w-auto"
            />
            <span className="ml-3 text-xl font-semibold text-gray-800">
              Finance Tracker
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-8 px-2 space-y-1">
          <NavLink to="/" end className={navLinkClasses}>
            <i className="fa-solid fa-house-chimney mr-4 text-lg"></i>
            Dashboard
          </NavLink>

          <NavLink to="/reports" className={navLinkClasses}>
            <i className="fa-solid fa-chart-simple mr-4 text-lg"></i>
            Reports
          </NavLink>

          <NavLink to="/history" className={navLinkClasses}>
            <i className="fa-solid fa-clock-rotate-left mr-4 text-lg"></i>
            History
          </NavLink>

          <NavLink to="/profile/1" className={navLinkClasses}>
            <i className="fa-solid fa-user mr-4 text-lg"></i>
            Profile
          </NavLink>

          <NavLink to="/settings" className={navLinkClasses}>
            <i className="fa-solid fa-gear mr-4 text-lg"></i>
            Settings
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s"
              alt="User Avatar"
            />
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-800">{username}</p>
              <div className="mt-2 flex gap-4">
                <NavLink
                  to="/profile/1"
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  View Profile
                </NavLink>
                <button
                  onClick={openLogoutModal}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Clean Confirmation Modal – No dark background */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0"
            onClick={closeLogoutModal}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Logout
            </h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to log out?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeLogoutModal}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;