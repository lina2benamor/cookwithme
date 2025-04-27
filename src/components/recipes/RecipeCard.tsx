import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';
import { Clock, Users, ArrowRight, Trash } from 'lucide-react';
import { useRecipes } from '../../context/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
  showRemoveButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, showRemoveButton = false }) => {
  const { removeSavedRecipe } = useRecipes();

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeSavedRecipe(recipe.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {recipe.dietaryLabels.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {recipe.dietaryLabels.map(label => (
                <span 
                  key={label} 
                  className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
              {recipe.cuisineType}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold mb-2 text-amber-800 group-hover:text-amber-600 transition-colors duration-300">
              {recipe.title}
            </h3>
            {showRemoveButton && (
              <button 
                onClick={handleRemove}
                className="text-amber-400 hover:text-amber-600 transition-colors duration-300 p-1"
                aria-label="Remove from saved recipes"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center text-amber-700 mb-3">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{recipe.cookingTime} min</span>
            <span className="mx-2">•</span>
            <Users size={16} className="mr-1" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
          <p className="text-amber-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-amber-700">
              {recipe.ingredients.length} ingredients
            </span>
            <span className="text-amber-600 inline-flex items-center text-sm group-hover:text-amber-700 transition-colors duration-300">
              View recipe
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;