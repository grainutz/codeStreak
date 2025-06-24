import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/api';
import { useUser } from '@/contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      setUserId(res.userId);
      navigate('/select-language'); // redirect to language selection
    } catch (e) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
