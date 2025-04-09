import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logomark from '../assets/logomark.png';

function Header({ user, onLogout }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="bg-dark text-cream p-4 flex justify-between items-center">
      <Link className="flex items-center hover:scale-105 transition-all duration-300" to="/">
        <img src={Logomark} alt="Options AI Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">Options AI</h1>
        </Link>
      <div className="space-x-4">
        {isLanding && !user && (
          <>
            <Link to="/signup" className="hover:text-red">Signup</Link>
            <Link to="/login" className="hover:text-red">Login</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-red hover:underline transition-all duration-300">Dashboard</Link>
            <button onClick={onLogout} className="hover:text-red transition-all duration-300">Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
