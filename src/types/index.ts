// Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Baby Boy' | 'Baby Girl';
  image: any; // Local image import
  description: string;
}

// Seller interface
export interface Seller {
  id: string;
  name: string;
  image: any;
  rating: number;
  followers: number;
  isFollowing: boolean;
}

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// User interface
export interface User {
  name: string;
  email: string;
  avatar?: any;
}

// Filter types
export type FilterCategory = 'All' | 'Men' | 'Women' | 'Baby Boy' | 'Baby Girl';

// Sort options
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

// Navigation types
export interface TabParamList {
  index: undefined;
  catalog: undefined;
  sellers: undefined;
  profile: undefined;
}

export interface StackParamList {
  '(tabs)': undefined;
  '(auth)': undefined;
  'details/[id]': { id: string };
}