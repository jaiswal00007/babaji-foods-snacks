import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Info, X, Leaf, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function ProductCard({ product, index }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showNutrition, setShowNutrition] = useState(false);
  
  // --- MOUSE SPOTLIGHT LOGIC ---
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Auto-swipe logic
  useEffect(() => {
    if (showNutrition) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % product.images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [showNutrition, product.images.length]);

return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} // Reduced distance (was 100)
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 200, damping: 25 } 
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Faster duration (was 0.8)
      
      // ADD 'will-change-transform' HERE to fix the lag
      className="group relative w-full h-full z-0 hover:z-10 will-change-transform" 
    >
      
      {/* --- SHADOW GLOW (Appears behind card on hover) --- */}
      <div className="absolute top-8 left-4 right-4 h-full bg-brand-royal/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 shadow-lg group-hover:shadow-2xl hover:border-brand-gold/30"
      >
        
        {/* --- GOLD SPOTLIGHT LAYER --- */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(212, 175, 55, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        {/* --- IMAGE AREA --- */}
        <div className="relative h-[450px] overflow-hidden bg-gray-50">
          
          {/* Image Zoom Wrapper */}
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <AnimatePresence mode='wait'>
              <motion.img
                key={activeImage}
                initial={{ scale: 1.1, opacity: 0, filter: "blur(5px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-6 left-6 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg z-20">
              <div className="flex items-center gap-2 px-4 py-1.5">
                <Sparkles size={12} className="text-brand-gold" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                  {product.tag}
                </span>
              </div>
            </div>
          )}

          {/* Nutrition Toggle */}
          <button 
            onClick={() => setShowNutrition(!showNutrition)}
            className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-brand-gold hover:text-brand-royal transition-all duration-300 shadow-lg"
          >
             {showNutrition ? <X size={18} /> : <Info size={18} />}
          </button>

          {/* Nutrition Overlay */}
          <AnimatePresence>
            {showNutrition && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-20 bg-brand-royal/90 p-8 flex flex-col justify-center text-white"
              >
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h4 className="font-serif text-3xl text-brand-gold mb-6 italic">Facts</h4>
                  <div className="space-y-4 font-light text-sm">
                    {Object.entries(product.nutrition).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                        <span className="capitalize text-gray-300">{key}</span>
                        <span className="font-serif text-lg">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Dots */}
          {!showNutrition && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`cursor-pointer h-1 rounded-full transition-all duration-500 ${
                    activeImage === index 
                      ? 'w-6 bg-brand-gold shadow-[0_0_10px_#D4AF37]' 
                      : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- CONTENT AREA (The Paper Effect) --- */}
        <div className="relative z-20 -mt-8 bg-white rounded-t-[2.5rem] p-8 flex flex-col flex-grow shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          
          <div className="flex justify-between items-start mb-2">
             <div className="w-2/3">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-royal leading-tight">
                  {product.title}
                </h3>
             </div>
             <div className="text-right">
                {product.oldPrice && <p className="text-xs text-gray-400 line-through">₹{product.oldPrice}</p>}
                <p className="font-serif text-3xl font-bold text-brand-royal">₹{product.price}</p>
             </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_,i) => <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />)}
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
             {product.description}
          </p>

          {/* --- INGREDIENTS (Restored & Enhanced) --- */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cream border border-brand-gold/20 text-brand-royal text-[10px] font-bold uppercase tracking-wide shadow-sm hover:border-brand-gold transition-colors">
                <Leaf size={10} className="text-brand-gold" /> 
                {ing}
              </span>
            ))}
          </div>

          {/* Liquid Gold Button */}
          <div className="mt-auto">
             <button className="relative w-full overflow-hidden rounded-xl bg-brand-royal py-4 text-white font-serif tracking-wide group/btn shadow-lg hover:shadow-brand-royal/40 transition-all duration-300 active:scale-95">
                {/* Gradient Swipe Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <span className="relative flex items-center justify-center gap-2 group-hover/btn:gap-3 transition-all duration-300">
                   Add to Cart <ShoppingCart size={16} />
                </span>
             </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}