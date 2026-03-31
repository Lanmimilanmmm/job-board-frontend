import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://job-board-api-production-1566.up.railway.app'

export default function AddJob({ token }) {
  const [form, setForm] = useState({
    title: '', company: '', location: '', tech_stack: '', description: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location || !form.tech_stack) {
      setError('Sva polja osim opisa su obavezna!')
      return
    }
    if (!token) {
      navigate('/login')
      return
    }
    setLoading(true)
    try {
      await axios.post(`${API}/jobs/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch {
      setError('Greška pri dodavanju oglasa')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)', background: '#1a1a1a',
    color: '#f0f0f0', fontSize: '15px', marginBottom: '12px',
    outline: 'none', fontFamily: 'Segoe UI, sans-serif'
  }

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <div style={{
        background: '#111', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px', padding: '48px 40px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Novi oglas</h1>
        <p style={{ color: 'rgba(240,240,240,0.4)', marginBottom: '32px', fontSize: '15px' }}>
          Popuni detalje pozicije
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
        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>NAZIV POZICIJE</label>
        <input name="title" placeholder="npr. Senior Python Developer" value={form.title} onChange={handleChange} style={inputStyle} />

        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>KOMPANIJA</label>
        <input name="company" placeholder="npr. Levi9" value={form.company} onChange={handleChange} style={inputStyle} />

        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>LOKACIJA</label>
        <input name="location" placeholder="npr. Niš / Remote" value={form.location} onChange={handleChange} style={inputStyle} />

        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>TECH STACK</label>
        <input name="tech_stack" placeholder="npr. Python, FastAPI, PostgreSQL" value={form.tech_stack} onChange={handleChange} style={inputStyle} />

        <label style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(240,240,240,0.5)', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>OPIS (opciono)</label>
        <textarea name="description" placeholder="Kratko opišite poziciju..." value={form.description} onChange={handleChange}
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '15px', background: loading ? '#888' : '#b9ff4b',
          color: '#000', border: 'none', borderRadius: '10px',
          fontWeight: '700', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '8px'
        }}>
          {loading ? 'Objavljivanje...' : 'Objavi oglas →'}
        </button>
      </div>
    </div>
  )
}