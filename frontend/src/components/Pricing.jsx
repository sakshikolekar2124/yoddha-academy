import React, { useState } from 'react';

export default function Pricing({ onOpenModal }) {
  const [isYearly, setIsYearly] = useState(false);

  const priceData = {
    starter: { monthly: '₹1,999', yearly: '₹1,599' },
    elite: { monthly: '₹3,499', yearly: '₹2,799' },
    unlimited: { monthly: '₹4,999', yearly: '₹3,999' }
  };

  return (
    <section id="pricing" class="py-section">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Membership Tiers</span>
          <h2 class="section-title">Invest in Your<span>Strength</span></h2>
        </div>
        
        {/* Pricing toggler */}
        <div class="pricing-toggle-wrapper" data-aos="fade-up" data-aos-delay="100">
          <span className={`pricing-toggle-label ${!isYearly ? 'active' : ''}`}>Monthly billing</span>
          <label class="switch-yoddha">
            <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
            <span class="slider-yoddha"></span>
          </label>
          <span className={`pricing-toggle-label ${isYearly ? 'active' : ''}`}>Yearly billing</span>
          <span class="discount-badge">Save 20%</span>
        </div>
        
        <div class="row g-4 justify-content-center">
          {/* Starter Plan */}
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="pricing-card">
              <h4 class="pricing-tier">Warrior Starter</h4>
              <div class="pricing-price">
                <span class="pricing-val">{isYearly ? priceData.starter.yearly : priceData.starter.monthly}</span>
                <span class="pricing-period">{isYearly ? '/ month (billed annually)' : '/ month'}</span>
              </div>
              <ul class="pricing-features">
                <li><i class="fa-solid fa-circle-check"></i> 3 Training Sessions per week</li>
                <li><i class="fa-solid fa-circle-check"></i> Access to Wrestling & Strength classes</li>
                <li><i class="fa-solid fa-circle-check"></i> Standard locker room access</li>
                <li class="disabled"><i class="fa-solid fa-circle-xmark"></i> Traditional Lathi Kathi entry</li>
                <li class="disabled"><i class="fa-solid fa-circle-xmark"></i> Personal coach nutrition reviews</li>
                <li class="disabled"><i class="fa-solid fa-circle-xmark"></i> Fight Night seminar passes</li>
              </ul>
              <button 
                class="btn btn-yoddha-outline w-100" 
                onClick={() => onOpenModal('Warrior Starter Plan', 'wrestling')}
              >
                Choose Plan
              </button>
            </div>
          </div>
          
          {/* Elite Plan */}
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="pricing-card popular">
              <span class="pricing-popular-badge">Most Popular</span>
              <h4 class="pricing-tier">Combat Elite</h4>
              <div class="pricing-price">
                <span class="pricing-val">{isYearly ? priceData.elite.yearly : priceData.elite.monthly}</span>
                <span class="pricing-period">{isYearly ? '/ month (billed annually)' : '/ month'}</span>
              </div>
              <ul class="pricing-features">
                <li><i class="fa-solid fa-circle-check"></i> 5 Training Sessions per week</li>
                <li><i class="fa-solid fa-circle-check"></i> Access to Wrestling, MMA & Strength</li>
                <li><i class="fa-solid fa-circle-check"></i> Full locker room + dry sauna access</li>
                <li><i class="fa-solid fa-circle-check"></i> Access to 1 Lathi Kathi slot/week</li>
                <li class="disabled"><i class="fa-solid fa-circle-xmark"></i> Personal coach nutrition reviews</li>
                <li><i class="fa-solid fa-circle-check"></i> 1 Free Fight Night seminar pass</li>
              </ul>
              <button 
                class="btn btn-yoddha-primary w-100" 
                onClick={() => onOpenModal('Combat Elite Plan', 'mma')}
              >
                Choose Plan
              </button>
            </div>
          </div>
          
          {/* Unlimited Plan */}
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div class="pricing-card">
              <h4 class="pricing-tier">Yoddha Unlimited</h4>
              <div class="pricing-price">
                <span class="pricing-val">{isYearly ? priceData.unlimited.yearly : priceData.unlimited.monthly}</span>
                <span class="pricing-period">{isYearly ? '/ month (billed annually)' : '/ month'}</span>
              </div>
              <ul class="pricing-features">
                <li><i class="fa-solid fa-circle-check"></i> Unlimited gym & class access</li>
                <li><i class="fa-solid fa-circle-check"></i> All programs: Wrestling, MMA, Strength</li>
                <li><i class="fa-solid fa-circle-check"></i> Unlimited Lathi Kathi weapon classes</li>
                <li><i class="fa-solid fa-circle-check"></i> Locker + VIP Sauna + recovery zone</li>
                <li><i class="fa-solid fa-circle-check"></i> Personal coach monthly nutrition reviews</li>
                <li><i class="fa-solid fa-circle-check"></i> All Seminar & Event VIP passes</li>
              </ul>
              <button 
                class="btn btn-yoddha-outline w-100" 
                onClick={() => onOpenModal('Yoddha Unlimited Plan', 'lathi')}
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
