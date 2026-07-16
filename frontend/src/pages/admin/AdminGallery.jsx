import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminGallery({ user, onLoginSuccess }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery form state
  const [galleryImg, setGalleryImg] = useState('');
  const [galleryFormMsg, setGalleryFormMsg] = useState('');
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch((window.API_BASE || '') + '/api/gallery');
      const data = await res.json();
      setGallery(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchGallery();
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
        setGalleryImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    setGalleryFormMsg('');

    if (!galleryImg) {
      setGalleryFormMsg('Please choose an image file.');
      return;
    }

    const newPhoto = {
      title: '',
      img: galleryImg,
      description: ''
    };

    const url = editingGalleryId ? `/api/gallery/${editingGalleryId}` : (window.API_BASE || '') + '/api/gallery';
    const method = editingGalleryId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPhoto)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGalleryFormMsg(editingGalleryId ? 'Photo updated successfully!' : 'Photo added to gallery successfully!');
          setGalleryImg('');
          setEditingGalleryId(null);
          const fileInput = document.getElementById('gallery-file-input');
          if (fileInput) fileInput.value = '';
          fetchGallery();
        } else {
          setGalleryFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setGalleryFormMsg('Network error.');
      });
  };

  const handleDeleteGallery = (photoId) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      fetch(`${window.API_BASE || ''}/api/gallery/${photoId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetchGallery();
          } else {
            alert('Failed to delete photo.');
          }
        })
        .catch(err => console.error(err));
    }
  };

  const startEditGallery = (photo) => {
    setEditingGalleryId(photo.id);
    setGalleryImg(photo.img);
    setGalleryFormMsg('');
  };

  const cancelEditGallery = () => {
    setEditingGalleryId(null);
    setGalleryImg('');
    setGalleryFormMsg('');
    const fileInput = document.getElementById('gallery-file-input');
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
            <span className="section-tag text-warning">Media Gallery</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">Gallery<span>Manager</span></h3>
            
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="p-4 rounded border border-light bg-black bg-opacity-35">
                  <h4 className="h6 fw-bold text-white text-uppercase mb-3">
                    {editingGalleryId ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
                  </h4>
                  
                  {galleryFormMsg && (
                    <div className="alert alert-info bg-dark border border-light p-2 text-center small mb-3">
                      {galleryFormMsg}
                    </div>
                  )}

                  <form className="form-yoddha small" onSubmit={handleAddGallery}>
                    <div className="mb-3">
                      <label className="text-white mb-2 fw-bold">Select Photo from Device</label>
                      <input 
                        type="file" 
                        id="gallery-file-input"
                        accept="image/*" 
                        className="form-control form-control-sm text-secondary bg-black border-light" 
                        onChange={handleFileChange} 
                        required={!editingGalleryId} 
                      />
                      {galleryImg && (
                        <div className="mt-3 text-center">
                          <img src={galleryImg} alt="Preview" className="img-thumbnail rounded shadow" style={{ maxHeight: '150px', border: '1px solid var(--accent-gold)' }} />
                          <div className="small text-muted mt-1">Image selected</div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex gap-2 mt-4">
                      <button type="submit" className="btn btn-sm btn-yoddha-primary flex-grow-1 py-2 text-uppercase fw-bold">
                        {editingGalleryId ? 'Update Photo' : 'Upload to Gallery'}
                      </button>
                      {editingGalleryId && (
                        <button type="button" className="btn btn-sm btn-secondary py-2" onClick={cancelEditGallery}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <h4 className="h6 fw-bold text-white text-uppercase mb-3">Gallery Photos Showcase ({gallery.length})</h4>
                
                {loading ? (
                  <div className="py-5 text-center text-secondary">
                    <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                    <div>Retrieving gallery...</div>
                  </div>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    <table className="table table-dark table-hover border border-light align-middle text-secondary small text-center">
                      <thead className="table-active text-white text-uppercase">
                        <tr>
                          <th>Photo ID</th>
                          <th>Preview Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gallery.map(g => (
                          <tr key={g.id}>
                            <td className="font-monospace">#{g.id}</td>
                            <td>
                              <img src={g.img} alt="Gallery item" className="rounded" style={{ width: '120px', height: '80px', objectFit: 'cover', border: '1px solid var(--border-light)' }} />
                            </td>
                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-outline-warning border-0" onClick={() => startEditGallery(g)} title="Edit Photo">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteGallery(g.id)} title="Delete Photo">
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
