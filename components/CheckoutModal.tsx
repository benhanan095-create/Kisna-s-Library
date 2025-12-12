import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Mail, Loader2, ShieldCheck } from 'lucide-react';
import { CartItem, User } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: User | null;
  onSuccess: () => void;
  total: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  user,
  onSuccess,
  total
}) => {
  const [step, setStep] = useState<'review' | 'payment' | 'processing' | 'success'>('review');
  const [email, setEmail] = useState(user?.email || '');
  
  // Payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate API call delay for payment and email
    setTimeout(() => {
      setStep('success');
      // Auto close after success
      setTimeout(() => {
        onSuccess();
        setStep('review'); // Reset for next time (though unmounted usually)
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={step !== 'processing' ? onClose : undefined} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">
            {step === 'success' ? 'Order Confirmed' : 'Checkout'}
          </h2>
          {step !== 'processing' && step !== 'success' && (
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {step === 'review' && (
            <div className="space-y-6">
               <div>
                <h3 className="text-lg font-medium text-slate-900 mb-4">Order Summary</h3>
                <div className="bg-slate-50 rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.title} <span className="text-xs text-slate-400">x{item.quantity}</span></span>
                      <span className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Contact Information</h3>
                <p className="text-sm text-slate-500 mb-2">Where should we send your receipt and books?</p>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  if (email) setStep('payment');
                  else alert("Please enter an email address.");
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
             <form onSubmit={handlePay} className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-900">Payment Details</h3>
                  <div className="flex space-x-2">
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                    <input 
                      type="text" 
                      required 
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                      <input 
                        type="text" 
                        required 
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value.replace(/\D/g,'').slice(0,16))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        required 
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                      <input 
                        type="text" 
                        required 
                        value={cvc}
                        onChange={e => setCvc(e.target.value.slice(0,3))}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-500 py-2">
                   <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                   Payments are secure and encrypted.
                </div>

                <div className="flex space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setStep('review')}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex justify-center"
                  >
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
             </form>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in duration-500">
              <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
              <h3 className="text-xl font-medium text-slate-900">Processing Payment...</h3>
              <p className="text-slate-500">Please do not close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in zoom-in-95 duration-500 text-center">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Purchase Successful!</h3>
                <p className="text-slate-600">Thank you for your order.</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start text-left max-w-sm w-full">
                 <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                 <div>
                   <p className="font-medium text-blue-900">Email Sent</p>
                   <p className="text-sm text-blue-700 mt-1">
                     A confirmation email with your receipt has been automatically sent to <strong>{email}</strong>.
                   </p>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
