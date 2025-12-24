import { products } from '../data/products';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

export default function ProductList() {
  return (
    <section id="shop" className="relative bg-brand-ivory pt-40 pb-32 px-6 min-h-screen overflow-hidden z-0">
      
      {/* Background Blobs (Slightly Animated) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" 
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- ENHANCED HEADER ANIMATION --- */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-brand-gold uppercase tracking-[0.3em] text-xs font-bold bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm border border-brand-gold/10">
              From our kitchen to yours
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
            className="font-serif text-5xl md:text-7xl font-bold text-brand-royal mt-6 mb-8"
          >
            Signature Selection
          </motion.h2>

          {/* Growing Line Animation */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 80, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
            className="w-px bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent mx-auto"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}