import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { register } from '@/services/api';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useUser();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await register(name, email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.userId);
      setUserId(res.userId);
      navigate('/select-language');
    } catch (error) {
      alert('Registration failed. Try again.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
