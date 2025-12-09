'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, type Product } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const productImage = placeholderImages.find(p => p.id === product.image);

  return (
    <Card className="flex h-full transform flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          {productImage && (
             <Image
              src={productImage.imageUrl}
              alt={product.name}
              data-ai-hint={productImage.imageHint}
              width={600}
              height={800}
              className="h-96 w-full object-cover"
            />
          )}
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-xl font-semibold leading-tight hover:text-primary/80">
            {product.name}
          </CardTitle>
        </Link>
        <p className="mt-4 text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={() => addItem(product, 1)} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
