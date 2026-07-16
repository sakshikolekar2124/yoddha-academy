import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [loginTab, setLoginTab] = useState('school'); // 'school' (admin) or 'teacher' (coach)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const requestBody = { email, password };

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => { throw new Error(errData.error || 'Login failed.') });
        }
        return res.json();
      })
      .then(data => {
        setLoading(false);
        if (data.success) {
          // Strict Role Validation based on Tab Selected
          if (loginTab === 'school' && data.user.role !== 'admin') {
            throw new Error('Access Denied: Please use School credentials on this tab.');
          }
          if (loginTab === 'teacher' && data.user.role !== 'coach') {
            throw new Error('Access Denied: Please use Teacher credentials on this tab.');
          }

          onLoginSuccess(data.user);
          
          // Redirect based on role
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else if (data.user.role === 'coach') {
            navigate('/coach');
          } else {
            navigate('/');
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setErrorMsg(err.message || 'Connection error. Please check your credentials.');
      });
  };

  return (
    <section className="py-section bg-darker">
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 mt-4">
            <div className="contact-info-box border border-light p-4 shadow-lg bg-black bg-opacity-40" data-aos="fade-up">
              
              {/* Tab Selectors */}
              <div className="d-flex border-bottom border-light mb-4 pb-1">
                <button 
                  className={`btn flex-grow-1 py-3 text-uppercase fw-bold border-0 transition small font-monospace ${
                    loginTab === 'school' 
                      ? 'btn-yoddha-primary text-white' 
                      : 'text-secondary bg-transparent'
                  }`}
                  onClick={() => { setLoginTab('school'); setErrorMsg(''); setEmail(''); setPassword(''); }}
                >
                  <i className="fa-solid fa-school me-2"></i>School Login
                </button>
                <button 
                  className={`btn flex-grow-1 py-3 text-uppercase fw-bold border-0 transition small font-monospace ${
                    loginTab === 'teacher' 
                      ? 'btn-yoddha-primary text-white' 
                      : 'text-secondary bg-transparent'
                  }`}
                  onClick={() => { setLoginTab('teacher'); setErrorMsg(''); setEmail(''); setPassword(''); }}
                >
                  <i className="fa-solid fa-chalkboard-user me-2"></i>Teacher Login
                </button>
              </div>

              {/* Header Title */}
              <div className="text-center mb-4">
                <img src="/images/logo.jpg" alt="Yoddha Academy Logo" className="brand-logo-img mb-3" style={{ width: '60px', height: '60px' }} />
                <h2 className="fw-900 text-uppercase h3">
                  {loginTab === 'school' ? 'School' : 'Teacher'}<span>Login</span>
                </h2>
                <p className="text-secondary small">
                  {loginTab === 'school' 
                    ? 'Enter administrator credentials to manage Yoddha Academy' 
                    : 'Enter instructor credentials to log workouts and batches'}
                </p>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="alert alert-danger bg-danger-subtle border border-danger-subtle text-danger p-2 small text-center mb-3">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i>{errorMsg}
                </div>
              )}

              {/* Form Input fields */}
              <form className="form-yoddha" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder={loginTab === 'school' ? 'admin@admin.in' : 'teacher@yoddha.in'} 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required 
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <label>Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required 
                    autoComplete="new-password"
                  />
                </div>

                <button type="submit" className="btn btn-yoddha-primary w-100 py-3 mt-1 text-uppercase fw-bold text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>Verifying...
                    </>
                  ) : (
                    `Log In As ${loginTab === 'school' ? 'School' : 'Teacher'}`
                  )}
                </button>
              </form>

              {/* Testing Credentials Helper */}
              <div className="mt-4 p-3 bg-secondary bg-opacity-10 rounded border border-light text-secondary small">
                <div className="fw-bold mb-2 text-warning"><i className="fa-solid fa-lightbulb me-2"></i>Testing Account Hint:</div>
                {loginTab === 'school' ? (
                  <div>
                    <strong>Email</strong>: <code className="text-warning">admin@admin.in</code><br />
                    <strong>Password</strong>: <code className="text-warning">adminyoddha</code>
                  </div>
                ) : (
                  <div>
                    <strong>Email</strong>: <code className="text-warning">teacher@yoddha.in</code><br />
                    <strong>Password</strong>: <code className="text-warning">teacheryoddha</code>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
