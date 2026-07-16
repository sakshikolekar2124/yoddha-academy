import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Karan Singh',
      role: 'Lathi Kathi Student (1 Year)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      text: "Training Lathi Kathi here has been a transformative experience. Coach Vikram's deep respect for heritage combined with intense physical conditioning has drastically improved my coordination and stamina. Truly a unique academy!"
    },
    {
      name: 'Neha Patil',
      role: 'Active Amateur MMA Competitor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      text: "The MMA class structure is unmatched. The training transitions smoothly from stand-up boxing to wrestling takedowns on the mat. The coaches are highly attentive and focus heavily on safety and clean technique."
    },
    {
      name: 'Arjun Mehta',
      role: 'Freestyle Wrestler',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      text: "Strength and conditioning here is customized for sports performance. I have noticed huge improvements in my core power and explosive endurance, which directly translated to my wrestling sparring. Highly recommend!"
    }
  ];

  return (
    <section class="py-section bg-darker">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Success Stories</span>
          <h2 class="section-title">What Our Athletes<span>Say</span></h2>
        </div>
        
        {/* Bootstrap Carousel */}
        <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel" data-aos="fade-up" data-aos-delay="100">
          <div class="carousel-indicators carousel-indicators-custom">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                type="button" 
                data-bs-target="#testimonialCarousel" 
                data-bs-slide-to={idx} 
                className={idx === 0 ? 'active' : ''}
                aria-current={idx === 0 ? 'true' : 'false'}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
          
          <div class="carousel-inner pb-5">
            {reviews.map((review, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`} data-bs-interval="6000">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <div class="testimonial-card">
                      <div class="quote-icon"><i class="fa-solid fa-quote-right"></i></div>
                      <div class="testimonial-rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </div>
                      <p class="testimonial-text">"{review.text}"</p>
                      <div class="testimonial-author">
                        <img src={review.avatar} alt={review.name} class="author-avatar" />
                        <div>
                          <h5 class="author-name">{review.name}</h5>
                          <span class="author-role">{review.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
