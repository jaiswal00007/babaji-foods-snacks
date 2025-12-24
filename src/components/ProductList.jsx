import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductList() {
  return (
    // --- FIX 3: Increased top padding (pt-40) to give more buffer space ---
    <section id="shop" className="relative bg-brand-ivory pt-40 pb-32 px-6 min-h-screen overflow-hidden z-0">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-royal/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold">From our kitchen to yours</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-brand-royal mt-4 mb-6">
            Signature Selection
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}