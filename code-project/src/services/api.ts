
const API_BASE_URL = 'http://localhost:3000/api';

export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data;
};

export const getProgress = async (language: string = 'JavaScript') => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  const res = await fetch(`${API_BASE_URL}/progress?language=${language}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load progress');
  return res.json();
};

export const updateProgress = async (data: any) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');
  
  const response = await fetch(`${API_BASE_URL}/progress/daily`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) throw new Error('Failed to update progress');
  return response.json();
};