import { FOOD_DATABASE, type FoodDatabaseItem } from '../data/foodDatabase';
export type { FoodDatabaseItem };
import Fuse from 'fuse.js';

const fuse = new Fuse(FOOD_DATABASE, {
  keys: ['name', 'category'],
  threshold: 0.4,
  includeScore: true
});

export const searchFoods = (query: string): FoodDatabaseItem[] => {
  if (!query) return [];
  
  // Try exact character substring match first for "auto-completion" feel
  const normalizedQuery = query.toLowerCase().trim();
  const exactMatches = FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().startsWith(normalizedQuery)
  );

  // Use Fuse.js for fuzzy matching
  const fuzzyResults = fuse.search(query);
  const fuzzyMatches = fuzzyResults
    .filter(res => !exactMatches.some(exact => exact.id === res.item.id))
    .map(res => res.item);

  return [...exactMatches, ...fuzzyMatches].slice(0, 15);
};

export const getFoodById = (id: string): FoodDatabaseItem | undefined => {
  return FOOD_DATABASE.find(f => f.id === id);
};

export const calculateMacrosByQuantity = (food: FoodDatabaseItem, quantity: number) => {
  const ratio = quantity / food.quantity;
  return {
    kcals: Math.round(food.kcals * ratio),
    protein: parseFloat((food.protein * ratio).toFixed(1)),
    carbs: parseFloat((food.carbs * ratio).toFixed(1)),
    fats: parseFloat((food.fats * ratio).toFixed(1))
  };
};
