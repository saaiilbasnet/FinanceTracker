
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import ReportPage from './pages/Reports.jsx';
import HistoryPage from './pages/History.jsx';
import ProfilePage from './pages/Profile.jsx';
import SettingsPage from './pages/Settings.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import { Toaster } from 'react-hot-toast';

// reverseOrder={false}

function App() {
  return (
    <div>
        <Toaster position='top-center' />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

