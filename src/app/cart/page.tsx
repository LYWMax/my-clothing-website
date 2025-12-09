'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, type CartItem } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

function CartItemView({ item }: { item: CartItem }) {
  const { updateItemQuantity, removeItem } = useCart();
  const productImage = placeholderImages.find(p => p.id === item.product.image);

  const handleQuantityChange = (amount: number) => {
    updateItemQuantity(item.product.id, item.quantity + amount);
  };
  
  return (
    <div className="flex items-center gap-4 py-4">
      {productImage && (
        <Image
          src={productImage.imageUrl}
          alt={item.product.name}
          data-ai-hint={productImage.imageHint}
          width={80}
          height={100}
          className="rounded-md object-cover"
        />
      )}
      <div className="flex-1">
        <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
          {item.product.name}
        </Link>
        <p className="text-muted-foreground">${item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => updateItemQuantity(item.product.id, Math.max(0, parseInt(e.target.value) || 0))}
          className="h-8 w-14 border-x-0 text-center"
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="w-24 text-right font-medium">
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>
      <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default function CartPage() {
  const { items, total, count, clearCart } = useCart();

  if (count === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart ({count} items)</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="divide-y">
            {items.map(item => (
              <CartItemView key={item.product.id} item={item} />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
