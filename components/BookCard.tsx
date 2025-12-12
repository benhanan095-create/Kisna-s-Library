import React from 'react';
import { Book } from '../types';
import { Star, ShoppingCart, BookOpen, Zap } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onClick: (book: Book) => void;
  onReadSample: (book: Book) => void;
  onBuyNow: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, onClick, onReadSample, onBuyNow }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      {/* Cover Image */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-200 relative cursor-pointer" onClick={() => onClick(book)}>
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
        
        {/* Sample Button Overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button
             onClick={(e) => {
               e.stopPropagation();
               onReadSample(book);
             }}
             className="bg-white/90 backdrop-blur p-1.5 rounded-full shadow-md hover:bg-white text-indigo-600"
             title="Read Sample"
           >
             <BookOpen className="h-4 w-4" />
           </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
            {book.category}
          </span>
          <div className="flex items-center text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-0.5 text-[10px] font-bold text-slate-600">{book.rating}</span>
          </div>
        </div>

        <h3 
          className="text-base font-bold text-slate-900 mb-0.5 line-clamp-1 cursor-pointer hover:text-indigo-600 leading-tight"
          onClick={() => onClick(book)}
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 mb-1.5 line-clamp-1">{book.author}</p>
        
        <p className="text-[11px] text-slate-600 mb-3 line-clamp-2 leading-relaxed h-8" title={book.description}>
          {book.description}
        </p>
        
        {/* Actions Footer */}
        <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-slate-900">${book.price.toFixed(2)}</span>
          
          <div className="flex items-center gap-1.5">
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 onAddToCart(book);
               }}
               className="p-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
               title="Add to Cart"
             >
               <ShoppingCart className="h-4 w-4" />
             </button>
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onBuyNow(book);
               }}
               className="flex items-center px-2.5 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
               title="Buy Now"
             >
                <Zap className="h-3 w-3 mr-1 fill-current" />
                Buy
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;