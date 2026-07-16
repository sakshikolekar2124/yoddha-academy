import React from 'react';

export default function Hero({ onOpenModal }) {
  return (
    <header id="home" class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container px-4">
        <div class="hero-content" data-aos="fade-right" data-aos-duration="1200">
          <div class="hero-subtitle">
            <i class="fa-solid fa-star me-2"></i> Forging Discipline & Mental Grit
          </div>
          <h1 class="hero-title">
            Unleash the Warrior<span>Within You</span>
          </h1>
          <p class="hero-para">
            Yoddha Training Academy in Kolhapur offers championship training. Discover the traditional art of Lathi Kathi along with Olympic Wrestling, MMA, and Strength Conditioning.
          </p>
          <div class="d-flex flex-wrap gap-3">
            <button class="btn btn-yoddha-primary" onClick={() => onOpenModal('General Trial')}>
              Join the Academy
            </button>
            <a href="#schedule" class="btn btn-yoddha-outline">
              Training Schedule
            </a>
          </div>
          
          {/* Floating metrics */}
          <div class="hero-metrics">
            <div class="metric-item">
              <span class="metric-val">800+</span>
              <span class="metric-label">Active Athletes</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">12+</span>
              <span class="metric-label">Elite Coaches</span>
            </div>
            <div class="metric-item">
              <span class="metric-val">15+</span>
              <span class="metric-label">National Medals</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
