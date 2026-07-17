import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ onOpenModal }) {
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [viewedCount, setViewedCount] = useState(0);
  const [mutedStates, setMutedStates] = useState({ 0: true, 1: true, 2: true, 3: true });
  const containerRef = useRef(null);

  const toggleMute = (idx, e) => {
    e.stopPropagation();
    setMutedStates(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const apiBase = window.API_BASE || '';
  const reelsList = [
    {
      id: 0,
      embedId: 'DRcHOmTkbkg',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-wushu-stick-40294-large.mp4',
      thumbnail: `${apiBase}/api/reels/thumbnail/DRcHOmTkbkg`,
      title: 'Traditional Lathi flow speed drills',
      likes: '1.2K',
      comments: '84'
    },
    {
      id: 1,
      embedId: 'DRW57SnDKvZ',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-wushu-stick-40295-large.mp4',
      thumbnail: `${apiBase}/api/reels/thumbnail/DRW57SnDKvZ`,
      title: 'Double stick deflection training',
      likes: '2.5K',
      comments: '120'
    },
    {
      id: 2,
      embedId: 'DOm50hdjLdN',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-shadow-boxing-in-a-dark-gym-40078-large.mp4',
      thumbnail: `${apiBase}/api/reels/thumbnail/DOm50hdjLdN`,
      title: 'Conditioning & footwork base routine',
      likes: '920',
      comments: '42'
    },
    {
      id: 3,
      embedId: 'DHCsJROCRyu',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-doing-martial-arts-moves-40291-large.mp4',
      thumbnail: `${apiBase}/api/reels/thumbnail/DHCsJROCRyu`,
      title: 'Female stick fighter form demonstration',
      likes: '3.1K',
      comments: '168'
    }
  ];

  // Align container scroll position with state on modal open
  useEffect(() => {
    if (activeReelIndex !== null && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          const container = containerRef.current;
          const containerHeight = container.clientHeight || 700;
          container.scrollTop = activeReelIndex * containerHeight;
        }
      }, 50);
    }
  }, [activeReelIndex]);

  const openReel = (index) => {
    setActiveReelIndex(index);
    setViewedCount(index >= 2 ? 3 : 1);
  };

  const scrollContainerTo = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerHeight = container.clientHeight || 700;
      container.scrollTo({
        top: index * containerHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const containerHeight = container.clientHeight;
    if (containerHeight > 0) {
      const newIndex = Math.round(container.scrollTop / containerHeight);
      if (newIndex !== activeReelIndex && newIndex >= 0 && newIndex < reelsList.length) {
        setActiveReelIndex(newIndex);
        if (newIndex >= 2) {
          setViewedCount(3); // Trigger paywall overlay!
        } else {
          setViewedCount(prev => Math.max(prev, newIndex + 1));
        }
      }
    }
  };

  const handleNextReel = () => {
    if (viewedCount >= 2) {
      setViewedCount(3);
    } else {
      const nextIndex = (activeReelIndex + 1) % reelsList.length;
      setActiveReelIndex(nextIndex);
      setViewedCount(prev => prev + 1);
      scrollContainerTo(nextIndex);
    }
  };

  const handlePrevReel = () => {
    const prevIndex = (activeReelIndex - 1 + reelsList.length) % reelsList.length;
    setActiveReelIndex(prevIndex);
    scrollContainerTo(prevIndex);
  };

  const closeReelModal = () => {
    setActiveReelIndex(null);
    setViewedCount(0);
  };

  return (
    <>
      {/* Hero section */}
      <header id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container px-4">
          <div className="hero-content" data-aos="fade-right" data-aos-duration="1200">
            <div className="hero-subtitle">
              <i className="fa-solid fa-star me-2"></i> Forging Discipline & Traditional Grit
            </div>
            <h1 className="hero-title">
              Unleash the Warrior<span>Within You</span>
            </h1>
            <p className="hero-para">
              Yoddha Training Academy in Kolhapur offers championship training. Discover the traditional martial art of Lathi Kathi, developing core strength, speed, and mental agility.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-yoddha-primary" onClick={() => onOpenModal('General Trial')}>
                Join the Academy
              </button>
              <Link to="/gallery" className="btn btn-yoddha-outline">
                View Academy Gallery
              </Link>
            </div>
            
            {/* Floating metrics */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-val">800+</span>
                <span className="metric-label">Active Athletes</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">12+</span>
                <span className="metric-label">Elite Coaches</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">15+</span>
                <span className="metric-label">National Medals</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome intro summary */}
      <section className="py-section">
        <div className="container px-4">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-header mb-4">
                <span className="section-tag">Welcome to Yoddha Academy</span>
                <h2 className="section-title">Forge Your Path to<span>Championship Glory</span></h2>
              </div>
              <p className="text-secondary fs-5 mb-4">
                Established in Kolhapur, Yoddha Training Academy is the region's premier training center, dedicated to preserving and teaching the traditional combat heritage of Lathi Kathi.
              </p>
              <p className="text-secondary mb-4">
                Our curriculum is designed to take you from single-stick rotational foundations to full-contact tournament sparring. We provide elite training programs tailored for all age groups and experience levels under expert supervision.
              </p>
              <Link to="/about" className="btn btn-yoddha-outline">
                Learn About Us
              </Link>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center" data-aos="fade-left">
              <div className="position-relative d-inline-block">
                <img 
                  src="/images/founder.jpg" 
                  alt="Yoddha Academy Founder" 
                  className="img-fluid rounded border border-light shadow-lg"
                  style={{ maxHeight: '450px', width: 'auto', objectFit: 'contain' }}
                />
                <div className="mt-3 text-uppercase text-warning fw-bold small" style={{ letterSpacing: '2px' }}>
                  Yoddha Academy Founder - Onkar Hupare
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section className="py-section bg-darker border-top border-bottom border-light">
        <div className="container px-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-tag"><i className="fa-brands fa-instagram me-2 text-danger"></i>Instagram Showcase</span>
            <h2 className="section-title">Yoddha Academy<span>Reels</span></h2>
            <p className="text-secondary max-width-600 mx-auto">
              Follow our daily training flows, stick speed drills, and combat conditioning highlights straight from our Instagram arena. Click any reel to watch!
            </p>
          </div>

          <div className="row g-4 justify-content-center reels-showcase-row">
            {reelsList.map((reel, idx) => (
              <div key={reel.id} className="col-lg-3 col-md-6 col-sm-12" data-aos="zoom-in" data-aos-delay={reel.id * 100}>
                <div 
                  className="yoddha-reel-card position-relative shadow-lg rounded overflow-hidden cursor-pointer" 
                  style={{ minHeight: '420px', height: '420px' }}
                  onClick={() => openReel(idx)}
                >
                  {/* Autoplay HTML5 Video Player */}
                  <video 
                    src={reel.videoUrl} 
                    className="w-100 h-100 position-absolute top-0 start-0"
                    style={{ objectFit: 'cover', minHeight: '420px', zIndex: 1 }}
                    loop
                    muted={mutedStates[idx] !== false}
                    playsInline
                    autoPlay
                  />

                  {/* Speaker Mute/Unmute Toggle Button */}
                  <button 
                    className="reel-volume-btn"
                    onClick={(e) => toggleMute(idx, e)}
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      zIndex: 10,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <i className={mutedStates[idx] !== false ? "fa-solid fa-volume-xmark text-secondary" : "fa-solid fa-volume-high text-warning"}></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* More button */}
          <div className="text-center mt-5" data-aos="fade-up">
            <a 
              href="https://www.instagram.com/yoddhaacademy.india?igsh=MWx4ODA2cmNocnJ6MA==" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-yoddha-primary px-5 py-3 text-uppercase fw-bold letter-spacing-1 d-inline-flex align-items-center gap-2"
            >
              <i className="fa-brands fa-instagram fa-lg"></i>
              More Reels on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Custom snap scroll Reels Modal */}
      {activeReelIndex !== null && (
        <div className="reels-modal-backdrop" onClick={closeReelModal}>
          <button className="reels-modal-close" onClick={closeReelModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Navigation Arrows for desktop */}
          {viewedCount < 3 && (
            <>
              <button className="reels-nav-btn prev d-none d-md-flex" onClick={(e) => { e.stopPropagation(); handlePrevReel(); }}>
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <button className="reels-nav-btn next d-none d-md-flex" onClick={(e) => { e.stopPropagation(); handleNextReel(); }}>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </>
          )}

          <div className="reels-modal-content animate-zoom-in" onClick={(e) => e.stopPropagation()}>
            
            {/* Scroll snapping container wrapper */}
            <div 
              ref={containerRef}
              className="reels-scroll-container h-100 w-100"
              onScroll={handleScroll}
              style={{
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                position: 'relative'
              }}
            >
              {reelsList.map((reel, idx) => (
                <div 
                  key={reel.id} 
                  className="w-100 h-100 position-relative" 
                  style={{ 
                    scrollSnapAlign: 'start',
                    minHeight: '100%'
                  }}
                >
                  {idx >= 2 && viewedCount >= 3 ? (
                    /* Paywall / Follow screen block */
                    <div className="reels-paywall-overlay position-absolute top-0 start-0 w-100 h-100">
                      <i className="fa-brands fa-instagram paywall-icon"></i>
                      <h3 className="h4 fw-bold text-white text-uppercase mb-3">View Instagram Page</h3>
                      <p className="text-secondary small mb-4 px-2">
                        Follow Yoddha Academy on Instagram to see more reels, combat training videos, and live highlights!
                      </p>
                      <a 
                        href={`https://www.instagram.com/reel/${reelsList[idx].embedId}/`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-yoddha-primary w-100 py-3 text-uppercase fw-bold mb-3 text-decoration-none letter-spacing-1"
                      >
                        Watch on Instagram
                      </a>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary w-100 py-2 small text-uppercase fw-bold" 
                        onClick={closeReelModal}
                      >
                        Close Viewer
                      </button>
                    </div>
                  ) : (
                    /* Playable official Instagram Embed Frame */
                    <iframe 
                      src={`https://www.instagram.com/reel/${reel.embedId}/embed/`}
                      className="w-100 h-100" 
                      style={{ border: 'none', background: '#000', display: 'block' }}
                      scrolling="no" 
                      allowTransparency="true" 
                      allow="encrypted-media"
                    />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
