import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-cream p-4 text-center">
      <div className="space-x-4">
        <Link to="/privacy" className="hover:text-red">Privacy</Link>
        <Link to="/about" className="hover:text-red">About</Link>
        <Link to="/contact" className="hover:text-red">Contact</Link>
        <Link to="/terms" className="hover:text-red">Terms</Link>
      </div>
      <p className="mt-2">&copy; {new Date().getFullYear()} Options AI. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

