import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🎵 MusicSystem
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          {user && <Link to="/liked">Liked Songs</Link>}
        </nav>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">{user.avatar}</div>
              <span>{user.username}</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ marginLeft: '0.5rem' }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;