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
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2, // Stagger effect based on index
        ease: [0.25, 1, 0.5, 1] // "Luxury" ease curve
      }}
      className="group relative w-full h-full perspective-1000"
    >
      {/* --- FLOATING SHADOW (Appears on Hover) --- */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/30 to-brand-royal/30 rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 flex flex-col hover:border-brand-gold/30 transition-colors duration-500"
      >
        
        {/* --- SPOTLIGHT EFFECT LAYER --- */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(212, 175, 55, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        {/* --- IMAGE AREA --- */}
        <div className="relative h-[450px] overflow-hidden bg-gray-50">
          <AnimatePresence mode='wait'>
            <motion.img
              key={activeImage}
              initial={{ scale: 1.15, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              src={product.images[activeImage]}
              alt={product.title}
              className="w-full h-full object-cover will-change-transform"
            />
          </AnimatePresence>

          {/* Cinematic Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

          {/* Floating Glass Tag */}
          {product.tag && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-2 px-4 py-2">
                <Sparkles size={12} className="text-brand-gold animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                  {product.tag}
                </span>
              </div>
            </motion.div>
          )}

          {/* Info Button */}
          <button 
            onClick={() => setShowNutrition(!showNutrition)}
            className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-brand-gold hover:text-brand-royal transition-all duration-300 group/btn"
          >
             <div className="relative">
                {showNutrition ? <X size={18} /> : <Info size={18} />}
             </div>
          </button>

          {/* Nutrition Panel (Frosted Glass) */}
          <AnimatePresence>
            {showNutrition && (
              <motion.div 
                initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
                animate={{ backdropFilter: "blur(15px)", opacity: 1 }}
                exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
                className="absolute inset-0 z-20 bg-brand-royal/90 p-8 flex flex-col justify-center text-white"
              >
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
                  <h4 className="font-serif text-3xl text-brand-gold mb-8 italic">Nutrition Facts</h4>
                  <div className="space-y-6 font-light">
                    {Object.entries(product.nutrition).map(([key, value], idx) => (
                      <div key={key} className="flex justify-between border-b border-white/10 pb-3">
                        <span className="capitalize text-gray-300">{key}</span>
                        <span className="font-serif text-xl">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Dots */}
          {!showNutrition && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`cursor-pointer h-1 rounded-full transition-all duration-700 ease-out ${
                    activeImage === index 
                      ? 'w-8 bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]' 
                      : 'w-1.5 bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* --- CONTENT AREA (Overlapping Paper Effect) --- */}
        <div className="relative z-20 -mt-8 bg-white rounded-t-[2.5rem] p-8 flex flex-col flex-grow shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="font-serif text-3xl font-bold text-brand-royal leading-none mb-2">
                  {product.title}
                </h3>
                <div className="flex gap-1">
                   {[...Array(5)].map((_,i) => <Star key={i} size={12} className="text-brand-gold fill-brand-gold" />)}
                </div>
             </div>
             <div className="text-right">
                {product.oldPrice && <p className="text-xs text-gray-400 line-through">₹{product.oldPrice}</p>}
                <p className="font-serif text-3xl font-bold text-brand-royal">₹{product.price}</p>
             </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
             {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-brand-cream border border-brand-gold/10 text-[10px] font-bold uppercase tracking-wide text-brand-royal flex items-center gap-1">
                <Leaf size={10} className="text-brand-gold" /> {ing}
              </span>
            ))}
          </div>

          {/* Magnetic Hover Button */}
          <div className="mt-auto">
             <button className="relative w-full overflow-hidden rounded-xl bg-brand-royal py-4 text-white font-serif tracking-wide group/btn shadow-lg transition-transform active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2 group-hover/btn:gap-4 transition-all duration-300">
                   Add to Cart <ShoppingCart size={16} />
                </span>
             </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}