import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import AddJob from './pages/AddJob'
import Navbar from './components/Navbar'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Jobs token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/add" element={<AddJob token={token} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App