import type { Product } from '@/hooks/use-cart';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Charcoal Suit',
    description: 'A timeless charcoal grey suit crafted from 100% premium wool. Perfect for business meetings and formal events, this suit offers a classic fit and exceptional comfort.',
    price: 499.99,
    image: 'product-1',
  },
  {
    id: '2',
    name: 'Modern Navy Blue Suit',
    description: 'A sharp and modern navy blue suit in a slim-fit cut. Made from a flexible wool blend, it provides a contemporary silhouette without sacrificing comfort. Ideal for weddings and upscale social gatherings.',
    price: 549.99,
    image: 'product-2',
  },
  {
    id: '3',
    name: 'Elegant Black Tuxedo',
    description: 'The quintessential black tuxedo for the most formal occasions. Featuring satin lapels and a refined single-button closure, this tuxedo exudes sophistication and class.',
    price: 799.99,
    image: 'product-3',
  },
  {
    id: '4',
    name: 'Summer Linen Suit',
    description: 'Stay cool and stylish with our light grey linen suit. Breathable and lightweight, it\'s the perfect choice for summer weddings, garden parties, or a sophisticated vacation look.',
    price: 399.99,
    image: 'product-4',
  },
];
