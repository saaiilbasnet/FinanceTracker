import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center">
            <img
              src="../public/line-chart-computer-icons-bar-chart-statistics-symbol-2bfd0a5d99d340a746ade9150b7f994d.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Finance Tracker
            </span>
          </div>
        </div>
        <nav className="mt-10 px-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <i className="fa-solid fa-house-chimney mr-4 text-2xl"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <i className="fa-solid fa-chart-simple mr-5 text-2xl"></i>
            Reports
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <i className="fa-solid fa-clock-rotate-left mr-4 text-2xl"></i>
            History
          </NavLink>

          <NavLink
            to="/profile/1"
            className={({ isActive }) =>
              `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <i className="fa-solid fa-user mr-5 text-2xl"></i>
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <i className="fa-solid fa-gear mr-4 text-2xl"></i>
            Settings
          </NavLink>
        </nav>

        {/* This div seems positioned incorrectly, needs to be at the bottom */}
        <div className="absolute bottom-4 p-4 w-full"> {/* Added absolute positioning and w-full */}
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-1xl font-bold text-gray-700">Saaiil Basnet</p>
              <p className="text-sm font-medium text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;