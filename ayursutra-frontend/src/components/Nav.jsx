import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const loc = useLocation()

  return (
    <header className="card header">
      <div className="nav-left">
        <h2 className="logo">Ayursutra</h2>
        <nav className="nav-links">
          <Link className={loc.pathname === '/' ? 'active' : ''} to="/">Patient Dashboard</Link>
          <Link className={loc.pathname === '/notifications' ? 'active' : ''} to="/notifications">Notifications</Link>
          <Link className={loc.pathname === '/feedback' ? 'active' : ''} to="/feedback">Feedback</Link>
          <Link className={loc.pathname === '/progress' ? 'active' : ''} to="/progress">Progress</Link>
          <Link className={loc.pathname === '/practitioner' ? 'active' : ''} to="/practitioner">Practitioner</Link>
        </nav>
      </div>
      <div className="nav-right">
        <span className="demo-badge">Demo</span>
      </div>
    </header>
  )
}

export default Nav
