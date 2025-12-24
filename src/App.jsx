import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import ScrollToTop from "./components/ScrollToTop";

// Simple pages components (You can move these to src/pages/ later)
const HomePage = () => (
  <>
    <Hero />
    <ProductList />
    <section className="bg-red-50 py-16 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-brand-red mb-4">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg mb-2">100% Homemade</h3>
            <p className="text-gray-600 text-sm">Made by local chefs using traditional recipes.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg mb-2">Pure Ghee</h3>
            <p className="text-gray-600 text-sm">We use only premium cow ghee for that authentic aroma.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg mb-2">No Preservatives</h3>
            <p className="text-gray-600 text-sm">Freshly baked upon order. Zero chemicals.</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ShopPage = () => (
  <div className="pt-10">
    <ProductList />
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Navbar />
        
        {/* Main Content Grows to fill space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            {/* Add placeholder routes for now */}
            <Route path="*" element={<div className="text-center py-20">Page Coming Soon</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;