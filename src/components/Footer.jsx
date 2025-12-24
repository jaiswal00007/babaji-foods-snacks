import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const section = document.getElementById('shop');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <footer className="bg-brand-royal text-gray-300 py-12 border-t border-white/10 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // --- CHANGE: Set once: false to animate every time you scroll here ---
        viewport={{ once: false, amount: 0.3 }} 
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >

        {/* --- 1. BRAND INFO --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-serif font-bold text-white mb-4 leading-none">
            Baba<span className="text-brand-gold">Ji</span> Foods
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium authentic snacks made with love, pure ghee, and dry fruits.
          </p>
          <div className="mt-4 border-t border-white/10 pt-4">
             <p className="text-xs text-gray-500">FSSAI Registration No:</p>
             <p className="text-brand-gold font-mono tracking-wide">22825144000732</p>
          </div>
        </motion.div>

        {/* --- 2. QUICK LINKS --- */}
        <motion.div variants={itemVariants}>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" onClick={handleHomeClick} className="hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group w-fit">
                <span className="w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home
              </a>
            </li>
            <li>
              <a href="#shop" onClick={handleShopClick} className="hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group w-fit">
                <span className="w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Shop Now
              </a>
            </li>
            <li>
              <Link to="/terms" className="hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group w-fit">
                <span className="w-1 h-1 bg-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* --- 3. CONTACT INFO --- */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <h4 className="font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-4 text-sm">
            
            {/* Address */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=D-3/8+Max+Muller+Path,+City+Center,+Durgapur,+Pin-713216" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start space-x-3 group hover:text-white transition-colors duration-300"
            >
              <MapPin className="text-brand-gold mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <p className="group-hover:text-brand-gold transition-colors">
                D-3/8 Max Muller Path, Non-Comp Housings, <br /> City Center, Durgapur, Pin-713216
              </p>
            </a>

            {/* Phone */}
            <a 
              href="tel:+918509414376" 
              className="flex items-center space-x-3 group hover:text-white transition-colors duration-300 w-fit"
            >
              <Phone className="text-brand-gold flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <p className="group-hover:text-brand-gold transition-colors">+91 8509414376</p>
            </a>

            {/* Email */}
            <a 
              href="mailto:babajifoodsnacks@gmail.com" 
              className="flex items-center space-x-3 group hover:text-white transition-colors duration-300 w-fit"
            >
              <Mail className="text-brand-gold flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <p className="group-hover:text-brand-gold transition-colors">babajifoodsnacks@gmail.com</p>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/babaji_foods_and_snacks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 group hover:text-white transition-colors duration-300 w-fit"
            >
              <Instagram className="text-brand-gold flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
              <p className="group-hover:text-brand-gold transition-colors">@babaji_foods_and_snacks</p>
            </a>

          </div>
        </motion.div>

      </motion.div>

    {/* Copyright & Developer - Centered Layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-3"
      >
        {/* Brand Copyright */}
        <p className="text-gray-500 text-sm tracking-wide">
          © 2025 Babaji Foods & Snacks. All Rights Reserved.
        </p>

        {/* Developer Credit - Subtle & Elegant */}
        <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 hover:border-brand-gold/30 transition-colors">
          <span className="font-light">Designed & Developed by</span>
          <a 
            href="https://www.linkedin.com/in/anshu-jaiswal-a76b192b7/" // Add your portfolio/LinkedIn link here
            className="text-brand-gold font-bold tracking-wider hover:text-white transition-colors uppercase"
          >
            Anshu Jaiswal
          </a>
        </div>
      </motion.div>
    </footer>
  );
}