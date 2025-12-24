import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowUp } from 'lucide-react'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import ScrollToTop from "./components/ScrollToTop"; 
import CartPage from "./components/CartPage";
import CartSidebar from "./components/CartSidebar"; // <--- IMPORT THIS
import { CartProvider } from "./context/CartContext";

const FeatureCard = ({ title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.9 }} 
    whileInView={{ opacity: 1, y: 0, scale: 1 }} 
    viewport={{ once: false, amount: 0.3 }} 
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ 
      y: -8, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 } 
    }}
    className="h-full p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100 flex flex-col will-change-transform"
  >
    <div className="w-12 h-1 bg-brand-gold mb-6 rounded-full"></div>
    <h3 className="font-serif font-bold text-2xl mb-4 text-brand-royal">{title}</h3>
    <p className="text-gray-500 font-light leading-relaxed flex-grow">{desc}</p>
  </motion.div>
);

const HomePage = () => (
  <>
    <Hero />
    <ProductList />
    <section className="bg-brand-cream py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-brand-royal mb-6"
          >
            Why Choose <span className="text-brand-gold">BabaJi?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-light"
          >
            We don't just sell snacks; we deliver a box of nostalgia, purity, and tradition to your doorstep.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          <FeatureCard 
            title="100% Homemade" 
            desc="No factory machines. Handmade by local chefs using traditional recipes passed down for decades."
            delay={0.1} 
          />
          <FeatureCard 
            title="Pure Cow Ghee" 
            desc="We use only premium A2 Cow Ghee for that authentic aroma and rich taste you can't find elsewhere."
            delay={0.2} 
          />
          <FeatureCard 
            title="No Preservatives" 
            desc="Freshly baked upon order. Zero chemicals, zero preservatives. Just pure, natural ingredients."
            delay={0.3} 
          />
        </div>
      </div>
    </section>
  </>
);

const ShopPage = () => (
  <div className="pt-24">
    <ProductList />
  </div>
);

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-brand-cream font-sans text-brand-royal overflow-x-hidden">
          <Navbar />
          
          {/* --- SIDEBAR MUST BE HERE --- */}
          <CartSidebar /> 
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<div className="text-center py-40 text-xl">Page Not Found</div>} />
            </Routes>
          </main>

          <Footer />

          <AnimatePresence>
            {showTopBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToTop}
                className="fixed bottom-8 right-8 z-50 bg-brand-gold text-brand-royal p-4 rounded-full shadow-2xl hover:bg-white transition-colors duration-300 border border-brand-royal/10"
              >
                <ArrowUp size={24} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;