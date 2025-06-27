
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App

