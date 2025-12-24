import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // --- WHATSAPP CHECKOUT LOGIC ---
  const handleCheckout = () => {
    const phoneNumber = "918509414376"; // Your Business Number
    
    // 1. Create a readable list of items
    const itemList = cart.map(item => 
      `• ${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`
    ).join('%0a'); // %0a is a line break for WhatsApp URLs

    // 2. Construct the message
    const message = `*New Order Request* 🛒%0a%0a` +
                    `*Items:*%0a${itemList}%0a%0a` +
                    `*Total Amount:* ₹${cartTotal}%0a%0a` +
                    `------------------%0a` +
                    `I would like to confirm this order.`;

    // 3. Open WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-full shadow-xl mb-6"
        >
          <ShoppingBag size={64} className="text-brand-gold" />
        </motion.div>
        <h2 className="text-3xl font-serif font-bold text-brand-royal mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any delicious snacks yet.</p>
        <Link 
          to="/" 
          className="bg-brand-royal text-white px-8 py-3 rounded-full font-medium hover:bg-brand-gold hover:text-brand-royal transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-royal mb-12 text-center">
        Your Selection
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-center group hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-bold text-brand-royal">{item.title}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-brand-gold font-bold mb-4">₹{item.price}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-brand-gold transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-brand-gold transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-brand-gold/10 sticky top-32">
            <h3 className="font-serif text-2xl font-bold text-brand-royal mb-8">Order Summary</h3>
            
            <div className="space-y-4 text-sm text-gray-600 mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-brand-royal">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>Included</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between text-lg font-bold text-brand-royal">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 group hover:bg-[#128C7E] transition-all duration-300 shadow-lg"
            >
              Order on WhatsApp
              <MessageCircle size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Fast & Secure Order
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}