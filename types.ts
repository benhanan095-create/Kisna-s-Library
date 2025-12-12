export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverUrl: string;
  category: string;
  rating: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}

export type PageView = 'home' | 'details' | 'cart' | 'checkout';
