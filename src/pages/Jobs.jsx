import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000'

export default function Jobs({ token }) {
  const [jobs, setJobs] = useState([])
  const [tech, setTech] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
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
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <input
          placeholder="Pretraži po tech stacku..."
          value={tech}
          onChange={e => setTech(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '15px' }}
        />
        <button onClick={fetchJobs}
          style={{ padding: '12px 24px', background: '#b9ff4b', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
          Pretraži
        </button>
      </div>

      {loading ? <p>Učitavanje...</p> : jobs.length === 0 ? <p>Nema oglasa.</p> : (
        jobs.map(job => (
          <div key={job.id} style={{ background: '#141414', border: '1px solid #222', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '20px', marginBottom: '6px' }}>{job.title}</h2>
                <p style={{ color: '#888', marginBottom: '8px' }}>{job.company} · {job.location}</p>
                <p style={{ color: '#b9ff4b', fontSize: '13px', fontWeight: '600' }}>{job.tech_stack}</p>
              </div>
            </div>
            {job.description && <p style={{ marginTop: '12px', color: '#aaa', fontSize: '14px' }}>{job.description}</p>}
          </div>
        ))
      )}
    </div>
  )
}