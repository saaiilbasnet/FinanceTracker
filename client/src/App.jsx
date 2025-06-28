
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import DashboardPage from './pages/Dashboard.jsx'
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

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

