import React, { useEffect, useState } from 'react';

export default function Success() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch((window.API_BASE || '') + '/api/achievements')
      .then(res => res.json())
      .then(data => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching achievements:', err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { metric: '50+', label: 'Gold Medals' },
    { metric: '35+', label: 'State Trophies' },
    { metric: '15+', label: 'National Medals' },
    { metric: '100%', label: 'Discipline & Grit' }
  ];

  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          <span className="section-tag">Glory & Pride</span>
          <h1 className="fw-900 text-uppercase mb-2">Student<span>Success</span></h1>
          <p className="text-secondary max-width-600 mx-auto">
            Discover the achievements, gold medals, and practitioner transformations that define Yoddha Academy.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 border-bottom border-light bg-black bg-opacity-20">
        <div className="container px-4">
          <div className="row g-4 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="p-3">
                  <span className="display-5 fw-900 text-warning d-block mb-1">{stat.metric}</span>
                  <span className="text-uppercase text-secondary font-monospace small" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medalist Grid Showcase */}
      <section className="py-section">
        <div className="container px-4">
          <div className="section-header text-center mb-5" data-aos="fade-up">
            <span className="section-tag">Championship Board</span>
            <h2 className="section-title">Yoddha Academy<span>Medalists</span></h2>
            <p className="text-secondary max-width-600 mx-auto">
              Our student practitioners compete and win at district, state, and national tournaments. Here are our active achievers:
            </p>
          </div>

          {loading ? (
            <div className="py-5 text-center text-secondary">
              <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
              <div>Loading medalist athletes list...</div>
            </div>
          ) : achievements.length === 0 ? (
            <div className="py-5 text-center text-secondary small">
              <i className="fa-solid fa-trophy mb-3 fa-2x text-warning"></i>
              <div>No achievement records added yet. Check back soon!</div>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {achievements.map((item, idx) => (
                <div key={item.id} className="col-lg-3 col-md-6 col-sm-12" data-aos="zoom-in" data-aos-delay={idx * 100}>
                  <div className="contact-info-box border border-maroon p-0 rounded overflow-hidden h-100 d-flex flex-column transition-all duration-300 hover-shadow-lg hover-rise" style={{ minHeight: '380px', background: '#0e080b' }}>
                    {/* Athlete photo */}
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={item.img} 
                        alt={item.studentName} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                      />
                      {/* Medal badge on image */}
                      <div className="position-absolute top-3 end-3" style={{ zIndex: 10 }}>
                        <span 
                          className="badge text-uppercase font-monospace text-dark px-3 py-2 fw-bold border border-dark rounded-pill"
                          style={{ 
                            fontSize: '0.65rem', 
                            background: item.medalLevel.includes('Gold') || item.medalLevel.includes('National') || item.medalLevel.includes('Champion') ? 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)' : 'linear-gradient(135deg, #c0c0c0 0%, #a9a9a9 100%)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                          }}
                        >
                          <i className="fa-solid fa-medal me-1"></i>
                          {item.medalLevel}
                        </span>
                      </div>
                    </div>

                    {/* Athlete credentials */}
                    <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        <h3 className="h5 fw-bold text-white text-uppercase mb-1 letter-spacing-1">{item.studentName}</h3>
                        <p className="text-secondary small font-monospace mb-0" style={{ fontSize: '0.75rem', color: '#ffc107 !important' }}>
                          <i className="fa-solid fa-trophy text-warning me-1"></i>
                          {item.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
