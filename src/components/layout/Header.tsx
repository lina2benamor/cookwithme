import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-10 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-amber-700 transition-transform duration-300 hover:scale-105"
        >
          <ChefHat size={28} />
          <span className="text-xl font-bold">RecipeCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" isScrolled={isScrolled}>Home</NavLink>
          <NavLink to="/generator" isScrolled={isScrolled}>Recipe Generator</NavLink>
          <NavLink to="/saved" isScrolled={isScrolled}>Saved Recipes</NavLink>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-amber-800" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink to="/" isMobile>Home</NavLink>
            <NavLink to="/generator" isMobile>Recipe Generator</NavLink>
            <NavLink to="/saved" isMobile>Saved Recipes</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isScrolled?: boolean;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isScrolled, isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`
        ${isMobile ? 'text-amber-800 text-lg py-2' : 'transition-colors duration-300'} 
        ${isActive 
          ? 'font-bold text-amber-700' 
          : isScrolled || isMobile 
            ? 'text-amber-800 hover:text-amber-600' 
            : 'text-amber-800 hover:text-amber-600'
        }
      `}
    >
      {children}
    </Link>
  );
};

export default Header;