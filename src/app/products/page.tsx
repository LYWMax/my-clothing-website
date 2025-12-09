import { products } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight">Our Collection</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
        Explore our curated selection of premium formal wear, designed with precision and crafted from the finest materials.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
