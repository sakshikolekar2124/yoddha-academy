import React, { useEffect, useState } from 'react';

export default function Schedule({ onOpenModal }) {
  const [classes, setClasses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch((window.API_BASE || '') + '/api/schedule')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching schedule:', err);
        setLoading(false);
      });
  }, []);

  const filteredClasses = activeFilter === 'all' 
    ? classes 
    : classes.filter(c => c.discipline === activeFilter);

  return (
    <section id="schedule" class="py-section">
      <div class="container px-4">
        <div class="section-header text-center" data-aos="fade-up">
          <span class="section-tag">Arena Schedule</span>
          <h2 class="section-title">Weekly Training<span>Timetable</span></h2>
        </div>
        
        {/* Filter tabs */}
        <div class="schedule-filter-container" data-aos="fade-up">
          <button 
            className={`btn-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Show All
          </button>
          <button 
            className={`btn-filter-pill ${activeFilter === 'lathi' ? 'active' : ''}`}
            onClick={() => setActiveFilter('lathi')}
          >
            Lathi Kathi
          </button>
          <button 
            className={`btn-filter-pill ${activeFilter === 'mma' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mma')}
          >
            MMA
          </button>
          <button 
            className={`btn-filter-pill ${activeFilter === 'wrestling' ? 'active' : ''}`}
            onClick={() => setActiveFilter('wrestling')}
          >
            Wrestling
          </button>
          <button 
            className={`btn-filter-pill ${activeFilter === 'strength' ? 'active' : ''}`}
            onClick={() => setActiveFilter('strength')}
          >
            Strength & S&C
          </button>
        </div>
        
        {/* Timetable Grid */}
        <div class="schedule-table-wrapper" data-aos="fade-up" data-aos-delay="100">
          <div class="schedule-header-row">
            <div>Time Slot</div>
            <div>Discipline Class</div>
            <div>Coach / Instructor</div>
            <div>Difficulty Level</div>
            <div>Spots Left</div>
            <div>Action</div>
          </div>
          
          <div class="schedule-grid-body">
            {loading ? (
              <div className="p-4 text-center text-secondary">
                <i className="fa-solid fa-spinner fa-spin me-2"></i> Loading timetable slots...
              </div>
            ) : filteredClasses.length === 0 ? (
              <div className="p-4 text-center text-secondary">
                No classes scheduled for this discipline.
              </div>
            ) : (
              filteredClasses.map(c => (
                <div key={c.id} class="schedule-grid-item">
                  <div class="schedule-time">
                    <i class="fa-regular fa-clock me-2"></i>{c.time}
                  </div>
                  <div class="schedule-name">{c.className}</div>
                  <div class="schedule-coach">
                    <i class="fa-solid fa-user-ninja"></i>{c.coach}
                  </div>
                  <div>
                    <span className={`schedule-level level-${c.level}`}>
                      {c.level}
                    </span>
                  </div>
                  <div class="schedule-spots">{c.spots} Spots</div>
                  <div>
                    <button 
                      class="btn btn-sm btn-yoddha-primary px-3"
                      onClick={() => onOpenModal(c.className, c.discipline)}
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
