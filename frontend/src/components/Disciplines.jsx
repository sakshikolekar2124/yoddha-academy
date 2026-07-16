import React from 'react';

export default function Disciplines() {
  return (
    <section id="disciplines" class="py-section bg-darker">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Training Programs</span>
          <h2 class="section-title">Explore Our<span>Disciplines</span></h2>
        </div>
        
        <div class="row g-4 justify-content-center">
          {/* Lathi Kathi Card */}
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="discipline-card">
              <img src="/images/lathi_kathi.jpg" alt="Lathi Kathi Training" class="discipline-img" />
              <div class="discipline-overlay">
                <span class="discipline-tag">Traditional Weapon Sport</span>
                <h3>Lathi Kathi</h3>
                <p>Master the ancient Indian stick-fighting art. Build coordination, lightning reflexes, and self-defense skills.</p>
              </div>
            </div>
          </div>
          
          {/* MMA Card */}
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="discipline-card">
              <img src="/images/mma_program.jpg" alt="MMA Sparring" class="discipline-img" />
              <div class="discipline-overlay">
                <span class="discipline-tag">Modern Combat</span>
                <h3>Mixed Martial Arts</h3>
                <p>A comprehensive combat system combining boxing, kickboxing, wrestling, and submission grappling in one program.</p>
              </div>
            </div>
          </div>
          
          {/* Wrestling Card */}
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="discipline-card">
              <img src="/images/wrestling_program.jpg" alt="Wrestling Practice" class="discipline-img" />
              <div class="discipline-overlay">
                <span class="discipline-tag">Olympic Sport</span>
                <h3>Wrestling</h3>
                <p>Forge unmatched core strength, body control, and submission defense with elite freestyle and Greco-Roman techniques.</p>
              </div>
            </div>
          </div>
          
          {/* Strength & Conditioning Card */}
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div class="discipline-card">
              <img src="/images/strength_program.jpg" alt="Strength lifter workout" class="discipline-img" />
              <div class="discipline-overlay">
                <span class="discipline-tag">High Performance</span>
                <h3>Strength & Conditioning</h3>
                <p>Optimize your athletic performance. Build explosive power, structural endurance, and injury-proofing workouts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
