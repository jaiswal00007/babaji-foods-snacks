import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Info, X, Leaf, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // Auto-swipe logic
  useEffect(() => {
    if (isHovered || showNutrition) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % product.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, showNutrition, product.images.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative w-full h-full"
    >
      {/* --- BACK GLOW EFFECT (Advanced CSS) --- */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-brand-gold/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

      <div className="relative h-full bg-white rounded-[2.5rem] shadow-float hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col">
        
        {/* --- IMAGE AREA (Parallax Feel) --- */}
        <div 
          className="relative h-[420px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode='wait'>
            <motion.img
              key={activeImage}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // Custom Bezier for luxury feel
              src={product.images[activeImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Floating Tag (Glass) */}
          {product.tag && (
            <div className="absolute top-6 left-6 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
              <div className="relative flex items-center gap-2 px-4 py-1.5">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 to-transparent opacity-50" />
                <Sparkles size={12} className="text-brand-gold relative z-10" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] relative z-10">
                  {product.tag}
                </span>
              </div>
            </div>
          )}

          {/* Nutrition Toggle (Floating Circle) */}
          <button 
            onClick={() => setShowNutrition(!showNutrition)}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-brand-gold hover:text-brand-royal hover:scale-110 transition-all duration-300 shadow-lg group-hover:rotate-12"
          >
            {showNutrition ? <X size={18} /> : <Info size={18} />}
          </button>

          {/* --- NUTRITION OVERLAY (Glassmorphism) --- */}
          <AnimatePresence>
            {showNutrition && (
              <motion.div 
                initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
                animate={{ backdropFilter: "blur(20px)", opacity: 1 }}
                exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
                className="absolute inset-0 z-10 bg-brand-royal/80 p-8 flex flex-col justify-center text-white"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="font-serif text-2xl text-brand-gold mb-8 italic">Nutritional Value</h4>
                  <div className="space-y-6">
                    {Object.entries(product.nutrition).map(([key, value], idx) => (
                      <div key={key} className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-sm text-gray-300 capitalize font-light tracking-wide">{key}</span>
                        <span className="font-serif text-xl font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal Thumbnails (iOS Style) */}
          {!showNutrition && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeImage === index 
                      ? 'w-8 bg-brand-gold shadow-[0_0_10px_#D4AF37]' 
                      : 'w-1.5 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="relative flex flex-col flex-grow p-8 -mt-6 bg-white rounded-t-[2.5rem] z-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-royal leading-none">
                {product.title}
              </h3>
              <div className="flex items-center gap-2">
                 <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                 </div>
                 <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Premium Quality</span>
              </div>
            </div>
            
            {/* Price Badge */}
            <div className="text-right">
               {product.oldPrice && <p className="text-xs text-gray-400 line-through decoration-brand-gold/50">₹{product.oldPrice}</p>}
               <p className="font-serif text-3xl font-bold text-brand-royal">₹{product.price}</p>
            </div>
          </div>

          {/* Ingredients (Pill Design) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-gold/10 text-brand-royal text-[10px] font-bold uppercase tracking-wide hover:border-brand-gold/50 hover:bg-white transition-colors cursor-default">
                <Leaf size={10} className="text-brand-gold" /> {ing}
              </span>
            ))}
          </div>

          {/* Liquid Gold Button */}
          <div className="mt-auto pt-4">
            <button className="relative w-full group overflow-hidden rounded-xl bg-brand-royal p-4 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-brand-gold transition-transform duration-500 ease-out" />
              
              <div className="relative flex items-center justify-center gap-3">
                <span className="font-serif font-bold text-white group-hover:text-brand-royal transition-colors duration-300">Add to Cart</span>
                <ShoppingCart size={18} className="text-white group-hover:text-brand-royal transition-colors duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}