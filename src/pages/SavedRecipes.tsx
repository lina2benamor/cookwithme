import React, { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/recipes/RecipeCard';
import { Heart, Search, BookX } from 'lucide-react';

const SavedRecipes = () => {
  const { savedRecipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Heart size={24} className="text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-amber-800">Saved Recipes</h1>
          </div>
          
          {/* Search Bar */}
          {savedRecipes.length > 0 && (
            <div className="mb-8 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved recipes..."
                className="w-full py-2 px-4 pl-10 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" />
            </div>
          )}
          
          {/* Recipes Grid */}
          {savedRecipes.length === 0 ? (
            <div className="text-center py-12 bg-amber-50 rounded-lg">
              <BookX size={48} className="mx-auto text-amber-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-amber-800">No Saved Recipes Yet</h2>
              <p className="text-amber-600 mb-6">Your saved recipes will appear here.</p>
              <a 
                href="/generator" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Discover Recipes
              </a>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-amber-700">No recipes match your search. Try a different term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  showRemoveButton 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;