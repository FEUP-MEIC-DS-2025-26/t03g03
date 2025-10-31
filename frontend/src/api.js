export const BACKEND = 'http://localhost:3000';
export const API_BASE = BACKEND + '/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}