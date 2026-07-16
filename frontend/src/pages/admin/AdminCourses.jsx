import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminCourses({ user, onLoginSuccess }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Course form state
  const [classTime, setClassTime] = useState('');
  const [className, setClassName] = useState('');
  const [classCoach, setClassCoach] = useState('');
  const [classLevel, setClassLevel] = useState('beginner');
  const [classSpots, setClassSpots] = useState(10);
  const [classDiscipline, setClassDiscipline] = useState('lathi_basics');
  const [classFormMsg, setClassFormMsg] = useState('');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/schedule');
      const data = await res.json();
      setClasses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchClasses();
    }
  }, [user]);

  const handleAddClass = (e) => {
    e.preventDefault();
    setClassFormMsg('');

    const newClass = {
      time: classTime,
      className,
      coach: classCoach,
      level: classLevel,
      spots: parseInt(classSpots),
      discipline: classDiscipline
    };

    fetch('/api/admin/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClass)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setClassFormMsg('Class created successfully!');
          setClassTime('');
          setClassName('');
          setClassCoach('');
          setClassSpots(10);
          fetchClasses();
        } else {
          setClassFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setClassFormMsg('Network error.');
      });
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to remove this class slot?')) {
      fetch(`/api/admin/schedule/${classId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetchClasses();
          } else {
            alert('Failed to delete class.');
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <AdminGateway user={user} onLoginSuccess={onLoginSuccess}>
      <section className="py-5 bg-darker" style={{ minHeight: '85vh' }}>
        <div className="container px-4 mt-4">
          
          {/* Back Navigation */}
          <div className="mb-4">
            <Link to="/admin" className="btn btn-yoddha-outline px-4 text-uppercase fw-bold text-decoration-none">
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Admin Portal
            </Link>
          </div>

          <div className="contact-info-box p-5 border border-maroon">
            <span className="section-tag text-warning">Schedule Scheduler</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Lathi Course<span>Scheduler</span></h3>
            
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="p-4 rounded border border-light bg-black bg-opacity-30">
                  <h4 className="h6 fw-bold text-white text-uppercase mb-3">Add Time Slot</h4>
                  
                  {classFormMsg && (
                    <div className="alert alert-info bg-dark border border-light p-2 small text-center mb-3">
                      {classFormMsg}
                    </div>
                  )}

                  <form className="form-yoddha small" onSubmit={handleAddClass}>
                    <div className="mb-3">
                      <label>Course Name</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Traditional Form Flow" value={className} onChange={e => setClassName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label>Course Tag</label>
                      <select className="form-select form-control form-control-sm" value={classDiscipline} onChange={e => setClassDiscipline(e.target.value)}>
                        <option value="lathi_basics">Lathi Kathi Basics</option>
                        <option value="lathi_combat">Stick Sparring & Combat</option>
                        <option value="lathi_advanced">Advanced Stick Form</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Instructor Name</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Coach Vikram" value={classCoach} onChange={e => setClassCoach(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label>Difficulty Level</label>
                      <select className="form-select form-control form-control-sm" value={classLevel} onChange={e => setClassLevel(e.target.value)}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Time Schedule</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. 06:00 AM - 07:30 AM" value={classTime} onChange={e => setClassTime(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label>Max Cap</label>
                      <input type="number" className="form-control form-control-sm" min="1" max="50" value={classSpots} onChange={e => setClassSpots(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-sm btn-yoddha-primary w-100 py-2">Create Time Slot</button>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <h4 className="h6 fw-bold text-white text-uppercase mb-3">Timetable Slots ({classes.length})</h4>
                
                {loading ? (
                  <div className="py-5 text-center text-secondary">
                    <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                    <div>Retrieving schedules...</div>
                  </div>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                      <thead className="table-active text-white text-uppercase">
                        <tr>
                          <th>Class Name</th>
                          <th>Coach</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classes.map(c => (
                          <tr key={c.id}>
                            <td>
                              <div className="text-white fw-bold">{c.className}</div>
                              <span className="badge bg-secondary text-uppercase" style={{ fontSize: '0.6rem' }}>{c.discipline}</span>
                            </td>
                            <td>{c.coach}</td>
                            <td>{c.time}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteClass(c.id)}>
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminGateway>
  );
}
