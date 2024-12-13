import React, { useState } from 'react';
import  { apiRequest } from './api';

const Login = () => {
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiRequest('/login','POST', { username });
      // await apiRequest('/endpoint', 'GET', null, { query: 'value' });
      localStorage.setItem('accessToken', data.accessToken); // Store access token
      alert('Login successful!');
      window.location.href = '/protected'; // Redirect to dashboard
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
