import React, { useState } from 'react';
import { login, register } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUserId, setLanguage } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const { email, password, username } = formData;
    const res = isLogin
      ? await login(email, password)
      : await register(username, email, password);

    // ✅ Save token and user data
    localStorage.setItem('authToken', res.token);
    localStorage.setItem('userId', res.user.id);
    localStorage.setItem('language', res.language ?? 'JavaScript');

    setUserId(res.user.id);
    setLanguage(res.language ?? 'JavaScript');

    toast.success(`${isLogin ? 'Logged in' : 'Registered'} successfully`);

    setTimeout(() => {
      navigate('/');
    }, 100);
  } catch (err: any) {
    toast.error(err.message || 'Something went wrong');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-blue-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin ? 'Log in to continue' : 'Register to get started'}
          </p>
        </div>

        {!isLogin && (
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button className="w-full py-2 text-lg font-semibold tracking-wide" type="submit">
          {isLogin ? 'Login' : 'Register'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
