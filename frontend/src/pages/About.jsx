import React from 'react';
import Philosophy from '../components/Philosophy';

export default function About() {
  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          {/* <span className="section-tag">Who We Are</span> */}
          <h1 className="fw-900 text-uppercase mb-2">About Our Academy</h1>
          <p className="text-secondary max-width-600 mx-auto">
            Discover the legacy, the values, and the expert coaching team behind Kolhapur's premier sports and combat arena.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <Philosophy />

      {/* Infrastructure / Facility Context */}
      <section className="py-section">
        <div className="container px-4">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-header">
                <span className="section-tag">Elite Infrastructure</span>
                <h2 className="section-title">State-of-the-Art<span>Training Facility</span></h2>
              </div>
              <p className="text-secondary mb-4">
                Yoddha Academy occupies a sprawling high-ceiling facility engineered for traditional weapon training, speed, and safety. Our training layout is divided into dedicated functional zones to support stick combat.
              </p>
              <ul className="list-unstyled text-secondary mb-0">
                <li className="mb-3 d-flex align-items-start gap-2">
                  <i className="fa-solid fa-circle-check text-warning mt-1"></i>
                  <div>
                    <strong>Weapon Training Courts:</strong> Open wood floors engineered for safe stick rotations, group forms, and multi-directional combat drills.
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start gap-2">
                  <i className="fa-solid fa-circle-check text-warning mt-1"></i>
                  <div>
                    <strong>Impact Defense Mats:</strong> High-density mats optimal for safe takedown recoveries and rolling defenses during weapon combat simulation.
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start gap-2">
                  <i className="fa-solid fa-circle-check text-warning mt-1"></i>
                  <div>
                    <strong>Premium Weapon Racks:</strong> Clean storage for diverse weights and lengths of polished bamboo/oak lathi sticks, alongside protective armor gears.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <i className="fa-solid fa-circle-check text-warning mt-1"></i>
                  <div>
                    <strong>Agility & Reflex Zone:</strong> Equipped with speed bands, reaction balls, and ladders to build quick reflex strikes and explosive footwork.
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left">
              <div className="row g-3">
                <div className="col-12">
                  <img src="/images/lathi_kathi.jpg" alt="Lathi Kathi Training Zone" className="img-fluid rounded border border-light" style={{ height: '320px', width: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
