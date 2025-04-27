import React, { useState, useEffect } from 'react';
import { useRecipes } from '../context/RecipeContext';
import { Ingredient } from '../types';
import { Search, Plus, Loader2, ChefHat } from 'lucide-react';
import RecipeCard from '../components/recipes/RecipeCard';

// Common ingredients list
const commonIngredients: Ingredient[] = [
  { id: '1', name: 'Chicken', category: 'Protein' },
  { id: '2', name: 'Beef', category: 'Protein' },
  { id: '3', name: 'Pasta', category: 'Grain' },
  { id: '4', name: 'Rice', category: 'Grain' },
  { id: '5', name: 'Potato', category: 'Vegetable' },
  { id: '6', name: 'Onion', category: 'Vegetable' },
  { id: '7', name: 'Tomato', category: 'Vegetable' },
  { id: '8', name: 'Cheese', category: 'Dairy' },
  { id: '9', name: 'Egg', category: 'Protein' },
  { id: '10', name: 'Carrot', category: 'Vegetable' },
  { id: '11', name: 'Garlic', category: 'Vegetable' },
  { id: '12', name: 'Broccoli', category: 'Vegetable' },
];

const RecipeGenerator = () => {
  const { recipes, generateRecipes, isLoading } = useRecipes();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  // Filter ingredients based on search term
  const filteredIngredients = commonIngredients.filter(
    ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIngredients.some(selected => selected.id === ingredient.id)
  );
  
  // Group ingredients by category
  const groupedIngredients = filteredIngredients.reduce<Record<string, Ingredient[]>>((acc, ingredient) => {
    const category = ingredient.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {});

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== id));
  };

  const handleGenerateRecipes = () => {
    generateRecipes(selectedIngredients);
    setShowInstructions(false);
    window.scrollTo({
      top: document.getElementById('results')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  // Add custom ingredient
  const handleAddCustomIngredient = () => {
    if (searchTerm.trim()) {
      const newIngredient: Ingredient = {
        id: `custom-${Date.now()}`,
        name: searchTerm.trim(),
      };
      setSelectedIngredients([...selectedIngredients, newIngredient]);
      setSearchTerm('');
    }
  };

  // Hide instructions when recipes are loaded
  useEffect(() => {
    if (recipes.length > 0) {
      setShowInstructions(false);
    }
  }, [recipes]);

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-amber-800">Recipe Generator</h1>
          <p className="text-amber-700 mb-8">Select ingredients you have on hand to generate delicious recipes.</p>
          
          {/* Ingredient Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-amber-800">Your Ingredients</h2>
            
            {/* Search */}
            <div className="flex mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search or add new ingredient..."
                  className="w-full py-2 px-4 pr-10 border border-amber-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500" />
              </div>
              <button
                onClick={handleAddCustomIngredient}
                disabled={!searchTerm.trim()}
                className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white py-2 px-4 rounded-r-lg transition-colors duration-300 flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add
              </button>
            </div>
            
            {/* Selected Ingredients */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-amber-700 mb-2">Selected Ingredients:</h3>
              {selectedIngredients.length === 0 ? (
                <p className="text-amber-500 italic">No ingredients selected yet. Select from below or search to add your own.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map(ingredient => (
                    <span
                      key={ingredient.id}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center group"
                    >
                      {ingredient.name}
                      <button
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                        className="ml-2 text-amber-500 hover:text-amber-700 transition-colors duration-300"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Common Ingredients */}
            <div>
              <h3 className="text-sm font-medium text-amber-700 mb-2">Common Ingredients:</h3>
              <div className="space-y-4">
                {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                  <div key={category}>
                    <h4 className="text-xs uppercase tracking-wider text-amber-500 mb-1">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map(ingredient => (
                        <button
                          key={ingredient.id}
                          onClick={() => handleIngredientSelect(ingredient)}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm transition-colors duration-300"
                        >
                          {ingredient.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Generate Button */}
            <div className="mt-8">
              <button
                onClick={handleGenerateRecipes}
                disabled={selectedIngredients.length === 0 || isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Generating Recipes...
                  </>
                ) : (
                  <>
                    <ChefHat size={20} className="mr-2" />
                    Generate Recipes
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Instructions */}
          {showInstructions && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-2 text-amber-800">How It Works</h2>
              <ol className="list-decimal list-inside space-y-2 text-amber-700">
                <li>Select ingredients you have available in your kitchen</li>
                <li>Click "Generate Recipes" to find recipes that use your ingredients</li>
                <li>Browse the suggestions and pick a recipe you'd like to make</li>
                <li>Follow the detailed instructions to prepare your meal</li>
              </ol>
            </div>
          )}
          
          {/* Results */}
          <div id="results">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={40} className="animate-spin text-amber-600" />
              </div>
            ) : recipes.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-amber-800">Recipes You Can Make</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : selectedIngredients.length > 0 && !showInstructions ? (
              <div className="text-center py-12">
                <p className="text-lg text-amber-700 mb-4">No recipes found for your ingredients.</p>
                <p className="text-amber-600">Try adding more ingredients or selecting different ones.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;