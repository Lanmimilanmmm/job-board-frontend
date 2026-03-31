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
      setError('Greška — možda email već postoji')
    }
  }

  return (
    <div style={{ maxWidth: '420px', margin: '80px auto', padding: '0 20px' }}>
      <div style={{
        background: '#111', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px', padding: '48px 40px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Kreiraj nalog</h1>
        <p style={{ color: 'rgba(240,240,240,0.4)', marginBottom: '32px', fontSize: '15px' }}>
          Besplatno, za manje od minute
        </p>
        {error && (
          <div style={{
            background: 'rgba(255,75,75,0.1)', border: '1px solid rgba(255,75,75,0.3)',
            borderRadius: '8px', padding: '12px 16px', marginBottom: '20px',
            color: '#ff6b6b', fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        <input
          placeholder="Email adresa"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a',
            color: '#f0f0f0', fontSize: '15px', marginBottom: '12px', outline: 'none'
          }}
        />
        <input
          placeholder="Lozinka"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleRegister()}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a',
            color: '#f0f0f0', fontSize: '15px', marginBottom: '24px', outline: 'none'
          }}
        />
        <button onClick={handleRegister} style={{
          width: '100%', padding: '15px', background: '#b9ff4b', color: '#000',
          border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer'
        }}>
          Registruj se →
        </button>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(240,240,240,0.4)' }}>
          Već imaš nalog?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#b9ff4b', cursor: 'pointer', fontWeight: '600' }}>
            Prijavi se
          </span>
        </p>
      </div>
    </div>
  )
}