import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase'; // Adjust the import path if needed
import '../LoginPage.css'; // Import the CSS file for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/meal-plan');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
          setError('No such user. Click here to sign up.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address. Please check your email.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-header">Login</h1>
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        {error && (
          <div className="error-container">
            <p>{error}</p>
            {error.includes('No such user') && (
              <button onClick={handleSignupRedirect} className="signup-redirect-button">Sign Up</button>
            )}
          </div>
        )}
        <p className="signup-text">New here? <a href="#" onClick={handleSignupRedirect}>Create a user</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
