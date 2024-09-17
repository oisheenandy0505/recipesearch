import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page after successful sign-up
      navigate('/');
    } catch (err) {
      console.log('Error code:', err.code); // Log the error code
      console.log('Error message:', err.message); // Log the error message
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('User already exists. Redirecting to login.');
          setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
          break;
        case 'auth/invalid-email':
          setError('Invalid email address. Please check your email.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use a stronger password.');
          break;
        default:
          setError('Sign-up failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignupPage;
