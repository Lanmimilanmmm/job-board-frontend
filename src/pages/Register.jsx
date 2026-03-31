import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8000'

export default function Register({ setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await axios.post(`${API}/auth/register`, { email, password })
      const res = await axios.post(`${API}/auth/login`, { email, password })
      localStorage.setItem('token', res.data.access_token)
      setToken(res.data.access_token)
      navigate('/')
    } catch {
      setError('Greška pri registraciji')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '28px' }}>Registracija</h1>
      {error && <p style={{ color: '#ff4b4b', marginBottom: '16px' }}>{error}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '15px', marginBottom: '12px' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '15px', marginBottom: '20px' }} />
      <button onClick={handleRegister}
        style={{ width: '100%', padding: '14px', background: '#b9ff4b', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
        Registruj se
      </button>
    </div>
  )
}