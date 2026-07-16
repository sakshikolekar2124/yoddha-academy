import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminSuccess({ user, onLoginSuccess }) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Achievements form state
  const [studentName, setStudentName] = useState('');
  const [medalLevel, setMedalLevel] = useState('Gold Medalist');
  const [achievementImg, setAchievementImg] = useState('');
  const [stateDetails, setStateDetails] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await fetch((window.API_BASE || '') + '/api/achievements');
      const data = await res.json();
      setAchievements(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAchievements();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('File is too large. Please select an image under 3MB.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAchievementImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    setFormMsg('');

    if (!achievementImg) {
      setFormMsg('Please choose an image file.');
      return;
    }

    const newMedalist = {
      studentName,
      medalLevel,
      img: achievementImg,
      state: stateDetails
    };

    const url = editingId ? `/api/admin/achievements/${editingId}` : (window.API_BASE || '') + '/api/admin/achievements';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedalist)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFormMsg(editingId ? 'Student achievement updated successfully!' : 'Student achievement added successfully!');
          setStudentName('');
          setAchievementImg('');
          setStateDetails('');
          setEditingId(null);
          const fileInput = document.getElementById('achievement-file-input');
          if (fileInput) fileInput.value = '';
          fetchAchievements();
        } else {
          setFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setFormMsg('Network error.');
      });
  };

  const handleDeleteAchievement = (id) => {
    if (window.confirm('Are you sure you want to delete this medalist card?')) {
      fetch(`${window.API_BASE || ''}/api/admin/achievements/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetchAchievements();
          } else {
            alert('Failed to delete medalist.');
          }
        })
        .catch(err => console.error(err));
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setStudentName(item.studentName);
    setMedalLevel(item.medalLevel);
    setAchievementImg(item.img);
    setStateDetails(item.state);
    setFormMsg('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setStudentName('');
    setMedalLevel('Gold Medalist');
    setAchievementImg('');
    setStateDetails('');
    setFormMsg('');
    const fileInput = document.getElementById('achievement-file-input');
    if (fileInput) fileInput.value = '';
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
            <span className="section-tag text-warning">Medalists Panel</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Achievements<span>Manager</span></h3>
            
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="p-4 rounded border border-light bg-black bg-opacity-35">
                  <h4 className="h6 fw-bold text-white text-uppercase mb-3">
                    {editingId ? 'Edit Medalist Card' : 'Add Medalist Card'}
                  </h4>
                  
                  {formMsg && (
                    <div className="alert alert-info bg-dark border border-light p-2 text-center small mb-3">
                      {formMsg}
                    </div>
                  )}

                  <form className="form-yoddha small" onSubmit={handleAddAchievement}>
                    <div className="mb-3">
                      <label>Student Name</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Sakshi Kolekar" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label>Medal Level</label>
                      <select className="form-select form-control form-control-sm" value={medalLevel} onChange={e => setMedalLevel(e.target.value)}>
                        <option value="Gold Medalist">Gold Medalist</option>
                        <option value="Silver Medalist">Silver Medalist</option>
                        <option value="Bronze Medalist">Bronze Medalist</option>
                        <option value="State Champion">State Champion</option>
                        <option value="National Champion">National Champion</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Choose Photo from device</label>
                      <input 
                        type="file" 
                        id="achievement-file-input"
                        accept="image/*" 
                        className="form-control form-control-sm text-secondary bg-black border-light" 
                        onChange={handleFileChange} 
                        required={!editingId} 
                      />
                      {achievementImg && (
                        <div className="mt-2 text-center">
                          <img src={achievementImg} alt="Preview" className="img-thumbnail rounded" style={{ maxHeight: '100px', border: '1px solid var(--accent-gold)' }} />
                          <div className="small text-muted mt-1">Image selected</div>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>State / Tournament</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Maharashtra State Championship" value={stateDetails} onChange={e => setStateDetails(e.target.value)} required />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-yoddha-primary flex-grow-1 py-2">
                        {editingId ? 'Update Card' : 'Add Medalist Card'}
                      </button>
                      {editingId && (
                        <button type="button" className="btn btn-sm btn-secondary py-2" onClick={cancelEdit}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <h4 className="h6 fw-bold text-white text-uppercase mb-3">Existing Medalists ({achievements.length})</h4>
                
                {loading ? (
                  <div className="py-5 text-center text-secondary">
                    <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                    <div>Retrieving achievements...</div>
                  </div>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                      <thead className="table-active text-white text-uppercase">
                        <tr>
                          <th>Preview</th>
                          <th>Student Name</th>
                          <th>Medal Level</th>
                          <th>State / Tournament</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {achievements.map(a => (
                          <tr key={a.id}>
                            <td>
                              <img src={a.img} alt={a.studentName} className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid var(--border-light)' }} />
                            </td>
                            <td className="text-white fw-bold">{a.studentName}</td>
                            <td>
                              <span className={`badge ${a.medalLevel.includes('Gold') || a.medalLevel.includes('National') ? 'bg-warning text-dark' : 'bg-secondary text-white'} text-uppercase`} style={{ fontSize: '0.65rem', padding: '0.35rem 0.6rem' }}>
                                {a.medalLevel}
                              </span>
                            </td>
                            <td>{a.state}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-outline-warning border-0" onClick={() => startEdit(a)} title="Edit Achievement">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteAchievement(a.id)} title="Delete Achievement">
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
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
