import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function Results({ data, preview }) {
  const [minSim, setMinSim] = useState(0);
  if (!data) return null;
  const { results } = data;
  const filtered = results.filter(r => r.similarity >= minSim);
  return (
    <div className="results">
      <div className="query">
        <h4>Query</h4>
        {preview && <img src={preview} alt="query" />}
        <div style={{ marginTop: 8, fontSize: 12 }}>Hash: {data.queryHash}</div>
      </div>

      <div className="filter">
        <label>Min similarity: {(minSim*100).toFixed(0)}%</label>
        <input type="range" min="0" max="1" step="0.01" value={minSim} onChange={e=>setMinSim(Number(e.target.value))} />
      </div>

      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
