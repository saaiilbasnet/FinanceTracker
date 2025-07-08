
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import ReportPage from './pages/Reports.jsx';
import HistoryPage from './pages/History.jsx';
import ProfilePage from './pages/Profile.jsx';
import SettingsPage from './pages/Settings.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './utils/PrivateRoute.jsx';

// reverseOrder={false}

function App() {
  return (
    <div>
        <Toaster position='top-center' />
      <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<PrivateRoute> <DashboardPage /> </PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reports" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

