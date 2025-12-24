import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- FIX IS HERE: You were missing 'openCart' ---
  const { cartCount, openCart } = useCart(); 

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold origin-left z-[110]"
        style={{ scaleX }}
      />

      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-brand-royal/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
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

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            {/* Now 'openCart' is defined, so this won't crash */}
            <div onClick={openCart} className="relative group cursor-pointer">
              <ShoppingBag className="text-white group-hover:text-brand-gold transition-colors" size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-royal text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </motion.div>
        </div>

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
    </>
  );
}