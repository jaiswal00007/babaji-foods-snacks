import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle "Home" click: Scroll to top if on home, otherwise navigate home
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Handle "Shop" click: Scroll to #shop section if on home
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

  return (
    <footer className="bg-brand-royal text-gray-300 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            Baba<span className="text-brand-gold">Ji</span> Foods
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium authentic snacks made with love, pure ghee, and dry fruits.
          </p>
          <div className="mt-4 border-t border-white/10 pt-4">
             <p className="text-xs text-gray-500">FSSAI Registration No:</p>
             <p className="text-brand-gold font-mono">22825144000732</p>
          </div>
        </div>

        {/* Quick Links (Fixed) */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" onClick={handleHomeClick} className="hover:text-brand-gold transition cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <a href="#shop" onClick={handleShopClick} className="hover:text-brand-gold transition cursor-pointer">
                Shop Now
              </a>
            </li>
            <li>
              <Link to="/terms" className="hover:text-brand-gold transition cursor-pointer">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2">
          <h4 className="font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-4 text-sm">
            
            <div className="flex items-start space-x-3">
              <MapPin className="text-brand-gold mt-1 flex-shrink-0" size={18} />
              <p>D-3/8 Max Muller Path, Non-Comp Housings, <br /> City Center, Durgapur, Pin-713216</p>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="text-brand-gold flex-shrink-0" size={18} />
              <p>+91 8509414376</p>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-brand-gold flex-shrink-0" size={18} />
              <p>babajifoodsnacks@gmail.com</p>
            </div>

            <div className="flex items-center space-x-3">
              <Instagram className="text-brand-gold flex-shrink-0" size={18} />
              <p>@babaji_foods_and_snacks</p>
            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
        &copy; 2025 Babaji Foods & Snacks. All Rights Reserved.
      </div>
    </footer>
  );
}