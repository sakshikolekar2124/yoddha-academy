import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminStudents({ user, onLoginSuccess }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch((window.API_BASE || '') + '/api/admin/users')
        .then(res => res.json())
        .then(data => {
          setStudents(data.filter(u => u.role === 'student'));
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
            <span className="section-tag text-warning">Roster Database</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Registered<span>Athletes</span></h3>
            
            {loading ? (
              <div className="py-5 text-center text-secondary">
                <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                <div>Loading athletes roster...</div>
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                  <thead className="table-active text-white text-uppercase">
                    <tr>
                      <th>ID</th>
                      <th>Student Name</th>
                      <th>Email</th>
                      <th>Account Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr><td colSpan="4" className="text-center p-3">No students registered yet.</td></tr>
                    ) : (
                      students.map(s => (
                        <tr key={s.id}>
                          <td>#{s.id}</td>
                          <td className="text-white fw-bold">{s.fullName}</td>
                          <td>{s.email}</td>
                          <td><span className="badge bg-secondary text-uppercase">Student</span></td>
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
