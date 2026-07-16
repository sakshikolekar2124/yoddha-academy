import React, { useEffect, useState } from 'react';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          <span className="section-tag">Updates & Blogs</span>
          <h1 className="fw-900 text-uppercase mb-2">Academy<span>News</span></h1>
          <p className="text-secondary max-width-600 mx-auto">
            Stay updated with upcoming tournaments, ranking grading events, and Lathi Kathi speed seminars at Yoddha Academy.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-section">
        <div className="container px-4">
          {loading ? (
            <div className="py-5 text-center text-secondary">
              <i className="fa-solid fa-circle-notch fa-spin fa-3x mb-3 text-warning"></i>
              <div>Loading academy dispatch...</div>
            </div>
          ) : (
            <div className="row g-4">
              {newsList.length === 0 ? (
                <div className="col-12 text-center text-secondary py-5">
                  <i className="fa-solid fa-newspaper fa-3x mb-3 text-secondary opacity-30"></i>
                  <div>No news updates posted yet. Stay tuned!</div>
                </div>
              ) : (
                newsList.map((news, idx) => (
                  <div key={news.id || idx} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                    <div className="coach-card">
                      <div className="coach-img-wrapper" style={{ height: '220px' }}>
                        <img src={news.img} alt={news.title} className="coach-img" />
                        <span className="position-absolute top-3 start-3 badge bg-danger text-uppercase fw-bold border border-warning" style={{ zIndex: 5, padding: '0.4rem 0.8rem' }}>
                          {news.tag}
                        </span>
                      </div>
                      <div className="p-4">
                        <span className="text-warning small d-block mb-2"><i className="fa-regular fa-calendar me-2"></i>{news.date}</span>
                        <h3 className="h5 fw-bold text-uppercase mb-3" style={{ height: '48px', overflow: 'hidden' }}>{news.title}</h3>
                        <p className="text-secondary small mb-0">{news.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
