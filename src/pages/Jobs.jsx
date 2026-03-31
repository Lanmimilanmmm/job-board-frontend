import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000'

export default function Jobs({ token }) {
  const [jobs, setJobs] = useState([])
  const [tech, setTech] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/jobs/`, {
        params: { tech: tech || undefined }
      })
      setJobs(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  return (
    <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 6vw' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', lineHeight: 1.1, marginBottom: '12px' }}>
          Pronađi svoj <span style={{ color: '#b9ff4b' }}>sledeći posao</span>
        </h1>
        <p style={{ color: 'rgba(240,240,240,0.5)', fontSize: '17px' }}>
          {jobs.length} aktivnih oglasa
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
        <input
          placeholder="Pretraži po tech stacku... (npr. Python, React)"
          value={tech}
          onChange={e => setTech(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchJobs()}
          style={{
            flex: 1, padding: '14px 18px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#141414', color: '#f0f0f0', fontSize: '15px',
            outline: 'none'
          }}
        />
        <button onClick={fetchJobs} style={{
          padding: '14px 28px', background: '#b9ff4b', color: '#000',
          border: 'none', borderRadius: '10px', fontWeight: '700',
          fontSize: '15px', cursor: 'pointer'
        }}>
          Pretraži
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(240,240,240,0.4)' }}>
          Učitavanje...
        </div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(240,240,240,0.4)' }}>
          Nema oglasa za "{tech}"
        </div>
      ) : (
        jobs.map(job => (
          <div key={job.id} style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '28px 32px',
            marginBottom: '16px',
            transition: 'border-color 0.2s',
            cursor: 'default'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(185,255,75,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>{job.title}</h2>
                <p style={{ color: 'rgba(240,240,240,0.5)', fontSize: '14px', marginBottom: '12px' }}>
                  {job.company} · {job.location}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {job.tech_stack.split(',').map((tech, i) => (
                    <span key={i} style={{
                      background: 'rgba(185,255,75,0.08)',
                      border: '1px solid rgba(185,255,75,0.2)',
                      color: '#b9ff4b',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      letterSpacing: '0.5px'
                    }}>
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <span style={{
                fontSize: '12px',
                color: 'rgba(240,240,240,0.3)',
                whiteSpace: 'nowrap'
              }}>
                {new Date(job.created_at).toLocaleDateString('sr-RS')}
              </span>
            </div>
            {job.description && (
              <p style={{ marginTop: '16px', color: 'rgba(240,240,240,0.6)', fontSize: '14px', lineHeight: '1.6' }}>
                {job.description}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  )
}