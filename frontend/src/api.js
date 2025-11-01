const BE_HOST = import.meta.env.BE_HOST || 'localhost';
const BE_PORT = import.meta.env.BE_PORT || '3000';
export const API_BASE = 'http://' + BE_HOST + ':' + BE_PORT + '/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}