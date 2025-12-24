import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Decor (Animated Blobs) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, -45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-royal/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none" 
      />

      <div className="max-w-2xl w-full text-center relative z-10">
        
        {/* Floating Icon */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border border-brand-gold/20"
        >
          <Clock size={40} className="text-brand-gold" />
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl font-bold text-brand-royal mb-6"
        >
          Coming <span className="text-brand-gold">Soon</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto"
        >
          We are crafting something special for you. This page is currently in the kitchen being prepared with love and pure ingredients.
        </motion.p>

        {/* Notification Box */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 mb-10 text-sm text-gray-400"
        >
          <Sparkles size={16} className="text-brand-gold" />
          <span>Launch expected very soon</span>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-royal text-white px-8 py-4 rounded-xl font-medium hover:bg-brand-gold hover:text-brand-royal transition-all duration-300 shadow-lg active:scale-95 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}