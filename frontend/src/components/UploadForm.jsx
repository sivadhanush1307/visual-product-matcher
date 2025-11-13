import React, { useState } from 'react';
import { searchImageFile, searchImageUrl } from '../api';

export default function UploadForm({ onResults }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  function handleFileChange(e) {
    setError('');
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function submitFile(e) {
    e.preventDefault();
    if (!file) { setError('Select a file or provide URL'); return; }
    setLoading(true);
    try {
      const data = await searchImageFile(file);
      onResults(data, preview);
    } catch (err) {
      setError('Search failed');
    } finally { setLoading(false); }
  }

  async function submitUrl(e) {
    e.preventDefault();
    if (!url) { setError('Enter image URL'); return; }
    setLoading(true);
    setPreview(url);
    try {
      const data = await searchImageUrl(url);
      onResults(data, url);
    } catch (err) {
      setError('Search failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="upload-box">
      <h3>Upload image or paste URL</h3>
      <form onSubmit={submitFile}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button disabled={loading} type="submit">Search by file</button>
      </form>

      <form onSubmit={submitUrl} style={{ marginTop: '10px' }}>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Image URL" />
        <button disabled={loading} type="submit">Search by URL</button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Searching...</div>}
      {preview && <div className="preview"><img src={preview} alt="preview" /></div>}
    </div>
  );
}
