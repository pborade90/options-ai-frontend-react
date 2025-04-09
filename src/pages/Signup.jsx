import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import signupIllustration from '../assets/signup.svg';

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (!name) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (password.length < 6) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields with valid information.");
      return;
    }
    onSignup({ name, email });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 font-poppins">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          className="hidden lg:block"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full max-w-lg mx-auto"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-10 w-full"
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-dark mb-6 text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-slate rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-slate rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-slate rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-svg hover:bg-red text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
