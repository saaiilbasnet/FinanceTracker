import SideBar from '../components/SideBar';
import { useState } from 'react';
import { FaCog, FaLock, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Delete account states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [loading, setLoading] = useState({
    password: false,
    delete: false
  });

  // Handle password change
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading({...loading, password: true});
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.put(
        'http://localhost:3000/api/user/change-password',
        {
          currentPassword: currentPassword,
          newPassword: newPassword
        },
        config
      );
      
      toast.success('Password changed successfully!');
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error) {
      console.error('Password change error:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Current password is incorrect');
        } else {
          toast.error(error.response.data?.message || 'Failed to change password');
        }
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error('Error: ' + error.message);
      }
    } finally {
      setLoading({...loading, password: false});
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    if (!deletePassword) {
      toast.error('Please enter your password');
      return;
    }

    try {
      setLoading({...loading, delete: true});
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        return;
      }

      const response = await axios.delete(
        'http://localhost:3000/api/user/me',
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: { password: deletePassword }
        }
      );
      
      toast.success('Account deleted successfully');
      
      localStorage.clear();
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('Delete account error:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Incorrect password');
        } else {
          toast.error(error.response.data?.message || `Error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error('No response from server. Is backend running on port 3000?');
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading({...loading, delete: false});
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SECURITY SETTINGS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FaLock className="text-purple-600" />
              <h2 className="text-lg font-medium text-gray-700">Security Settings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium text-gray-600">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Confirm new password"
                />
              </div>

              <button 
                onClick={handleChangePassword}
                disabled={loading.password}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading.password ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Changing...
                  </>
                ) : 'Change Password'}
              </button>
            </div>
          </div>

          {/* DANGER ZONE - Enhanced for maximum "danger" feel */}
          <div className="bg-red-50 border-2 border-red-400 p-6 rounded-xl shadow-lg relative overflow-hidden">
            {/* Subtle warning stripe background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-transparent to-red-600"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <FaExclamationTriangle className="text-red-600 text-3xl animate-pulse" />
                <h2 className="text-2xl font-bold text-red-800">Danger Zone</h2>
              </div>

              <p className="text-red-700 font-medium mb-6 leading-relaxed">
                <strong>Warning:</strong> Once you delete your account, <span className="underline decoration-red-600">all your data will be permanently erased</span>. 
                This action is irreversible.
              </p>

              <button 
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl animate-pulse-slow"
              >
                Delete My Account Permanently
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl border-4 border-red-600" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-6">
              <FaTrash className="text-red-600 text-4xl" />
              <h2 className="text-3xl font-bold text-red-700">Final Confirmation</h2>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-800 text-lg mb-6">
                You are about to <span className="text-red-600 font-bold">permanently delete</span> your account.
              </p>
              <p className="text-gray-700 mb-6">
                This will erase <strong>all</strong> your financial records, settings, and personal data. 
                <span className="block mt-3 text-red-600 font-bold text-xl">There is no recovery.</span>
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-red-700 mb-2">
                    Enter your password:
                  </label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-red-600 focus:ring-4 focus:ring-red-200"
                    placeholder="Your current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-red-700 mb-2">
                    Type <span className="bg-red-600 text-white px-2 py-1 rounded">DELETE</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:border-red-600 focus:ring-4 focus:ring-red-200"
                    placeholder="Type DELETE"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE' || !deletePassword || loading.delete}
                className={`flex-1 px-6 py-4 text-white font-bold rounded-lg transition-all duration-200 ${
                  (deleteConfirmation === 'DELETE' && deletePassword && !loading.delete)
                    ? 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-400 cursor-not-allowed'
                } flex items-center justify-center gap-3`}
              >
                {loading.delete ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting Forever...
                  </>
                ) : (
                  <>Permanently Delete Account</>
                )}
              </button>
              <button
                onClick={() => {  
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                  setDeletePassword('');
                }}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;