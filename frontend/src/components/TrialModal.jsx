import React, { useEffect, useState } from 'react';

export default function TrialModal({ defaultDiscipline, defaultClass, onSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [experience, setExperience] = useState('beginner');

  // Autofill fields when parent changes defaults
  useEffect(() => {
    if (defaultDiscipline) {
      setDiscipline(defaultDiscipline);
    }
  }, [defaultDiscipline]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        if (data.success) {
          // Close modal using Bootstrap API
          const modalEl = document.getElementById('freeTrialModal');
          if (window.bootstrap) {
            const bsModal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
            bsModal.hide();
          }

          // Reset Form
          setFullName('');
          setEmail('');
          setPhone('');
          setExperience('beginner');

          // Trigger Success Callback
          const selectedText = discipline === 'lathi_basics' ? 'Lathi Kathi Basics' 
                              : discipline === 'lathi_combat' ? 'Stick Sparring & Combat' 
                              : 'Advanced Stick Form';

          onSuccess(`Welcome to YODDHA Academy, ${fullName}! Your free 1-day pass for ${selectedText} is activated. Check email: ${email} for details.`);
        } else {
          alert('Submission error: ' + (data.error || 'Failed to request trial.'));
        }
      })
      .catch(err => {
        console.error('API submission failed:', err);
        alert('Network connection error. Failed to reach the server.');
      });
  };

  return (
    <div class="modal fade" id="freeTrialModal" tabIndex="-1" aria-labelledby="freeTrialModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-content-yoddha">
          <div class="modal-header modal-header-yoddha">
            <h5 class="modal-title fw-bold text-uppercase" id="freeTrialModalLabel">
              {defaultClass ? `Book: ${defaultClass}` : 'Claim 1-Day Trial Pass'}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-body-yoddha">
            <form class="form-yoddha" onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="trialName">Athlete Full Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="trialName" 
                  placeholder="e.g. Rahul Dev" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required 
                />
              </div>
              
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label htmlFor="trialEmail">Email Address</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="trialEmail" 
                    placeholder="e.g. athlete@gmail.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div class="col-md-6">
                  <label htmlFor="trialPhone">Phone Contact</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="trialPhone" 
                    placeholder="e.g. 9876543210" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label htmlFor="trialDiscipline">Primary Lathi Course</label>
                  <select 
                    class="form-select form-control" 
                    id="trialDiscipline" 
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
                <div class="col-md-6">
                  <label htmlFor="trialLevel">Current Experience</label>
                  <select 
                    class="form-select form-control" 
                    id="trialLevel"
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
              
              <button type="submit" class="btn btn-yoddha-primary w-100 py-2">
                Submit Trial Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
