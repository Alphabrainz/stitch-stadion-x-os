import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useToastStore } from '../../store/useToastStore';
import { useStadionStore } from '../../store/useStadionStore';

const menuItems = [
  { id: 1, name: 'Stadium Classic Burger', price: 450, category: 'Food', wait: '5 min' },
  { id: 2, name: 'Golden Fries', price: 200, category: 'Food', wait: '2 min' },
  { id: 3, name: 'Craft Beer (Pint)', price: 350, category: 'Drinks', wait: '1 min' },
  { id: 4, name: 'Sparkling Water', price: 100, category: 'Drinks', wait: '1 min' }
];

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  wait: string;
}

export const FoodOrdering: React.FC = () => {
  const [cart, setCart] = useState<{item: MenuItem, qty: number}[]>([]);
  const { addToast } = useToastStore();
  const { orders, updateOrderStatus } = useStadionStore();

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { item, qty: 1 }];
    });
    addToast(`Added ${item.name} to cart`, 'info');
  };

  const total = cart.reduce((sum, current) => sum + (current.item.price * current.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Add to global ops store
    useStadionStore.getState().addOrder({
      items: cart.map(c => ({ name: c.item.name, qty: c.qty, price: c.item.price })),
      total
    });
    
    addToast('Order placed successfully! ARC will notify you when it is ready.', 'success');
    setCart([]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-left-8 duration-500">
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-primary mb-2">Express Concessions</h2>
          <p className="text-secondary">Order now, skip the queue.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map(item => (
            <GlassCard key={item.id} className="p-4 flex flex-col justify-between group hover:border-primary/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white text-lg">{item.name}</h4>
                  <p className="text-secondary text-sm">{item.category}</p>
                </div>
                <p className="font-mono text-primary font-bold text-xl">₹{item.price}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> {item.wait}</span>
                <Button size="sm" onClick={() => addToCart(item)}>Add</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-6">
          <h3 className="font-display text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-4">Your Order</h3>
          
          {cart.length === 0 ? (
            <p className="text-secondary text-center py-8">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((cartItem, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center font-mono">{cartItem.qty}</span>
                    <span className="text-white">{cartItem.item.name}</span>
                  </div>
                  <span className="font-mono text-primary">₹{cartItem.item.price * cartItem.qty}</span>
                </div>
              ))}
              
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="font-mono text-primary">₹{total}</span>
              </div>
              
              <Button className="w-full mt-4" onClick={handleCheckout}>Pay with Card</Button>
            </div>
          )}
        </GlassCard>

        {/* Drone Delivery Tracker */}
        {orders.length > 0 && (
          <GlassCard className="p-0 overflow-hidden relative">
            <div className="bg-black/60 p-6 border-b border-white/10 relative z-10">
              <h3 className="font-display text-xl font-bold uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined animate-pulse">flight</span>
                Drone Delivery Tracker
              </h3>
              <p className="text-secondary text-xs">Live tracking from Concession to Sector 204</p>
            </div>
            
            <div className="p-6 space-y-6 relative z-10 bg-black/40">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="bg-white/5 rounded-xl p-5 border border-white/10 group hover:border-primary/50 transition-colors relative overflow-hidden shadow-2xl">
                  
                  {/* Map Background for tracking */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524850301259-7729d41d11d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
                  
                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <div>
                      <span className="text-white font-mono text-sm block mb-1">Order {order.id}</span>
                      <span className="text-xs text-secondary">{order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg
                      ${order.status === 'Preparing' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                        order.status === 'Ready' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                        'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                      {order.status === 'Preparing' ? 'Cooking...' : order.status === 'Ready' ? 'Drone Inbound' : 'Delivered'}
                    </span>
                  </div>
                  
                  {/* Drone Progress Bar */}
                  {order.status !== 'Delivered' && (
                    <div className="relative w-full h-1 bg-white/10 rounded-full mt-8 mb-4">
                      {/* Animated Progress line */}
                      <div className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${order.status === 'Preparing' ? 'w-1/4 bg-orange-500' : 'w-3/4 bg-blue-500'}`}></div>
                      
                      {/* Drone Icon */}
                      <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ${order.status === 'Preparing' ? 'left-1/4' : 'left-3/4'}`}>
                        <div className="relative">
                          <span className="material-symbols-outlined text-[24px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">flight</span>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-white/20">
                            {order.status === 'Preparing' ? 'ETA 4m' : 'ETA 1m'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Dots */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
                    </div>
                  )}

                  {/* Demo Controls */}
                  {order.status !== 'Delivered' && (
                    <div className="mt-8 relative z-10">
                      <button 
                        onClick={() => updateOrderStatus(order.id, order.status === 'Preparing' ? 'Ready' : 'Delivered')}
                        className="w-full text-[10px] bg-black/50 border border-white/20 hover:bg-primary/20 hover:border-primary/50 text-white/50 hover:text-primary py-2 rounded-lg transition-all uppercase tracking-widest font-bold"
                      >
                        (Demo) Advance Drone Status
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
};
