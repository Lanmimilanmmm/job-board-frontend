import { useNavigate } from 'react-router-dom'

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <nav style={{ background: '#080808', borderBottom: '1px solid #222', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div onClick={() => navigate('/')} style={{ fontWeight: '800', fontSize: '20px', cursor: 'pointer', letterSpacing: '2px' }}>
        JOB<span style={{ color: '#b9ff4b' }}>BOARD</span>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        {token ? (
          <>
            <button onClick={() => navigate('/add')}
              style={{ padding: '8px 20px', background: '#b9ff4b', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
              + Dodaj oglas
            </button>
            <button onClick={logout}
              style={{ padding: '8px 20px', background: 'transparent', color: '#fff', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}>
              Odjavi se
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}
              style={{ padding: '8px 20px', background: 'transparent', color: '#fff', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' }}>
              Login
            </button>
            <button onClick={() => navigate('/register')}
              style={{ padding: '8px 20px', background: '#b9ff4b', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
              Registruj se
            </button>
          </>
        )}
      </div>
    </nav>
  )
}