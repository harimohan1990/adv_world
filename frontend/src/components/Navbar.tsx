import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="fixed w-full z-50 glass border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-purple animate-pulse" />
            <span className="text-xl font-bold gradient-text tracking-tight">AdVantage</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-brand-purple transition-colors px-3 py-2 rounded-md text-sm font-medium">Marketplace</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="hover:text-brand-purple transition-colors px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
                  <Link to="/login" className="bg-brand-purple hover:bg-brand-pink transition-colors text-white px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-dark-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brand-purple block px-3 py-2 rounded-md text-base font-medium">Marketplace</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-brand-purple block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="text-left text-gray-400 hover:text-white block px-3 py-2 text-base font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
