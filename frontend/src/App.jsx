import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrialModal from './components/TrialModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Success from './pages/Success';
import News from './pages/News';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CoachDashboard from './pages/CoachDashboard';
import Reviews from './pages/Reviews';

// Admin Sub-pages
import AdminProfile from './pages/admin/AdminProfile';
import AdminNewStudent from './pages/admin/AdminNewStudent';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminGallery from './pages/admin/AdminGallery';
import AdminEnquiry from './pages/admin/AdminEnquiry';
import AdminCourses from './pages/admin/AdminCourses';
import AdminNews from './pages/admin/AdminNews';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSuccess from './pages/admin/AdminSuccess';
import './App.css';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Re-initialize Animate-On-Scroll (AOS) when route shifts
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, [pathname]);
  return null;
}

function App() {
  const [trialDiscipline, setTrialDiscipline] = useState('');
  const [trialClass, setTrialClass] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [user, setUser] = useState(null);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('yoddha_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Error loading saved user session:', err);
        localStorage.removeItem('yoddha_user');
      }
    }

    // Initialize Animate-On-Scroll if loaded from CDN
    if (window.AOS) {
      window.AOS.init({
        offset: 80,
        duration: 900,
        easing: 'ease-in-out',
        once: true
      });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('yoddha_user', JSON.stringify(userData));
    handleTrialSuccess(`Logged in successfully as ${userData.fullName}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yoddha_user');
    handleTrialSuccess('Logged out successfully.');
  };

  const openTrialModal = (className = '', disciplineVal = '') => {
    setTrialClass(className);
    setTrialDiscipline(disciplineVal);
    
    // Open modal using Bootstrap JS API
    const modalEl = document.getElementById('freeTrialModal');
    if (window.bootstrap) {
      const bsModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    }
  };

  const handleTrialSuccess = (msg) => {
    setToastMessage(msg);
    
    // Show Toast Notification
    const toastEl = document.getElementById('yoddhaToast');
    if (window.bootstrap) {
      const bsToast = window.bootstrap.Toast.getOrCreateInstance(toastEl);
      bsToast.show();
    }
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* Navigation */}
      <Navbar onOpenModal={openTrialModal} user={user} onLogout={handleLogout} />

      {/* Routed Pages */}
      <Routes>
        <Route path="/" element={<Home onOpenModal={openTrialModal} />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/success" element={<Success />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<ContactPage onSuccess={handleTrialSuccess} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin" element={<AdminDashboard user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/profile" element={<AdminProfile user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/new-student" element={<AdminNewStudent user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/students" element={<AdminStudents user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/teachers" element={<AdminTeachers user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/gallery" element={<AdminGallery user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/success" element={<AdminSuccess user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/enquiry" element={<AdminEnquiry user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/courses" element={<AdminCourses user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/news" element={<AdminNews user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/admin/reviews" element={<AdminReviews user={user} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/coach" element={<CoachDashboard user={user} />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Trial Registration Modal */}
      <TrialModal 
        defaultClass={trialClass} 
        defaultDiscipline={trialDiscipline} 
        onSuccess={handleTrialSuccess} 
      />

      {/* Toast Notification Alert */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
        <div id="yoddhaToast" className="toast toast-yoddha hide" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000">
          <div className="toast-header bg-transparent border-0 text-white d-flex justify-content-between p-2">
            <strong className="me-auto text-uppercase text-warning fw-bold">
              <i className="fa-solid fa-shield-halved me-2"></i>Academy Arena Notification
            </strong>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body text-white p-3 pt-0">
            {toastMessage}
          </div>
        </div>
      </div>

      {/* Floating Call & WhatsApp Buttons */}
      <a href="tel:+917766885311" className="floating-widget floating-call-btn" title="Call Us Directly">
        <i className="fa-solid fa-phone"></i>
      </a>

      <a href="https://wa.me/917766885311" className="floating-widget floating-whatsapp-btn" title="Chat on WhatsApp" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </Router>
  );
}

export default App;
