import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminTeachers({ user, onLoginSuccess }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch((window.API_BASE || '') + '/api/admin/users')
        .then(res => res.json())
        .then(data => {
          setTeachers(data.filter(u => u.role === 'coach'));
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <AdminGateway user={user} onLoginSuccess={onLoginSuccess}>
      <section className="py-5 bg-darker" style={{ minHeight: '85vh' }}>
        <div className="container px-4 mt-4">
          
          {/* Back Navigation */}
          <div className="mb-4">
            <Link to="/admin" className="btn btn-yoddha-outline px-4 text-uppercase fw-bold text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Admin Portal
            </Link>
          </div>

          <div className="contact-info-box p-5 border border-maroon">
            <span className="section-tag text-warning">Faculty Directory</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Teacher / Coach<span>List</span></h3>
            
            {loading ? (
              <div className="py-5 text-center text-secondary">
                <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                <div>Loading coaches roster...</div>
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                  <thead className="table-active text-white text-uppercase">
                    <tr>
                      <th>ID</th>
                      <th>Coach Name</th>
                      <th>Email Address</th>
                      <th>Specialty Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.length === 0 ? (
                      <tr><td colSpan="4" className="text-center p-3">No coaches registered yet.</td></tr>
                    ) : (
                      teachers.map(c => (
                        <tr key={c.id}>
                          <td>#{c.id}</td>
                          <td className="text-white fw-bold">{c.fullName}</td>
                          <td>{c.email}</td>
                          <td className="text-uppercase text-warning fw-bold">
                            {c.discipline === 'lathi_basics' ? 'Lathi Basics' 
                             : c.discipline === 'lathi_combat' ? 'Stick Sparring' 
                             : 'Advanced Stick Forms'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminGateway>
  );
}
