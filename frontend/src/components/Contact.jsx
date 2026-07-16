import React from 'react';

export default function Contact() {
  return (
    <section id="contact" class="py-section">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Get in Touch</span>
          <h2 class="section-title">Locate Our<span>Arena</span></h2>
        </div>
        
        <div class="row g-4">
          {/* Contact Details */}
          <div class="col-lg-4" data-aos="fade-right" data-aos-duration="1000">
            <div class="contact-info-box">
              <h3 class="mb-4 text-uppercase fw-bold">Contact Info</h3>
              
              <div class="contact-item">
                <div class="contact-icon-wrapper"><i class="fa-solid fa-location-dot"></i></div>
                <div class="contact-details">
                  <h4>Academy Location</h4>
                  <p>Ichalkaranji, Kolhapur, Maharashtra</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon-wrapper"><i class="fa-solid fa-phone"></i></div>
                <div class="contact-details">
                  <h4>Call Center</h4>
                  <p>+91 7766885311</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon-wrapper"><i class="fa-solid fa-envelope"></i></div>
                <div class="contact-details">
                  <h4>Email Arena</h4>
                  <p>onkarhupare40@gmail.com</p>
                </div>
              </div>
              

            </div>
          </div>
          
          {/* Mock Map Visual */}
          <div class="col-lg-8" data-aos="fade-left" data-aos-duration="1000">
            <div class="map-mock-container">
              <div class="map-mock-bg">
                <div class="map-mock-grid"></div>
                
                {/* Styled SVG route mapping */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                  <path d="M 50 150 Q 250 120 400 200 T 700 250" fill="none" stroke="rgba(226, 171, 36, 0.15)" strokeWidth="3" />
                  <path d="M 120 300 Q 300 280 400 200 T 550 50" fill="none" stroke="rgba(226, 171, 36, 0.15)" strokeWidth="2" />
                  <circle cx="400" cy="200" r="12" fill="rgba(226, 171, 36, 0.2)" />
                  <circle cx="400" cy="200" r="25" fill="none" stroke="rgba(226, 171, 36, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
                
                {/* Pin element */}
                <div class="map-mock-pin">
                  <i class="fa-solid fa-location-dot map-pin-icon"></i>
                  <div class="map-pin-tooltip">YODDHA ACADEMY - ICHALKARANJI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
