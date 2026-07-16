import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGateway from '../../components/AdminGateway';

export default function AdminNews({ user, onLoginSuccess }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // News form state
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [newsTag, setNewsTag] = useState('Tournament');
  const [newsImg, setNewsImg] = useState('');
  const [newsDesc, setNewsDesc] = useState('');
  const [newsFormMsg, setNewsFormMsg] = useState('');
  const [editingNewsId, setEditingNewsId] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchNews();
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size limit to ~3MB
      if (file.size > 3 * 1024 * 1024) {
        alert('File is too large. Please select an image under 3MB.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    setNewsFormMsg('');

    if (!newsImg) {
      setNewsFormMsg('Please choose an image file.');
      return;
    }

    const newArticle = {
      title: newsTitle,
      date: newsDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tag: newsTag,
      img: newsImg,
      description: newsDesc
    };

    const url = editingNewsId ? `/api/admin/news/${editingNewsId}` : '/api/admin/news';
    const method = editingNewsId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewsFormMsg(editingNewsId ? 'News article updated successfully!' : 'News article added successfully!');
          setNewsTitle('');
          setNewsDate('');
          setNewsImg('');
          setNewsDesc('');
          setEditingNewsId(null);
          const fileInput = document.getElementById('news-file-input');
          if (fileInput) fileInput.value = '';
          fetchNews();
        } else {
          setNewsFormMsg('Error: ' + data.error);
        }
      })
      .catch(err => {
        console.error(err);
        setNewsFormMsg('Network error.');
      });
  };

  const handleDeleteNews = (newsId) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      fetch(`/api/admin/news/${newsId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetchNews();
          } else {
            alert('Failed to delete news article.');
          }
        })
        .catch(err => console.error(err));
    }
  };

  const startEditNews = (article) => {
    setEditingNewsId(article.id);
    setNewsTitle(article.title);
    setNewsDate(article.date);
    setNewsTag(article.tag);
    setNewsImg(article.img);
    setNewsDesc(article.description);
    setNewsFormMsg('');
  };

  const cancelEditNews = () => {
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsDate('');
    setNewsTag('Tournament');
    setNewsImg('');
    setNewsDesc('');
    setNewsFormMsg('');
    const fileInput = document.getElementById('news-file-input');
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
            <span className="section-tag text-warning">Updates Portal</span>
            <h3 className="h3 fw-900 text-uppercase mb-4 text-white">News & Blogs<span>Manager</span></h3>
            
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="p-4 rounded border border-light bg-black bg-opacity-35">
                  <h4 className="h6 fw-bold text-white text-uppercase mb-3">
                    {editingNewsId ? 'Edit Article' : 'Add Article'}
                  </h4>
                  
                  {newsFormMsg && (
                    <div className="alert alert-info bg-dark border border-light p-2 text-center small mb-3">
                      {newsFormMsg}
                    </div>
                  )}

                  <form className="form-yoddha small" onSubmit={handleAddNews}>
                    <div className="mb-3">
                      <label>Article Title</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Belt Grading Camp 2026" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label>Tag / Category</label>
                      <select className="form-select form-control form-control-sm" value={newsTag} onChange={e => setNewsTag(e.target.value)}>
                        <option value="Tournament">Tournament</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Youth Camp">Youth Camp</option>
                        <option value="Academy News">Academy News</option>
                        <option value="Important Notice">Important Notice</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Publication Date</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. July 15, 2026" value={newsDate} onChange={e => setNewsDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label>Choose Article Photo</label>
                      <input 
                        type="file" 
                        id="news-file-input"
                        accept="image/*" 
                        className="form-control form-control-sm text-secondary bg-black border-light" 
                        onChange={handleFileChange} 
                        required={!editingNewsId} 
                      />
                      {newsImg && (
                        <div className="mt-2 text-center">
                          <img src={newsImg} alt="Preview" className="img-thumbnail rounded" style={{ maxHeight: '100px', border: '1px solid var(--accent-gold)' }} />
                          <div className="small text-muted mt-1">Image selected</div>
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>Article Description</label>
                      <textarea className="form-control form-control-sm" rows="4" placeholder="Enter post summary..." value={newsDesc} onChange={e => setNewsDesc(e.target.value)} required></textarea>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-yoddha-primary flex-grow-1 py-2">
                        {editingNewsId ? 'Update Post' : 'Publish Article'}
                      </button>
                      {editingNewsId && (
                        <button type="button" className="btn btn-sm btn-secondary py-2" onClick={cancelEditNews}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-8">
                <h4 className="h6 fw-bold text-white text-uppercase mb-3">Published Articles ({news.length})</h4>
                
                {loading ? (
                  <div className="py-5 text-center text-secondary">
                    <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-3 text-warning"></i>
                    <div>Retrieving articles...</div>
                  </div>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    <table className="table table-dark table-hover border border-light align-middle text-secondary small">
                      <thead className="table-active text-white text-uppercase">
                        <tr>
                          <th>Preview</th>
                          <th>Title & Date</th>
                          <th>Description</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.map(art => (
                          <tr key={art.id}>
                            <td>
                              <img src={art.img} alt={art.title} className="rounded" style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid var(--border-light)' }} />
                            </td>
                            <td>
                              <div className="text-white fw-bold">{art.title}</div>
                              <span className="badge bg-danger text-uppercase me-2" style={{ fontSize: '0.6rem' }}>{art.tag}</span>
                              <span className="text-warning small" style={{ fontSize: '0.7rem' }}>{art.date}</span>
                            </td>
                            <td>{art.description}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-outline-warning border-0" onClick={() => startEditNews(art)} title="Edit Article">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeleteNews(art.id)} title="Delete Article">
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
