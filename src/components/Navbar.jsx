import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Ensure Link is imported here
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // --- FIX: Added the missing function here ---
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    // If we are on the Home page, just scroll down
    if (location.pathname === '/') {
        const section = document.getElementById('shop');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate('/');
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-royal/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Animated Brand Logo */}
        <Link to="/" onClick={handleHomeClick} className="group relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-start"
          >
            <div className="border-2 border-brand-gold px-3 py-1 rounded-lg">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wider group-hover:text-brand-gold transition-colors">
                Baba<span className="text-brand-gold">Ji</span>
                </h1>
            </div>
            <span className="text-[10px] text-brand-gold tracking-[0.3em] uppercase mt-1 ml-1 font-sans">
              Foods & Snacks
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-white/90 font-sans text-sm tracking-widest uppercase">
          
          <Link 
            to="/" 
            onClick={handleHomeClick} 
            className="hover:text-brand-gold relative group transition-colors"
          >
            Home
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <a 
            href="#shop" 
            onClick={handleShopClick}
            className="hover:text-brand-gold relative group transition-colors cursor-pointer"
          >
            Shop
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </a>

          <Link 
            to="/about" 
            className="hover:text-brand-gold relative group transition-colors"
          >
            Our Story
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* Icons */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <div className="relative group cursor-pointer">
            <ShoppingBag className="text-white group-hover:text-brand-gold transition-colors" size={24} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-royal text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-brand-royal border-t border-white/10 p-6 flex flex-col space-y-4 shadow-xl"
        >
            <Link to="/" onClick={handleHomeClick} className="text-white hover:text-brand-gold text-lg tracking-wide">Home</Link>
            <a href="#shop" onClick={handleShopClick} className="text-white hover:text-brand-gold text-lg tracking-wide">Shop</a>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-white hover:text-brand-gold text-lg tracking-wide">Our Story</Link>
        </motion.div>
      )}
    </nav>
  );
}