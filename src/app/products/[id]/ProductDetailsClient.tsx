'use client';

import { useState } from 'react';
import { useCart, type Product } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
      <p className="mt-4 text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
      <p className="mt-6 text-base text-muted-foreground">{product.description}</p>
      
      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center rounded-md border">
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-10 w-16 border-0 text-center text-lg focus-visible:ring-0"
            aria-label="Quantity"
          />
          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button size="lg" onClick={() => addItem(product, quantity)} className="flex-1">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
