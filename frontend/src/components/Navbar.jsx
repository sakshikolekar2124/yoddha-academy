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
      <div className="container px-4">
        <NavLink className="navbar-brand navbar-brand-yoddha" to={getLogoTarget()} onClick={closeNavbar}>
          <img src="/images/logo.jpg" alt="Yoddha Academy Logo" className="brand-logo-img" />
          YODDHA<span>ACADEMY</span>
        </NavLink>
        <button className="navbar-toggler border-0 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#yoddhaNavbar" aria-controls="yoddhaNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="yoddhaNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
          
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-secondary small me-2">Hi, <strong>{user.fullName.split(' ')[0]}</strong></span>
                <button className="btn btn-sm btn-yoddha-outline px-3 text-uppercase" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink className="btn btn-sm btn-yoddha-primary px-3 text-uppercase text-white" to="/login">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
