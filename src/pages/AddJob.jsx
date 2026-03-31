import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'http://localhost:8000'

export default function AddJob({ token }) {
  const [form, setForm] = useState({
    title: '', company: '', location: '', tech_stack: '', description: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location || !form.tech_stack) {
      setError('Sva polja osim opisa su obavezna!')
      return
    }
    try {
      await axios.post(`${API}/jobs/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch {
      setError('Greška pri dodavanju oglasa')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: '1px solid #333', background: '#1a1a1a', color: '#fff',
    fontSize: '15px', marginBottom: '12px'
  }

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '28px' }}>Dodaj oglas</h1>
      {error && <p style={{ color: '#ff4b4b', marginBottom: '16px' }}>{error}</p>}
      <input name="title" placeholder="Naziv pozicije" value={form.title} onChange={handleChange} style={inputStyle} />
      <input name="company" placeholder="Kompanija" value={form.company} onChange={handleChange} style={inputStyle} />
      <input name="location" placeholder="Lokacija" value={form.location} onChange={handleChange} style={inputStyle} />
      <input name="tech_stack" placeholder="Tech stack (npr. Python, FastAPI)" value={form.tech_stack} onChange={handleChange} style={inputStyle} />
      <textarea name="description" placeholder="Opis pozicije (opciono)" value={form.description} onChange={handleChange}
        style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />
      <button onClick={handleSubmit}
        style={{ width: '100%', padding: '14px', background: '#b9ff4b', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
        Objavi oglas
      </button>
    </div>
  )
}