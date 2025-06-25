const getApiBaseUrl = () => {
  // If running on localhost, use localhost for development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }
  
  // For production/mobile, use your Railway deployment URL
  return 'https://codestreak-production.up.railway.app/api';
};

const API_BASE_URL = getApiBaseUrl();

export const register = async (name: string, email: string, password: string) => {
  console.log('Attempting registration with:', { name, email, API_BASE_URL });
  
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  console.log('Register response status:', res.status);
  console.log('Register response headers:', Object.fromEntries(res.headers.entries()));

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Registration failed:', errorData);
    throw new Error(errorData.error || 'Registration failed');
  }
  
  const data = await res.json();
  console.log('Registration successful:', data);
  return data;
};

export const login = async (email: string, password: string) => {
  console.log('Attempting login with:', { email, API_BASE_URL });
  
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  console.log('Login response status:', res.status);
  console.log('Login response headers:', Object.fromEntries(res.headers.entries()));

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Login failed:', errorData);
    throw new Error(errorData.error || 'Login failed');
  }
  
  const data = await res.json();
  console.log('Login successful:', data);
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