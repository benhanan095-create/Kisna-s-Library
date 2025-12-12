import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-4 py-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Your Cart ({items.length})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-slate-100 p-6 rounded-full">
                  <ShoppingBag className="h-12 w-12 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-slate-900">Your cart is empty</h3>
                  <p className="text-slate-500">Looks like you haven't added any books yet.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-slate-900">
                      <h3 className="line-clamp-2 pr-4">{item.title}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{item.author}</p>
                    
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-slate-300 rounded-md">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 px-2 hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 font-medium text-slate-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 px-2 hover:bg-slate-100 text-slate-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="font-medium text-red-600 hover:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-4">
              <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
