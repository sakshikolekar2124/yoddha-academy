import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-yoddha">
      <div className="container px-4">
        <div className="row g-4">
          {/* Logo & Socials */}
          <div className="col-lg-5 col-md-12">
            <Link className="navbar-brand-yoddha mb-3 d-inline-block" to="/">
              <img src="/images/logo.jpg" alt="Yoddha Academy Logo" className="brand-logo-img" style={{ marginRight: '0.4rem' }} />
              YODDHA<span>ACADEMY</span>
            </Link>
            <p className="footer-description">
              The premier training ground for traditional South Asian stick-fighting, wrestling excellence, and high-performance combat conditioning.
            </p>
            <div className="footer-social-wrapper">
              <a href="https://www.instagram.com/yoddhaacademy" className="footer-social-link" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.facebook.com/489399877595936/" className="footer-social-link" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://wa.me/917766885311" className="footer-social-link" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="#" className="footer-social-link"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          
          {/* Nav Links */}
          <div className="col-md-6 col-lg-3">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Base</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/success">Student Success</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </div>
          
          {/* Disciplines links */}
          <div className="col-md-6 col-lg-4">
            <h4 className="footer-title">Lathi Courses</h4>
            <ul className="footer-links">
              <li><Link to="/gallery">Lathi Kathi Basics</Link></li>
              <li><Link to="/gallery">Stick Sparring & Combat</Link></li>
              <li><Link to="/gallery">Advanced Stick Form</Link></li>
              <li><Link to="/gallery">Federation Cup Practice</Link></li>
              <li><Link to="/gallery">Summer Youth Camp</Link></li>
              <li><Link to="/gallery">Traditional Forms (Kathas)</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; 2026 Yoddha Academy. All rights reserved. Designed for high performance.
          </p>
          <div className="footer-policy-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Rules of the Arena</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
