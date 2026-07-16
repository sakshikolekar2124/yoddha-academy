import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminReviews({ user, onLoginSuccess }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchReviews();
    }
  }, [user]);

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this customer review permanently?')) {
      fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetchReviews();
          } else {
            alert('Failed to delete review.');
          }
        })
        .catch(err => console.error(err));
    }
  };

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
            <span className="section-tag text-warning">Athlete Testimonials</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Reviews<span>Moderator</span></h3>
            
            {loading ? (
              <div className="py-5 text-center text-secondary">
                <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                <div>Retrieving visitor reviews...</div>
              </div>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                  <thead className="table-active text-white text-uppercase">
                    <tr>
                      <th>Author</th>
                      <th>Rating</th>
                      <th>Comment Review</th>
                      <th>Date</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.length === 0 ? (
                      <tr><td colSpan="5" className="text-center p-3">No reviews submitted yet.</td></tr>
                    ) : (
                      reviews.map(rev => (
                        <tr key={rev.id}>
                          <td className="text-white fw-bold">{rev.fullName}</td>
                          <td>
                            <div className="text-warning">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <i 
                                  key={idx} 
                                  className={idx < rev.rating ? 'fa-solid fa-star me-1' : 'fa-regular fa-star me-1'}
                                  style={{ fontSize: '0.75rem' }}
                                ></i>
                              ))}
                            </div>
                          </td>
                          <td className="text-white" style={{ maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            "{rev.comment}"
                          </td>
                          <td>{new Date(rev.createdAt).toLocaleDateString()}</td>
                          <td className="text-center">
                            <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteReview(rev.id)} title="Delete Review">
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
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
