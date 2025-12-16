import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { User, Mail, CheckCircle, Edit2, X, Check, Calendar } from "lucide-react";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: "", email: "", createdAt: "" });
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [editLoading, setEditLoading] = useState(false);
  
  // Toast notification
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch user details
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setEditForm({ username: res.data.username, email: res.data.email });
      localStorage.setItem("username", res.data.username);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to fetch profile", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    if (!editForm.username.trim() || !editForm.email.trim()) {
      showToast("Username and email are required", "error");
      return;
    }
    setEditLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:3000/api/user/me", editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      localStorage.setItem("username", res.data.user.username);
      setIsEditing(false);
      showToast("Profile updated successfully");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setEditLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm({ username: user.username, email: user.email });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="fixed inset-y-0 left-0 z-40">
        <SideBar />
      </div>

      <div className="flex-1 ml-64 overflow-y-auto"> 
        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}>
            {toast.message}
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

            {loading ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12">
                  <div className="flex items-center gap-6">
                    <img
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                      alt="User avatar"
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-1">{user.username}</h2>
                      <p className="text-blue-100 text-lg">{user.email}</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      >
                        <Edit2 className="w-5 h-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Username */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Username</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Member Since</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">Account Status</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Edit Actions */}
                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleUpdateProfile}
                          disabled={editLoading}
                          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          {editLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-5 h-5" />
                          )}
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;