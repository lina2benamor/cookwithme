import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowRight, Clock, Utensils, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="min-h-[85vh] flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Turn Your Ingredients Into <span className="text-amber-400">Delicious Meals</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover creative recipes based on the ingredients you already have at home.
          </p>
          <Link 
            to="/generator" 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group"
          >
            Start Cooking
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Utensils className="text-amber-500" size={40} />} 
              title="Add Your Ingredients"
              description="Select the ingredients you have on hand in your pantry and refrigerator."
              step={1}
            />
            
            <FeatureCard 
              icon={<ChefHat className="text-amber-500" size={40} />} 
              title="Generate Recipes"
              description="Our smart algorithm will suggest delicious recipes you can make with your ingredients."
              step={2}
            />
            
            <FeatureCard 
              icon={<Heart className="text-amber-500" size={40} />} 
              title="Cook & Enjoy"
              description="Follow the recipe instructions and enjoy your homemade meal!"
              step={3}
            />
          </div>
        </div>
      </section>

      {/* Featured Recipes Preview */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-800">Popular Recipes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RecipePreview 
              image="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg"
              title="Garlic Butter Shrimp Pasta"
              time={25}
              cuisine="Italian"
            />
            
            <RecipePreview 
              image="https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg"
              title="Beef Stir Fry with Vegetables"
              time={30}
              cuisine="Asian"
            />
            
            <RecipePreview 
              image="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg"
              title="Mediterranean Chickpea Salad"
              time={15}
              cuisine="Mediterranean"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/generator" 
              className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-500 transition-colors duration-300 group"
            >
              Find more recipes based on your ingredients
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Cooking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No more wasted ingredients or trips to the grocery store. 
            Use what you already have to create amazing meals!
          </p>
          <Link 
            to="/generator" 
            className="bg-white text-amber-700 hover:bg-amber-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group"
          >
            Get Started Now
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, step }) => {
  return (
    <div className="bg-amber-50 p-8 rounded-lg shadow-md border border-amber-100 text-center transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <span className="inline-block bg-amber-200 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
        Step {step}
      </span>
      <h3 className="text-xl font-semibold mb-4 text-amber-800">{title}</h3>
      <p className="text-amber-700">{description}</p>
    </div>
  );
};

interface RecipePreviewProps {
  image: string;
  title: string;
  time: number;
  cuisine: string;
}

const RecipePreview: React.FC<RecipePreviewProps> = ({ image, title, time, cuisine }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-amber-800">{title}</h3>
        <div className="flex items-center text-amber-700 mb-4">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{time} min</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{cuisine}</span>
        </div>
        <Link 
          to="/generator" 
          className="text-amber-700 font-medium hover:text-amber-500 transition-colors duration-300 inline-flex items-center text-sm"
        >
          Create a similar recipe
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default Home;