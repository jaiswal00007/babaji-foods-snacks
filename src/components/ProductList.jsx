import { products } from '../data/products';
import ProductCard from './ProductCard'; // Import the new component

export default function ProductList() {
  return (
    <section id="shop" className="bg-brand-ivory py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-royal mb-4">
            Our Signature Collection
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto"></div>
          <p className="mt-4 text-gray-500 font-light">
            Click the small photos to see ingredients & packaging.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}