import React from 'react';
import { Book } from '../types';
import { Star, Plus, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onClick: (book: Book) => void;
  onReadSample: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, onClick, onReadSample }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-200 relative cursor-pointer" onClick={() => onClick(book)}>
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
        
        {/* Hover overlay for quick sample access */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center bg-gradient-to-t from-black/60 to-transparent">
           <button
             onClick={(e) => {
               e.stopPropagation();
               onReadSample(book);
             }}
             className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-white flex items-center"
           >
             <BookOpen className="h-3 w-3 mr-1" /> Read Sample
           </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            {book.category}
          </span>
          <div className="flex items-center text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-xs font-medium text-slate-600">{book.rating}</span>
          </div>
        </div>

        <h3 
          className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 cursor-pointer hover:text-indigo-600"
          onClick={() => onClick(book)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">{book.author}</p>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2" title={book.description}>
          {book.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
          
          <div className="flex space-x-2">
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onReadSample(book);
               }}
               className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
               title="Free Sample"
             >
                <BookOpen className="h-5 w-5" />
             </button>
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 onAddToCart(book);
               }}
               className="p-2 bg-slate-100 text-slate-900 rounded-full hover:bg-indigo-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               aria-label="Add to cart"
             >
               <Plus className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;