export interface Ingredient {
  id: string;
  name: string;
  category?: string;
}

export interface RecipeInstruction {
  step: number;
  instruction: string;
}

export type DietaryLabel = 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Gluten-Free' 
  | 'Dairy-Free' 
  | 'Low-Carb' 
  | 'Keto';

export type CuisineType = 
  | 'Italian' 
  | 'Mexican' 
  | 'Asian' 
  | 'American' 
  | 'Mediterranean' 
  | 'Indian' 
  | 'French';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: RecipeInstruction[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  dietaryLabels: DietaryLabel[];
  cuisineType: CuisineType;
}