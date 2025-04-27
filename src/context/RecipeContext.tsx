import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Recipe, Ingredient } from '../types';
import { generateRecipeFromIngredients } from '../services/recipeService';

interface RecipeContextType {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  isLoading: boolean;
  generateRecipes: (ingredients: Ingredient[]) => Promise<void>;
  saveRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateRecipes = async (ingredients: Ingredient[]) => {
    setIsLoading(true);
    try {
      const generatedRecipes = await generateRecipeFromIngredients(ingredients);
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error('Failed to generate recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipe = (recipe: Recipe) => {
    if (!savedRecipes.some(r => r.id === recipe.id)) {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
    }
  };

  const removeSavedRecipe = (id: string) => {
    const updatedSavedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
  };

  const getRecipeById = (id: string) => {
    return [...recipes, ...savedRecipes].find(recipe => recipe.id === id);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      savedRecipes,
      isLoading,
      generateRecipes,
      saveRecipe,
      removeSavedRecipe,
      getRecipeById
    }}>
      {children}
    </RecipeContext.Provider>
  );
};