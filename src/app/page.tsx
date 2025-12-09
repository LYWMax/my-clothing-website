import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/products';
import { ArrowRight, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Maximum Style Advisor
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200 md:text-xl">
            Discover impeccable formal attire, crafted for the discerning individual.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">
              Shop The Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="featured-products" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <CheckCircle className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Unmatched Quality</h3>
              <p className="mt-2 text-muted-foreground">
                We use only the finest materials to ensure our suits stand the test of time.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Worldwide Shipping</h3>
              <p className="mt-2 text-muted-foreground">
                Wherever you are, we deliver excellence right to your doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="mb-4 h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="mt-2 text-muted-foreground">
                Shop with confidence using our secure and encrypted payment gateway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
