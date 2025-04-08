import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCategoryOpen) setIsCategoryOpen(false);
  };
  
  const toggleCategory = (e) => {
    e.stopPropagation();
    setIsCategoryOpen(!isCategoryOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryRef]);
  
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-bold text-lg md:text-xl">
            <Link to="/" className="flex items-center">
              Wedding Manager
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/admin" className="hover:text-gray-300 transition duration-200">Dashboard</Link>
            <Link to="/statistics" className="hover:text-gray-300 transition duration-200">Statistics</Link>
            
            {/* Categories dropdown with hover and click support */}
            <div className="relative" ref={categoryRef}>
              <button 
                className="hover:text-gray-300 transition duration-200 flex items-center peer"
                onClick={toggleCategory}
                aria-expanded={isCategoryOpen}
                aria-haspopup="true"
              >
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg invisible hover:visible peer-hover:visible focus:visible peer-focus:visible transition-all duration-300 opacity-0 hover:opacity-100 peer-hover:opacity-100 z-10">
                <Link to="/family" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Family</Link>
                <Link to="/friends" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Friends</Link>
                <Link to="/relatives" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Relatives</Link>
                <Link to="/others" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Others</Link>
              </div>
            </div>
          </div>
          
          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm">Welcome, {user?.name || 'Admin'}</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-4 space-y-1">
            <Link 
              to="/admin" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/statistics" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Statistics
            </Link>
            
            {/* Mobile Categories Dropdown */}
            <div>
              <button 
                className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={toggleCategory}
                aria-expanded={isCategoryOpen}
              >
                Categories
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCategoryOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {isCategoryOpen && (
                <div className="pl-4 space-y-1">
                  <Link 
                    to="/family" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Family
                  </Link>
                  <Link 
                    to="/friends" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Friends
                  </Link>
                  <Link 
                    to="/relatives" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Relatives
                  </Link>
                  <Link 
                    to="/others" 
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Others
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile User Info */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">Welcome, {user?.name || 'Admin'}</p>
              </div>
              <div className="px-3 pt-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;