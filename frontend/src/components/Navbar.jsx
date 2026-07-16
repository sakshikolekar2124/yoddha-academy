import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ onOpenModal, user, onLogout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLogoTarget = () => {
    return '/admin';
  };

  const closeNavbar = () => {
    const collapseEl = document.getElementById('yoddhaNavbar');
    if (collapseEl && collapseEl.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom sticky-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container px-4 position-relative d-flex align-items-center justify-content-between">
        
        {/* Toggle Button */}
        <button 
          className="navbar-toggler border-0 text-white px-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#yoddhaNavbar" 
          aria-controls="yoddhaNavbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>

        {/* Brand Logo + Text */}
        <NavLink 
          className="navbar-brand navbar-brand-yoddha" 
          to={getLogoTarget()} 
          onClick={closeNavbar}
        >
          <img src="/images/logo.jpg" alt="Yoddha Academy Logo" className="brand-logo-img" />
          YODDHA<span>ACADEMY</span>
        </NavLink>

        {/* Sign In / User Actions */}
        <div className="navbar-actions">
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-secondary small me-2 d-none d-lg-inline">Hi, <strong>{user.fullName.split(' ')[0]}</strong></span>
              <button className="btn btn-sm btn-yoddha-outline px-3 text-uppercase" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink className="btn btn-sm btn-yoddha-primary px-3 text-uppercase text-white" to="/login" onClick={closeNavbar}>
              Sign In
            </NavLink>
          )}
        </div>

        {/* Collapsible Menu Links */}
        <div className="collapse navbar-collapse" id="yoddhaNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/" onClick={closeNavbar}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/about" onClick={closeNavbar}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/gallery" onClick={closeNavbar}>Gallery</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/success" onClick={closeNavbar}>Student Success</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/news" onClick={closeNavbar}>News</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/contact" onClick={closeNavbar}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/reviews" onClick={closeNavbar}>Reviews</NavLink>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom text-warning ${isActive ? 'active' : ''}`} to="/admin" onClick={closeNavbar}>Admin Panel</NavLink>
              </li>
            )}
            {user && user.role === 'coach' && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom text-warning ${isActive ? 'active' : ''}`} to="/coach" onClick={closeNavbar}>Coach Panel</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
