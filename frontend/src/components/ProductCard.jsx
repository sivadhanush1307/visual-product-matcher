import React from 'react';
export default function ProductCard({ p }) {
  return (
    <div className="card">
      <img src={p.imageUrl} alt={p.name} />
      <div className="meta">
        <strong>{p.name}</strong>
        <div>{p.category}</div>
        <div>Similarity: {(p.similarity*100).toFixed(1)}%</div>
      </div>
    </div>
  );
}
