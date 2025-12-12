import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import CartDrawer from './components/CartDrawer';
import AIRecommender from './components/AIRecommender';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import SampleReaderModal from './components/SampleReaderModal';
import { MOCK_BOOKS } from './constants';
import { Book, CartItem, User } from './types';
import { BookOpen, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [catalog, setCatalog] = useState<Book[]>(MOCK_BOOKS);
  const [filteredCatalog, setFilteredCatalog] = useState<Book[]>(MOCK_BOOKS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // For Details Modal
  const [samplingBook, setSamplingBook] = useState<Book | null>(null); // For Sample Reader

  // Cart Calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = catalog.filter(book => 
      book.title.toLowerCase().includes(lowerQuery) || 
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredCatalog(filtered);
  };

  const handleAddToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    // Could add a toast notification here
  };
  
  const handleViewDetails = (book: Book) => {
      setSelectedBook(book);
  };

  const handleReadSample = (book: Book) => {
    setSamplingBook(book);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={() => setUser(null)}
        onHomeClick={() => {
            setFilteredCatalog(catalog);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / AI Section */}
        <AIRecommender 
          catalog={catalog}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          onReadSample={handleReadSample}
        />

        {/* Main Catalog Header */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-indigo-600" />
                Featured Collection
            </h2>
            <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                Showing {filteredCatalog.length} titles
            </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCatalog.length > 0 ? (
            filteredCatalog.slice(0, 24).map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onAddToCart={handleAddToCart}
                onClick={handleViewDetails}
                onReadSample={handleReadSample}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              No books found matching your search.
            </div>
          )}
        </div>
        
        {filteredCatalog.length > 24 && (
            <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                    Load More Titles
                </button>
                <p className="mt-2 text-xs text-slate-400">1000+ books available in catalog</p>
            </div>
        )}

      </main>

      {/* Modals & Drawers */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
        }}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={setUser}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        user={user}
        total={cartTotal}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Sample Reader Modal */}
      {samplingBook && (
        <SampleReaderModal 
          book={samplingBook}
          onClose={() => setSamplingBook(null)}
        />
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedBook(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                 <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-slate-900 transition-all">
                    <AlertCircle className="h-6 w-6 rotate-45" />
                 </button>

                 <div className="w-full md:w-1/3 h-64 md:h-auto bg-slate-100 relative">
                    <img src={selectedBook.coverUrl} className="w-full h-full object-cover" alt={selectedBook.title} />
                 </div>
                 
                 <div className="w-full md:w-2/3 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-auto">
                        <div className="flex items-center space-x-2 text-sm text-indigo-600 font-bold uppercase tracking-wider mb-2">
                             <span>{selectedBook.category}</span>
                             <span>•</span>
                             <span>{selectedBook.rating} ★</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedBook.title}</h2>
                        <h3 className="text-xl text-slate-600 mb-6">{selectedBook.author}</h3>
                        
                        <p className="text-slate-700 leading-relaxed mb-8">
                            {selectedBook.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-4">
                        <div className="text-3xl font-bold text-slate-900">${selectedBook.price.toFixed(2)}</div>
                        <div className="flex gap-3">
                           <button
                             onClick={() => {
                               handleReadSample(selectedBook);
                               setSelectedBook(null); // Close details to open sample
                             }}
                             className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
                           >
                             Read Sample
                           </button>
                           <button 
                               onClick={() => {
                                   handleAddToCart(selectedBook);
                                   setSelectedBook(null);
                               }}
                               className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                           >
                               Add to Cart
                           </button>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;