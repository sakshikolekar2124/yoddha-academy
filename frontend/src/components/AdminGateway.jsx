import React, { useState } from 'react';

export default function AdminGateway({ user, onLoginSuccess, children }) {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminErrorMsg, setAdminErrorMsg] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminErrorMsg('');

    fetch((window.API_BASE || '') + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: adminPassword })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => { throw new Error(errData.error || 'Authentication failed.') });
        }
        return res.json();
      })
      .then(data => {
        setAdminLoading(false);
        if (data.success && data.user.role === 'admin') {
          onLoginSuccess(data.user);
        } else {
          setAdminErrorMsg('Access Denied: Only School Administrator accounts are authorized for this panel.');
        }
      })
      .catch(err => {
        setAdminLoading(false);
        setAdminErrorMsg(err.message || 'Security Gateway Connection Failure.');
      });
  };

  if (!user || user.role !== 'admin') {
    return (
      <section className="py-section bg-darker d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
        <div className="container px-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="contact-info-box border border-maroon p-5 shadow-lg bg-black bg-opacity-50 text-center" style={{ boxShadow: '0 0 40px rgba(133, 14, 32, 0.45)' }}>
                
                {/* Secure Gateway Headers */}
                <div className="mb-4">
                  <div className="d-inline-block p-3 rounded-circle bg-maroon bg-opacity-10 mb-3 border border-maroon">
                    <i className="fa-solid fa-user-shield text-warning fa-3x"></i>
                  </div>
                  <h2 className="fw-900 text-uppercase h4 text-white letter-spacing-1">Founder Portal</h2>
                  <span className="text-secondary small text-uppercase font-monospace d-block mt-1">Onkar Hupare Secure Console</span>
                </div>

                {/* Gateway Error alert */}
                {adminErrorMsg && (
                  <div className="alert alert-danger bg-danger-subtle border border-danger-subtle text-danger p-2 small mb-3">
                    <i className="fa-solid fa-triangle-exclamation me-2"></i>{adminErrorMsg}
                  </div>
                )}

                {/* Gateway Login Form */}
                <form className="form-yoddha text-start" onSubmit={handleAdminLoginSubmit}>
                  <div className="mb-3">
                    <label>Founder Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="admin@admin.in" 
                      value={adminEmail}
                      onChange={e => setAdminEmail(e.target.value)}
                      required 
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-4">
                    <label>Secure Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="••••••••" 
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      required 
                      autoComplete="new-password"
                    />
                  </div>

                  <button type="submit" className="btn btn-yoddha-primary w-100 py-3 text-uppercase fw-bold text-white letter-spacing-1" disabled={adminLoading}>
                    {adminLoading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>Authorizing...
                      </>
                    ) : (
                      'Access Founder Console'
                    )}
                  </button>
                </form>

                {/* Secure Hints */}
                <div className="mt-4 p-3 bg-secondary bg-opacity-5 rounded border border-light text-start text-secondary small">
                  <div className="fw-bold mb-2 text-warning"><i className="fa-solid fa-key me-2"></i>Founder Account Hint:</div>
                  <div>
                    <strong>Founder Email</strong>: <code className="text-warning">admin@admin.in</code><br />
                    <strong>Password</strong>: <code className="text-warning">adminyoddha</code>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return children;
}
