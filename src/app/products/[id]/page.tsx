
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { placeholderImages } from '@/lib/placeholder-images';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const productImage = placeholderImages.find(p => p.id === product.image);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div className="rounded-lg bg-card p-4 shadow-sm">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              data-ai-hint={productImage.imageHint}
              width={600}
              height={800}
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </div>
        
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
      </div>
    </div>
  );
}

// generateStaticParams is not compatible with 'use client'
// Since this is a static export, we will rely on Next.js to discover the paths.
// If you have a large number of products, you might need a different strategy for a non-static site.
/*
export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}
*/
