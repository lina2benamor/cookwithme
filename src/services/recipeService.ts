import { Recipe, Ingredient } from '../types';
import { v4 as uuidv4 } from 'uuid';

// This would normally be an API call to a backend service
export const generateRecipeFromIngredients = async (ingredients: Ingredient[]): Promise<Recipe[]> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, generate mock recipes based on ingredients
  const recipes: Recipe[] = [];
  
  const ingredientNames = ingredients.map(i => i.name.toLowerCase());
  
  // Check for ingredient combinations and generate appropriate recipes
  if (ingredientNames.includes('chicken') && ingredientNames.includes('rice')) {
    recipes.push(createMockRecipe('Chicken and Rice Bowl', 'Asian', ['chicken', 'rice']));
  }
  
  if (ingredientNames.includes('pasta') && ingredientNames.includes('tomato')) {
    recipes.push(createMockRecipe('Tomato Pasta', 'Italian', ['pasta', 'tomato']));
  }
  
  if (ingredientNames.includes('beef') && ingredientNames.includes('onion')) {
    recipes.push(createMockRecipe('Beef Stir Fry', 'Asian', ['beef', 'onion']));
  }
  
  if (ingredientNames.includes('egg') && ingredientNames.includes('cheese')) {
    recipes.push(createMockRecipe('Cheese Omelette', 'French', ['egg', 'cheese']));
  }
  
  // Generate a generic recipe if no specific combinations match
  if (recipes.length === 0) {
    recipes.push(createGenericRecipe(ingredients));
  }
  
  return recipes;
};

const createMockRecipe = (title: string, cuisineType: string, mainIngredients: string[]): Recipe => {
  const commonImages = {
    'Chicken and Rice Bowl': 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
    'Tomato Pasta': 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    'Beef Stir Fry': 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg',
    'Cheese Omelette': 'https://images.pexels.com/photos/6294344/pexels-photo-6294344.jpeg',
  };
  
  return {
    id: uuidv4(),
    title,
    description: `A delicious ${title.toLowerCase()} recipe featuring ${mainIngredients.join(' and ')}.`,
    ingredients: [
      ...mainIngredients.map(ing => ({ name: ing.charAt(0).toUpperCase() + ing.slice(1), amount: '1 cup' })),
      { name: 'Salt', amount: 'to taste' },
      { name: 'Pepper', amount: 'to taste' },
      { name: 'Olive Oil', amount: '2 tablespoons' }
    ],
    instructions: [
      { step: 1, instruction: `Prepare the ${mainIngredients[0]} by washing and cutting it into pieces.` },
      { step: 2, instruction: `Cook the ${mainIngredients[0]} in a pan with olive oil.` },
      { step: 3, instruction: `Add the ${mainIngredients[1]} and cook for another 5 minutes.` },
      { step: 4, instruction: 'Season with salt and pepper to taste.' },
      { step: 5, instruction: 'Serve hot and enjoy!' }
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    imageUrl: commonImages[title as keyof typeof commonImages] || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    dietaryLabels: [],
    cuisineType: cuisineType as any,
  };
};

const createGenericRecipe = (ingredients: Ingredient[]): Recipe => {
  const mainIngredients = ingredients.slice(0, 3).map(i => i.name.toLowerCase());
  
  return {
    id: uuidv4(),
    title: `${mainIngredients[0].charAt(0).toUpperCase() + mainIngredients[0].slice(1)} Special`,
    description: `A custom recipe featuring your selected ingredients: ${mainIngredients.join(', ')}.`,
    ingredients: [
      ...mainIngredients.map(ing => ({ 
        name: ing.charAt(0).toUpperCase() + ing.slice(1), 
        amount: '1 cup' 
      })),
      { name: 'Salt', amount: 'to taste' },
      { name: 'Pepper', amount: 'to taste' }
    ],
    instructions: [
      { step: 1, instruction: 'Combine all ingredients in a large bowl.' },
      { step: 2, instruction: 'Mix well and season to taste.' },
      { step: 3, instruction: 'Cook over medium heat for 15 minutes.' },
      { step: 4, instruction: 'Let it cool for 5 minutes before serving.' }
    ],
    cookingTime: 20,
    servings: 2,
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    dietaryLabels: [],
    cuisineType: 'American' as any,
  };
};