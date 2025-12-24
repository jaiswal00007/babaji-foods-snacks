import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const scrollToShop = () => {
    const section = document.getElementById('shop');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background (Parallax & Zoom) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/assets/thekua-pile.jpg")' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-royal/90 via-brand-royal/50 to-brand-royal/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-brand-gold tracking-[0.4em] uppercase text-xs md:text-sm font-bold border border-brand-gold/30 px-6 py-2 rounded-full backdrop-blur-sm mb-6">
            Est. 2025 • Authentic Taste
          </span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-5xl md:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Experience the <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold animate-pulse">
            Royal Taste
          </span>
        </motion.h1>

        {/* Animated Description */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Handcrafted Thekua made with pure <span className="text-white font-medium">Ghee</span>, premium <span className="text-white font-medium">Dry Fruits</span>, and an heirloom recipe passed down through generations.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button 
            onClick={scrollToShop}
            className="group bg-brand-gold text-brand-royal px-10 py-4 rounded-full font-bold transition-all hover:bg-white hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          >
            Order Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <Link to="/about" className="px-10 py-4 rounded-full font-medium text-white border border-white/30 hover:bg-white/10 transition backdrop-blur-sm flex items-center justify-center">
            View Ingredients
          </Link>
        </motion.div>

      </div>
    </section>
  );
}