import { useNavigate } from 'react-router-dom'

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <nav style={{
      background: 'rgba(8,8,8,0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '18px 6vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)'
    }}>
      <div onClick={() => navigate('/')} style={{
        fontWeight: '800',
        fontSize: '22px',
        cursor: 'pointer',
        letterSpacing: '3px',
        fontFamily: 'monospace'
      }}>
        JOB<span style={{ color: '#b9ff4b' }}>BOARD</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {token ? (
          <>
            <button onClick={() => navigate('/add')} style={{
              padding: '10px 22px',
              background: '#b9ff4b',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              letterSpacing: '0.3px'
            }}>
              + Dodaj oglas
            </button>
            <button onClick={logout} style={{
              padding: '10px 22px',
              background: 'transparent',
              color: '#f0f0f0',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Odjavi se
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} style={{
              padding: '10px 22px',
              background: 'transparent',
              color: '#f0f0f0',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Login
            </button>
            <button onClick={() => navigate('/register')} style={{
              padding: '10px 22px',
              background: '#b9ff4b',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Registruj se
            </button>
          </>
        )}
      </div>
    </nav>
  )
}