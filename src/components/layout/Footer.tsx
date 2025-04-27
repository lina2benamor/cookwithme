import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ChefHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ChefHat size={24} />
              <span className="text-xl font-bold">RecipeCraft</span>
            </Link>
            <p className="text-amber-200 mb-4">
              Discover delicious recipes based on ingredients you already have at home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-200 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/generator" className="text-amber-200 hover:text-white transition-colors duration-300">Recipe Generator</Link></li>
              <li><Link to="/saved" className="text-amber-200 hover:text-white transition-colors duration-300">Saved Recipes</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Popular Recipes</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Seasonal Dishes</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Cooking Guides</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Ingredient Encyclopedia</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200">
          <p>&copy; {new Date().getFullYear()} RecipeCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;