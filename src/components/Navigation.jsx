import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/research', label: 'Research', icon: '🔬' },
    { path: '/booths', label: 'Booths', icon: '🏢' },
    { path: '/sharktank', label: 'Pitch', icon: '🦈' },
    { path: '/auditorium', label: 'Auditorium', icon: '🎤' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: '⚙️' });
  }

  return (
    <nav className="navigation">
      <div className="nav-content">
        <div className="nav-user">
          {user && (
            <>
              <img
                src={user.picture || '/default-avatar.png'}
                alt={user.name}
                className="nav-avatar"
              />
              <span className="nav-username">{user.name}</span>
            </>
          )}
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
        <button onClick={logout} className="btn-secondary nav-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navigation;

