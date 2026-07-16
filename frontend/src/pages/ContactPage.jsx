import React, { useState } from 'react';
import Contact from '../components/Contact';

export default function ContactPage({ onSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      fullName,
      email,
      phone,
      discipline,
      experience
    };

    fetch((window.API_BASE || '') + '/api/submit-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          // Reset fields
          setFullName('');
          setEmail('');
          setPhone('');
          setDiscipline('');
          setExperience('beginner');

          const selectedText = discipline === 'lathi_basics' ? 'Lathi Kathi Basics' 
                              : discipline === 'lathi_combat' ? 'Stick Sparring & Combat' 
                              : 'Advanced Stick Form';

          onSuccess(`Welcome to YODDHA Academy, ${fullName}! Your free 1-day pass for ${selectedText} is activated. Check email: ${email} for details.`);
        } else {
          alert('Submission error: ' + (data.error || 'Failed to request trial.'));
        }
      })
      .catch(err => {
        setLoading(false);
        console.error('API submission failed:', err);
        alert('Network connection error. Failed to reach the server.');
      });
  };

  return (
    <>
      {/* Page Title Header */}
      <section className="py-5 bg-darker border-bottom border-light">
        <div className="container px-4 text-center mt-4">
          <span className="section-tag">Find Us</span>
          <h1 className="fw-900 text-uppercase mb-2">Contact<span>Us</span></h1>
          <p className="text-secondary max-width-600 mx-auto">
            Get in touch, locate our physical arena in Ichalkaranji, or book a free trial training pass.
          </p>
        </div>
      </section>

      {/* Main contacts and map layout components */}
      <Contact />

      {/* Inline Free Trial Form Section */}
      <section className="py-section bg-darker border-top border-light">
        <div className="container px-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-info-box" data-aos="fade-up">
                <div className="section-header text-center mb-4">
                  <span className="section-tag text-warning">Get a Free pass</span>
                  <h3 className="h4 fw-bold text-uppercase">Claim 1-Day Trial Pass</h3>
                  <p className="text-secondary small">Fill out the registration details below to start your training session next week.</p>
                </div>
                
                <form className="form-yoddha mt-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="trialPageName">Athlete Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="trialPageName" 
                      placeholder="e.g. Rahul Dev" 
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="trialPageEmail">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="trialPageEmail" 
                        placeholder="e.g. athlete@gmail.com" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="trialPagePhone">Phone Contact</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        id="trialPagePhone" 
                        placeholder="e.g. 9876543210" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="trialPageDiscipline">Primary Lathi Course</label>
                      <select 
                        className="form-select form-control" 
                        id="trialPageDiscipline" 
                        value={discipline}
                        onChange={e => setDiscipline(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select Course</option>
                        <option value="lathi_basics">Lathi Kathi Basics</option>
                        <option value="lathi_combat">Stick Sparring & Combat</option>
                        <option value="lathi_advanced">Advanced Stick Form</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="trialPageLevel">Current Experience</label>
                      <select 
                        className="form-select form-control" 
                        id="trialPageLevel"
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                        required
                      >
                        <option value="beginner">Beginner (No experience)</option>
                        <option value="intermediate">Intermediate (Some training)</option>
                        <option value="advanced">Advanced / Competitor</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-yoddha-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2" disabled={loading}>
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i> Processing...
                      </>
                    ) : (
                      'Request Pass Now'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
