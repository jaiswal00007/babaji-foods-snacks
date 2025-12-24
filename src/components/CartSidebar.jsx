import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    const phoneNumber = "918509414376"; 
    const itemList = cart.map(item => 
      `• ${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`
    ).join('%0a');

    const message = `*New Order Request* 🛒%0a%0a` +
                    `*Items:*%0a${itemList}%0a%0a` +
                    `*Total Amount:* ₹${cartTotal}%0a%0a` +
                    `------------------%0a` +
                    `I would like to confirm this order.`;

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-royal text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="font-serif text-xl font-bold">Your Cart</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={closeCart} className="text-brand-gold font-medium hover:underline">Start Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div layout key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-brand-royal">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{item.quantity} x ₹{item.price}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-8">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full hover:bg-gray-200 rounded-l-lg text-brand-royal">-</button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full hover:bg-gray-200 rounded-r-lg text-brand-royal">+</button>
                        </div>
                        <p className="text-brand-gold font-bold ml-auto">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500">Total</span>
                  <span className="font-serif text-2xl font-bold text-brand-royal">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  Order on WhatsApp
                  <MessageCircle size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}