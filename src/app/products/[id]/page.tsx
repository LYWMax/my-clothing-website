
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { placeholderImages } from '@/lib/placeholder-images';
import ProductDetailsClient from './ProductDetailsClient';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

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
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}
