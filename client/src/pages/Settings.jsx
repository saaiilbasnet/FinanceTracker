import SideBar from '../components/SideBar'
import { useState } from 'react'
import { FaUser, FaCog, FaLock, FaTrash } from "react-icons/fa";

function Settings() {

  const [username, setUsername] = useState("Lil Fyauro");
  const [email, setEmail] = useState("example@gmail.com");
  const [currency, setCurrency] = useState("NPR");
  const [budget, setBudget] = useState("90000");
  const [financialStart, setFinancialStart] = useState("1");

  return (
    <div className="flex gap-1">
      
      {/* Left SideBar */}
      <SideBar />

      {/* MAIN SETTINGS CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto h-screen">

        <h1 className="text-xl font-semibold text-gray-700 mb-6">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PROFILE SETTINGS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaUser className="text-blue-600" />
              <h2 className="text-lg font-medium text-gray-700">Profile Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-600">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                  type="text"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                  type="email"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">Profile Picture</label>
                <input type="file" className="mt-1 w-full p-2 border rounded-lg" />
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Save Changes
              </button>
            </div>
          </div>

          {/* FINANCE PREFERENCES */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaCog className="text-green-600" />
              <h2 className="text-lg font-medium text-gray-700">Finance Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-600">Default Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                >
                  <option value="NPR">NPR (रु)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-gray-600">Monthly Budget Limit</label>
                <input
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                  type="number"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">Financial Month Start Day</label>
                <input
                  value={financialStart}
                  onChange={(e) => setFinancialStart(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg"
                  type="number"
                  min="1"
                  max="28"
                />
              </div>

              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                Update Preferences
              </button>
            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaLock className="text-purple-600" />
              <h2 className="text-lg font-medium text-gray-700">Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-600">New Password</label>
                <input
                  type="password"
                  className="mt-1 w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 w-full p-2 border rounded-lg"
                />
              </div>

              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
                Change Password
              </button>
            </div>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaTrash className="text-red-600" />
              <h2 className="text-lg font-medium text-gray-700">Danger Zone</h2>
            </div>

            <p className="text-gray-600 mb-4">
              Once you delete your account, all your financial data will be permanently removed.
            </p>

            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
