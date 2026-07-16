import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminNewStudent({ user, onLoginSuccess }) {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentFormMsg, setStudentFormMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateStudent = (e) => {
    e.preventDefault();
    setStudentFormMsg('');
    setLoading(true);

    const newStudent = {
      fullName: studentName,
      email: studentEmail,
      password: studentPassword
    };

    fetch('/api/admin/student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setStudentFormMsg('Student registered successfully!');
          setStudentName('');
          setStudentEmail('');
          setStudentPassword('');
        } else {
          setStudentFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
        setStudentFormMsg('Network error.');
      });
  };

  return (
    <AdminGateway user={user} onLoginSuccess={onLoginSuccess}>
      <section className="py-5 bg-darker" style={{ minHeight: '85vh' }}>
        <div className="container px-4 mt-4" style={{ maxWidth: '600px' }}>
          
          {/* Back Navigation */}
          <div className="mb-4">
            <Link to="/admin" className="btn btn-yoddha-outline px-4 text-uppercase fw-bold text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Admin Portal
            </Link>
          </div>

          <div className="contact-info-box p-5 border border-maroon">
            <span className="section-tag text-warning">Enrollment Manager</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Register<span>New Student</span></h3>
            
            {studentFormMsg && (
              <div className="alert alert-info bg-dark border border-light p-2 small text-center mb-3">
                {studentFormMsg}
              </div>
            )}

            <form className="form-yoddha mt-3" onSubmit={handleCreateStudent}>
              <div className="mb-3">
                <label>Student Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Rahul Patil" 
                  value={studentName} 
                  onChange={e => setStudentName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="e.g. student@yoddha.in" 
                  value={studentEmail} 
                  onChange={e => setStudentEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label>Access Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Create password" 
                  value={studentPassword} 
                  onChange={e => setStudentPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-yoddha-primary px-4 py-2" disabled={loading}>
                {loading ? 'Registering...' : 'Create Student Profile'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminGateway>
  );
}
