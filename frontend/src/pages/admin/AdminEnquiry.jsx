import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminEnquiry({ user, onLoginSuccess }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch('/api/admin/trial-requests')
        .then(res => res.json())
        .then(data => {
          setRequests(data);
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
            <span className="section-tag text-warning">Trial Signups</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Enquiry<span>List</span></h3>
            
            {loading ? (
              <div className="py-5 text-center text-secondary">
                <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                <div>Retrieving enquiries...</div>
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                  <thead className="table-active text-white text-uppercase">
                    <tr>
                      <th>Enquirer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Requested Course</th>
                      <th>Level</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr><td colSpan="6" className="text-center p-3">No enquiries registered yet.</td></tr>
                    ) : (
                      requests.map(req => (
                        <tr key={req.id}>
                          <td className="text-white fw-bold">{req.fullName}</td>
                          <td>{req.email}</td>
                          <td>{req.phone}</td>
                          <td className="text-uppercase text-warning fw-bold">
                            {req.discipline === 'lathi_basics' ? 'Lathi Basics'
                             : req.discipline === 'lathi_combat' ? 'Stick Sparring'
                             : 'Advanced Stick'}
                          </td>
                          <td className="text-capitalize">{req.experience}</td>
                          <td>{new Date(req.createdAt).toLocaleDateString()}</td>
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
