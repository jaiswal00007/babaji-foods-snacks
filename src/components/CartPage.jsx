import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [orderNote, setOrderNote] = useState("");

  const handleCheckout = () => {
    const phoneNumber = "918509414376"; 
    
    const itemList = cart.map(item => 
      `• ${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`
    ).join('%0a');

    const noteSection = orderNote ? `%0a%0a*📝 Note:* ${orderNote}` : "";

    const message = `*New Order Request* 🛒%0a%0a` +
                    `*Items:*%0a${itemList}` +
                    `${noteSection}%0a%0a` + 
                    `*Total Amount:* ₹${cartTotal}%0a%0a` +
                    `------------------%0a` +
                    `I would like to confirm this order.`;

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Stagger the rows
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-6 bg-brand-cream">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white p-8 rounded-full shadow-xl mb-6"
        >
          <ShoppingBag size={64} className="text-brand-gold" />
        </motion.div>
        <h2 className="text-3xl font-serif font-bold text-brand-royal mb-4">Your cart is empty</h2>
        <Link 
          to="/" 
          className="bg-brand-royal text-white px-8 py-3 rounded-full font-medium hover:bg-brand-gold hover:text-brand-royal transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-brand-cream">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-brand-royal/10 pb-4">
          <motion.h1 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-4xl md:text-5xl font-serif font-bold text-brand-royal"
          >
            Your Cart
          </motion.h1>
          <Link to="/" className="text-brand-gold font-medium hover:underline flex items-center gap-2">
             <ArrowLeft size={16} /> Continue shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* --- LEFT: CART ITEMS LIST --- */}
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Table Header (Hidden on mobile) */}
            <div className="hidden md:grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout // Smooth reordering
                    variants={rowVariants}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-brand-royal">{item.title}</h3>
                        <p className="text-brand-gold text-sm font-medium">₹{item.price}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-200 rounded-l-lg text-brand-royal">
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium text-brand-royal">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-200 rounded-r-lg text-brand-royal">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="col-span-1 md:col-span-3 text-left md:text-right font-bold text-lg text-brand-royal">
                      ₹{item.price * item.quantity}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Note Area - also animated */}
            <motion.div variants={rowVariants} className="mt-12">
              <label className="block font-serif text-lg font-bold text-brand-royal mb-3">
                Order special instructions
              </label>
              <textarea 
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="E.g. Please pack separately, deliver after 5 PM, etc."
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none bg-white h-32 resize-none"
              />
            </motion.div>
          </motion.div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-brand-gold/10 sticky top-32">
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Estimated total</span>
                <span className="font-serif text-3xl font-bold text-brand-royal">₹{cartTotal}</span>
              </div>
              
              <p className="text-xs text-gray-400 mb-8 leading-relaxed">
                Taxes, discounts and shipping calculated at checkout (via WhatsApp).
              </p>

              <button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group hover:bg-[#128C7E] transition-all duration-300 shadow-lg active:scale-95"
              >
                Order on WhatsApp
                <MessageCircle size={20} />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Secure Checkout
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}