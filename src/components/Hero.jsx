import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
// --- FIX: Change this import to react-router-dom so it works without extra install ---
import { Link } from 'react-router-dom';

export default function Hero() {
  // Simple JavaScript scroll function
  const scrollToShop = () => {
    const section = document.getElementById('shop');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center scale-110 animate-float"
            style={{ backgroundImage: 'url("/assets/thekua-pile.jpg")' }} 
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-royal/80 via-brand-royal/60 to-brand-royal/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-gold tracking-[0.4em] uppercase text-xs md:text-sm font-bold border border-brand-gold/30 px-6 py-2 rounded-full backdrop-blur-sm">
            Est. 2025 • Authentic Taste
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-5xl md:text-8xl font-bold text-white mt-8 mb-6 leading-tight"
        >
          Experience the <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">
            Royal Taste
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12"
        >
          Handcrafted Thekua made with pure Ghee, premium Dry Fruits, and an heirloom recipe passed down through generations.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button 
            onClick={scrollToShop}
            className="group bg-brand-gold text-brand-royal px-10 py-4 rounded-full font-bold transition-all hover:bg-white hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
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