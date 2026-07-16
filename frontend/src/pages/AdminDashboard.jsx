import React from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../components/AdminGateway';

export default function AdminDashboard({ user, onLoginSuccess }) {
  const adminSections = [
    {
      title: 'Founder Profile',
      path: '/admin/profile',
      icon: 'fa-solid fa-user-gear',
      desc: 'Manage administrator credentials, institutions settings, and connection stats.',
      badge: 'Profile'
    },
    {
      title: 'New Student Registration',
      path: '/admin/new-student',
      icon: 'fa-solid fa-user-plus',
      desc: 'Enroll new athletes directly into the SQLite database and create access profiles.',
      badge: 'Registration'
    },
    {
      title: 'Students Database',
      path: '/admin/students',
      icon: 'fa-solid fa-users',
      desc: 'View comprehensive list of all registered student practitioners and details.',
      badge: 'Athletes List'
    },
    {
      title: 'Teacher Directory',
      path: '/admin/teachers',
      icon: 'fa-solid fa-chalkboard-user',
      desc: 'List active academy trainers, instructors, and their specializations.',
      badge: 'Coaches List'
    },
    {
      title: 'Gallery Manager',
      path: '/admin/gallery',
      icon: 'fa-solid fa-images',
      desc: 'Insert, update details, or delete general academy training photos.',
      badge: 'Media CRUD'
    },
    {
      title: 'Achievements Manager',
      path: '/admin/success',
      icon: 'fa-solid fa-trophy',
      desc: 'Manage student medalist photos, names, medal levels, and states.',
      badge: 'Student Success'
    },
    {
      title: 'News Manager',
      path: '/admin/news',
      icon: 'fa-solid fa-newspaper',
      desc: 'Manage news blogs, tournament dates, and academy announcements.',
      badge: 'Blogs CRUD'
    },
    {
      title: 'Reviews Moderator',
      path: '/admin/reviews',
      icon: 'fa-solid fa-comment-dots',
      desc: 'Access reviews table and delete incorrect or spam feedback secure logs.',
      badge: 'Reviews Delete'
    },
    {
      title: 'Trial Enquiry Database',
      path: '/admin/enquiry',
      icon: 'fa-solid fa-envelope-open-text',
      desc: 'Access and review free trial training pass requests submitted by visitors.',
      badge: 'Lead Enquiries'
    },
    {
      title: 'Courses Scheduler',
      path: '/admin/courses',
      icon: 'fa-solid fa-calendar-days',
      desc: 'Add, update or delete class time slots, difficulty levels, and coaches allocation.',
      badge: 'Timetable Slots'
    }
  ];

  return (
    <AdminGateway user={user} onLoginSuccess={onLoginSuccess}>
      <section className="py-5 bg-darker" style={{ minHeight: '85vh' }}>
        <div className="container px-4 mt-4 text-center">
          
          {/* Main Dashboard Header */}
          <div className="mb-5" data-aos="fade-down">
            <img src="/images/logo.jpg" alt="Yoddha Academy Logo" className="brand-logo-img mb-3" style={{ width: '80px', height: '80px' }} />
            <h1 className="fw-900 text-uppercase h3 text-white letter-spacing-1">Academy Console</h1>
            <p className="text-secondary small font-monospace">Founder Control Dashboard â€” Administrator Access Active</p>
          </div>

          {/* Cards Grid */}
          <div className="row g-4 justify-content-center" data-aos="fade-up">
            {adminSections.map((sec, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 col-sm-12">
                <div className="contact-info-box border border-maroon p-4 text-start h-100 d-flex flex-column justify-content-between transition shadow-sm hover-shadow-lg" style={{ minHeight: '250px' }}>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-inline-flex p-3 rounded bg-maroon bg-opacity-10 border border-maroon">
                        <i className={`${sec.icon} text-warning fa-xl`}></i>
                      </div>
                      <span className="badge bg-secondary text-uppercase font-monospace" style={{ fontSize: '0.65rem' }}>{sec.badge}</span>
                    </div>
                    
                    <h3 className="h6 fw-bold text-white text-uppercase mb-2">{sec.title}</h3>
                    <p className="text-secondary small mb-4" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>{sec.desc}</p>
                  </div>

                  <Link to={sec.path} className="btn btn-yoddha-primary w-100 py-2 text-uppercase fw-bold text-white small text-decoration-none text-center">
                    Manage Section <i className="fa-solid fa-circle-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </AdminGateway>
  );
}

