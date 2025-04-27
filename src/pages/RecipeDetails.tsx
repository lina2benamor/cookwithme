import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  Share2, 
  Printer, 
  ArrowLeft, 
  Check 
} from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, saveRecipe, savedRecipes } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (id) {
      const foundRecipe = getRecipeById(id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setIsSaved(savedRecipes.some(r => r.id === id));
      } else {
        navigate('/generator');
      }
    }
  }, [id, getRecipeById, navigate, savedRecipes]);

  const handleSaveRecipe = () => {
    if (recipe) {
      saveRecipe(recipe);
      setIsSaved(true);
      setSaveMessage('Recipe saved!');
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    return (
      <div className="pt-20 pb-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Loading recipe...</div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-amber-700 hover:text-amber-500 mb-6 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back
          </button>
          
          {/* Header */}
          <div className="relative rounded-xl overflow-hidden mb-8 h-72">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <div className="flex justify-between items-end">
                  <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={handlePrint}
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
                      aria-label="Print recipe"
                    >
                      <Printer size={18} />
                    </button>
                    <button 
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
                      aria-label="Share recipe"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center text-white/90 text-sm gap-x-4 gap-y-2">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {recipe.cookingTime} min
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {recipe.servings} servings
                  </div>
                  <div className="flex items-center">
                    <ChefHat size={16} className="mr-1" />
                    {recipe.difficulty}
                  </div>
                  <div className="px-2 py-0.5 bg-amber-500 rounded-full text-white text-xs">
                    {recipe.cuisineType}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-amber-700 mb-8">{recipe.description}</p>
          
          {/* Save Button */}
          {!isSaved ? (
            <button
              onClick={handleSaveRecipe}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg mb-8 inline-flex items-center transition-colors duration-300"
            >
              <Heart size={18} className="mr-2" />
              Save to My Recipes
            </button>
          ) : (
            <div className="flex items-center mb-8">
              <span className="bg-amber-100 text-amber-800 font-medium py-2 px-4 rounded-lg inline-flex items-center">
                <Check size={18} className="mr-2 text-green-600" />
                Saved to My Recipes
              </span>
              {saveMessage && (
                <span className="ml-3 text-green-600 animate-fade-out">{saveMessage}</span>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <div className="bg-amber-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 text-amber-800">Ingredients</h2>
                <p className="text-sm text-amber-600 mb-4">For {recipe.servings} servings</p>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                      <span className="text-amber-900">
                        <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-6 text-amber-800">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction) => (
                  <div key={instruction.step} className="group">
                    <div className="flex">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-semibold group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                          {instruction.step}
                        </div>
                      </div>
                      <div>
                        <p className="text-amber-800">{instruction.instruction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;