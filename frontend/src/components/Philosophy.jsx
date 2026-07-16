import React from 'react';

export default function Philosophy() {
  return (
    <section id="about" class="py-section">
      <div class="container px-4">
        <div class="row align-items-center mb-5">
          <div class="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
            <div class="section-header">
              <span class="section-tag">Our Core Philosophy</span>
              <h2 class="section-title">The Code of the<span>Yoddha</span></h2>
            </div>
            <p class="text-secondary mb-4 fs-5">
              At Yoddha Academy, we train with honor. Combining ancient Indian tactical systems and modern sports science, we shape physical durability, quick reflexes, and mental mastery.
            </p>
            <div class="d-flex gap-3 mb-4">
              <div class="contact-icon-wrapper">
                <i class="fa-solid fa-award"></i>
              </div>
              <div>
                <h5 class="fw-bold uppercase mb-1">State-of-the-Art Arena</h5>
                <p class="text-secondary small">Equipped with championship rings, premium grappling mats, and high-performance strength equipment.</p>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6" data-aos="fade-left" data-aos-duration="1000">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="philosophy-card">
                  <div class="philosophy-icon"><i class="fa-solid fa-brain"></i></div>
                  <h3>Discipline</h3>
                  <p>Consistency is key. We build habits of punctuality, mental resilience, and rigorous devotion to progress.</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="philosophy-card">
                  <div class="philosophy-icon"><i class="fa-solid fa-dumbbell"></i></div>
                  <h3>Grit</h3>
                  <p>Overcoming obstacles. We foster physical durability and the willpower to push beyond perceived limits.</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="philosophy-card">
                  <div class="philosophy-icon"><i class="fa-solid fa-trophy"></i></div>
                  <h3>Victory</h3>
                  <p>Aim for the top. Whether you train for elite competition or self-defense, our focus is absolute mastery.</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="philosophy-card">
                  <div class="philosophy-icon"><i class="fa-solid fa-handshake-angle"></i></div>
                  <h3>Honor</h3>
                  <p>Respect for the sport, the coaches, and your sparring partners is non-negotiable at Yoddha Academy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
