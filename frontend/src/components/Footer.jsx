import React from 'react';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold">Job<span className="text-blue-400">Portal</span></h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Connecting talented professionals with top companies across India. Your next career move starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/Browse" className="hover:text-blue-400 transition-colors">All Categories</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-400" /> support@jobportal.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-400" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-400" /> India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 JobPortal. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
