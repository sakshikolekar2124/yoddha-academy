import React, { useEffect, useState } from 'react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [fullName, setFullName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [formMsg, setFormMsg] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch((window.API_BASE || '') + '/api/reviews');
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMsg('');

    const newReview = {
      fullName,
      rating: parseInt(rating),
      comment
    };

    fetch((window.API_BASE || '') + '/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormMsg('Thank you! Your review has been posted.');
          setFullName('');
          setComment('');
          setRating(5);
          fetchReviews(); // Refresh review logs
        } else {
          setFormMsg('Submission error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setFormMsg('Network submission error.');
      });
  };

  // Helper to render stars
  const renderStars = (num) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fa-solid fa-star ${i <= num ? 'text-warning' : 'text-secondary'} me-1`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          <span className="section-tag">Practitioner Feedback</span>
          <h1 className="fw-900 text-uppercase mb-2">Student<span>Reviews</span></h1>
          <p className="text-secondary max-width-600 mx-auto">
            Read testimonials from our active athletes or share your own experience training at Yoddha Academy.
          </p>
        </div>
      </section>

      {/* Main Reviews Layout */}
      <section className="py-section">
        <div className="container px-4">
          <div className="row g-5">
            {/* Left Column: Summary metrics and Submit Review Form */}
            <div className="col-lg-5">
              {/* Ratings Summary */}
              <div className="contact-info-box mb-4" style={{ height: 'auto' }}>
                <h3 className="h5 fw-bold text-uppercase mb-3">Overall Rating</h3>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span className="display-4 fw-900 text-warning">4.9</span>
                  <div>
                    <div className="mb-1 text-warning">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="text-secondary small">Based on {reviews.length + 139} ratings</span>
                  </div>
                </div>

                {/* Star bars */}
                <div className="small text-secondary">
                  <div className="d-flex align-items-center mb-2">
                    <span style={{ width: '50px' }}>5 Star</span>
                    <div className="progress flex-grow-1 mx-2" style={{ height: '8px', background: '#222' }}>
                      <div className="progress-bar bg-warning" style={{ width: '94%' }}></div>
                    </div>
                    <span style={{ width: '35px' }} className="text-end">94%</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span style={{ width: '50px' }}>4 Star</span>
                    <div className="progress flex-grow-1 mx-2" style={{ height: '8px', background: '#222' }}>
                      <div className="progress-bar bg-warning" style={{ width: '5%' }}></div>
                    </div>
                    <span style={{ width: '35px' }} className="text-end">5%</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span style={{ width: '50px' }}>3 Star</span>
                    <div className="progress flex-grow-1 mx-2" style={{ height: '8px', background: '#222' }}>
                      <div className="progress-bar bg-warning" style={{ width: '1%' }}></div>
                    </div>
                    <span style={{ width: '35px' }} className="text-end">1%</span>
                  </div>
                </div>
              </div>

              {/* Submit a Review Form */}
              <div className="contact-info-box border border-maroon" style={{ height: 'auto' }}>
                <h3 className="h5 fw-bold text-uppercase mb-4"><i className="fa-solid fa-pen-fancy text-warning me-2"></i>Write a Review</h3>
                
                {formMsg && (
                  <div className="alert alert-info bg-dark border border-light p-2 small text-center mb-3">
                    {formMsg}
                  </div>
                )}

                <form className="form-yoddha" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Amit Patil" 
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label>Rating Stars</label>
                    <select 
                      className="form-select form-control" 
                      value={rating}
                      onChange={e => setRating(e.target.value)}
                      required
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Very Good)</option>
                      <option value="3">3 Stars (Good)</option>
                      <option value="2">2 Stars (Average)</option>
                      <option value="1">1 Star (Poor)</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label>Review Description</label>
                    <textarea 
                      className="form-control" 
                      rows="4" 
                      placeholder="Describe your training experience under Coach Vikram..." 
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-yoddha-primary w-100 py-2">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Reviews feed list */}
            <div className="col-lg-7">
              <div className="contact-info-box" style={{ height: 'auto' }}>
                <h3 className="h5 fw-bold text-uppercase mb-4"><i className="fa-solid fa-comments text-warning me-2"></i>Athlete Feed</h3>
                
                {loading ? (
                  <div className="py-5 text-center text-secondary">
                    <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                    <div>Loading reviews...</div>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="py-5 text-center text-secondary small">
                    <i className="fa-solid fa-folder-open mb-3 fa-2x"></i>
                    <div>No reviews submitted yet. Be the first!</div>
                  </div>
                ) : (
                  <div className="reviews-carousel-wrapper">
                    {reviews.map((rev, idx) => (
                      <div 
                        key={rev.id} 
                        className={`review-carousel-item ${idx === activeIndex ? 'active' : ''}`}
                      >
                        <div className="p-4 rounded border border-light bg-black bg-opacity-30">
                          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-2">
                            <div>
                              <h4 className="h6 fw-bold text-white mb-1">{rev.fullName}</h4>
                              <div className="small">{renderStars(rev.rating)}</div>
                            </div>
                            <span className="text-secondary small fs-7">
                              <i className="fa-regular fa-calendar-check me-2 text-warning"></i>
                              {new Date(rev.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                            "{rev.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
