import React from 'react';

export default function Coaches() {
  const coachList = [
    {
      name: 'Vikram Singh',
      role: 'Lathi Kathi Master',
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop',
      bio: '20+ years of training in traditional Indian stick-fighting and weapon mastery. Preserving ancient heritage.'
    },
    {
      name: 'Rahul Sharma',
      role: 'Professional MMA Fighter',
      img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop',
      bio: 'Pro MMA fighter with an 8-2 record. Expert in Muay Thai, boxing, and submission cage strategy.'
    },
    {
      name: 'Priya Dev',
      role: 'Wrestling Champion',
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
      bio: 'National gold medalist in Freestyle Wrestling. Combines classic mat-grappling with modern tactical defense.'
    },
    {
      name: 'Amit Kadam',
      role: 'S&C Lead Trainer',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      bio: 'Certified sports nutritionist and CSCS strength specialist. Expert in functional power development.'
    }
  ];

  return (
    <section id="coaches" class="py-section bg-darker">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Elite Mentors</span>
          <h2 class="section-title">Meet Our Certified<span>Coaches</span></h2>
        </div>
        
        <div class="row g-4">
          {coachList.map((coach, idx) => (
            <div key={idx} class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
              <div class="coach-card">
                <div class="coach-img-wrapper">
                  <img src={coach.img} alt={coach.name} class="coach-img" />
                  <div class="coach-socials">
                    <a href="#" class="coach-social-link"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="coach-social-link"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#" class="coach-social-link"><i class="fa-solid fa-envelope"></i></a>
                  </div>
                </div>
                <div class="coach-card-info">
                  <span class="coach-specialty">{coach.role}</span>
                  <h4 class="coach-name">{coach.name}</h4>
                  <p class="coach-bio">{coach.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
