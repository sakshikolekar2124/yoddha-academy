import React from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminProfile({ user, onLoginSuccess }) {
  return (
    <AdminGateway user={user} onLoginSuccess={onLoginSuccess}>
      <section className="py-5 bg-darker" style={{ minHeight: '85vh' }}>
        <div className="container px-4 mt-4" style={{ maxWidth: '800px' }}>
          
          {/* Back Navigation */}
          <div className="mb-4">
            <Link to="/admin" className="btn btn-yoddha-outline px-4 text-uppercase fw-bold text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Admin Portal
            </Link>
          </div>

          <div className="contact-info-box p-5 border border-maroon">
            <span className="section-tag text-warning">Security Settings</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Founder<span>Profile</span></h3>
            
            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <div className="p-4 rounded border border-light bg-black bg-opacity-45">
                  <span className="text-secondary small d-block mb-1">Founder Name</span>
                  <h4 className="h6 fw-bold text-white mb-0">{user?.fullName || 'Onkar Hupare'}</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 rounded border border-light bg-black bg-opacity-45">
                  <span className="text-secondary small d-block mb-1">Email Account</span>
                  <h4 className="h6 fw-bold text-white mb-0">{user?.email || 'admin@yoddha.in'}</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 rounded border border-light bg-black bg-opacity-45">
                  <span className="text-secondary small d-block mb-1">Academy Name</span>
                  <h4 className="h6 fw-bold text-white mb-0">Yoddha Lathi Kathi Academy</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 rounded border border-light bg-black bg-opacity-45">
                  <span className="text-secondary small d-block mb-1">Status</span>
                  <h4 className="h6 fw-bold text-success mb-0">
                    <i className="fa-solid fa-circle-check me-2"></i>Secure Active Connection
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminGateway>
  );
}
