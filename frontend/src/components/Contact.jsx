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
          
          {/* Interactive Google Map Embed */}
          <div class="col-lg-8" data-aos="fade-left" data-aos-duration="1000">
            <div class="map-mock-container" style={{ border: '1px solid var(--border-light)', borderRadius: '12px', overflow: 'hidden', minHeight: '380px' }}>
              <iframe 
                title="Yoddha Academy Google Map Location"
                src="https://maps.google.com/maps?q=Yoddha%20Academy,%20Ichalkaranji&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '380px', display: 'block' }} 
                allowfullscreen="" 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
