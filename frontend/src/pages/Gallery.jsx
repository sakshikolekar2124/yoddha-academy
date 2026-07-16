import React, { useEffect, useState } from 'react';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch((window.API_BASE || '') + '/api/gallery')
      .then(res => res.json())
      .then(data => {
        setGalleryItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery photos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          <span className="section-tag">Arena Gallery</span>
          <h1 className="fw-900 text-uppercase mb-2">Academy<span>Gallery</span></h1>
          <p className="text-secondary max-width-600 mx-auto">
            Discover the daily training vibes, defensive weapon forms, and full-contact combat environments inside Yoddha Academy.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-section">
        <div className="container px-4">
          
          {loading ? (
            <div className="py-5 text-center text-secondary">
              <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
              <div>Loading gallery pictures...</div>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="py-5 text-center text-secondary small">
              <i className="fa-solid fa-folder-open mb-3 fa-2x"></i>
              <div>No photos available in the gallery.</div>
            </div>
          ) : (
            <div className="row g-4">
              {galleryItems.map(item => (
                <div key={item.id} className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration="600">
                  <div className="discipline-card shadow-lg position-relative rounded overflow-hidden" style={{ height: '280px' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="discipline-img w-100 h-100" 
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    />
                    {(item.title || item.description) && (
                      <div className="discipline-overlay p-4 d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)' }}>
                        {item.title && <h3 className="h5 fw-bold text-white text-uppercase mb-1">{item.title}</h3>}
                        {item.description && <p className="text-secondary small mb-0" style={{ opacity: 0.95 }}>{item.description}</p>}
                      </div>
                    )}
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
