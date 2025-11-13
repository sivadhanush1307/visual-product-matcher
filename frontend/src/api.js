const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function searchImageFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE}/api/products/search?limit=20`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function searchImageUrl(imageUrl) {
  const body = new URLSearchParams();
  body.append('imageUrl', imageUrl);
  const res = await fetch(`${BASE}/api/products/search?limit=20`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`${BASE}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
