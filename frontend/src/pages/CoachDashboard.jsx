import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoachDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Workout form state
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutDetails, setWorkoutDetails] = useState('');
  const [formMsg, setFormMsg] = useState('');

  // Access Control
  useEffect(() => {
    if (!user || user.role !== 'coach') {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);

      // Fetch all classes and filter for coach
      const classesRes = await fetch('/api/schedule');
      const classesData = await classesRes.json();
      // Match by discipline or coach name
      const coachClasses = classesData.filter(c => 
        c.discipline === user.discipline || c.coach.toLowerCase().includes(user.fullName.toLowerCase())
      );
      setClasses(coachClasses);

      // Fetch Workouts uploaded for this discipline
      const workoutsRes = await fetch(`/api/coach/workouts/${user.discipline}`);
      const workoutsData = await workoutsRes.json();
      setWorkouts(workoutsData);

      setLoading(false);
    } catch (err) {
      console.error('Error loading coach dashboard details:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'coach') {
      fetchData();
    }
  }, [user]);

  const handlePostWorkout = (e) => {
    e.preventDefault();
    setFormMsg('');

    const newWorkout = {
      discipline: user.discipline,
      title: workoutTitle,
      details: workoutDetails
    };

    fetch('/api/coach/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkout)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormMsg('Workout routine published to athletes!');
          setWorkoutTitle('');
          setWorkoutDetails('');
          fetchData(); // Reload workout logs
        } else {
          setFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setFormMsg('Network submission error.');
      });
  };

  if (!user || user.role !== 'coach') return null;

  // Format discipline tag nicely
  const disciplineTag = user.discipline === 'lathi' ? 'Lathi Kathi'
                      : user.discipline === 'mma' ? 'Mixed Martial Arts'
                      : user.discipline === 'wrestling' ? 'Wrestling'
                      : 'Strength & Conditioning';

  return (
    <section className="py-5 bg-darker">
      <div className="container px-4 mt-4">
        {/* Header Title */}
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-light pb-3">
          <div>
            <span className="section-tag">Trainer Panel</span>
            <h1 className="fw-900 text-uppercase h2">Coach<span>Dashboard</span></h1>
            <p className="text-secondary small mb-0">Logged in as: <strong>{user.fullName}</strong> | Specialty: <strong className="text-warning">{disciplineTag}</strong></p>
          </div>
          <button className="btn btn-sm btn-yoddha-outline px-3" onClick={fetchData}>
            <i className="fa-solid fa-arrows-rotate me-2"></i>Reload Console
          </button>
        </div>

        {loading ? (
          <div className="py-5 text-center text-secondary">
            <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
            <div>Loading trainer metrics...</div>
          </div>
        ) : (
          <div className="row g-5">
            {/* Left: Schedule details & Workout publisher form */}
            <div className="col-lg-5">
              {/* My Schedule Slots */}
              <div className="contact-info-box mb-4">
                <h3 className="h5 fw-bold text-uppercase mb-4"><i className="fa-solid fa-clipboard-list me-2 text-warning"></i>My Classes Today</h3>
                {classes.length === 0 ? (
                  <p className="text-secondary small">No classes scheduled for you today.</p>
                ) : (
                  classes.map(c => (
                    <div key={c.id} className="p-3 mb-2 rounded border border-light bg-black bg-opacity-50">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-white fw-bold">{c.className}</span>
                        <span className={`badge level-${c.level}`} style={{ fontSize: '0.65rem' }}>{c.level}</span>
                      </div>
                      <div className="text-secondary small mb-1">
                        <i className="fa-regular fa-clock me-2 text-warning"></i>Time: {c.time}
                      </div>
                      <div className="text-secondary small">
                        <i className="fa-solid fa-users me-2 text-warning"></i>Class Capacity: {c.spots} Athletes
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Publish Daily Routine */}
              <div className="contact-info-box border border-maroon">
                <h3 className="h5 fw-bold text-uppercase mb-4"><i className="fa-solid fa-feather-pointed me-2 text-warning"></i>Log Training Guidelines</h3>
                
                {formMsg && (
                  <div className="alert alert-info bg-dark border border-light p-2 small text-center mb-3">
                    {formMsg}
                  </div>
                )}

                <form className="form-yoddha" onSubmit={handlePostWorkout}>
                  <div className="mb-3">
                    <label>Workout Title / Focus</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Single-leg drills and takedown setups" 
                      value={workoutTitle} 
                      onChange={e => setWorkoutTitle(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label>Training Routine & Notes</label>
                    <textarea 
                      className="form-control" 
                      rows="6" 
                      placeholder="Enter warm-up details, main set, repetitions, and sparring notes..." 
                      value={workoutDetails} 
                      onChange={e => setWorkoutDetails(e.target.value)} 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-yoddha-primary w-100 py-2">Publish Routine</button>
                </form>
              </div>
            </div>

            {/* Right: Published workout timeline history */}
            <div className="col-lg-7">
              <div className="contact-info-box h-100">
                <h3 className="h5 fw-bold text-uppercase mb-4"><i className="fa-solid fa-clock-rotate-left me-2 text-warning"></i>Published Training Log</h3>
                
                {workouts.length === 0 ? (
                  <div className="py-5 text-center text-secondary small">
                    <i className="fa-solid fa-folder-open mb-3 fa-2x"></i>
                    <div>No training logs published for {disciplineTag} yet.</div>
                  </div>
                ) : (
                  <div className="workout-log-timeline">
                    {workouts.map(w => (
                      <div key={w.id} className="p-4 mb-3 rounded border border-light bg-black bg-opacity-30">
                        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-light pb-2">
                          <h4 className="h6 fw-bold text-white mb-0 text-uppercase">{w.title}</h4>
                          <span className="text-warning small fs-7">
                            <i className="fa-regular fa-calendar-check me-2"></i>
                            {new Date(w.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                          {w.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
