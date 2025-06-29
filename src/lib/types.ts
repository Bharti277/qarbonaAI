import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.number().min(0, { message: 'Price must be positive' }),
  rating: z.number().min(0).max(5, { message: 'Rating must be between 0-5' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
});


export type Product = z.infer<typeof productSchema>;

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductData extends Product {
  id: number;
}