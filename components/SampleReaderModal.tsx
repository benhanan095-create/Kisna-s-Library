import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Book } from '../types';

interface SampleReaderModalProps {
  book: Book;
  onClose: () => void;
}

const SampleReaderModal: React.FC<SampleReaderModalProps> = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  // Reset page when book changes
  useEffect(() => {
    setCurrentPage(1);
  }, [book.id]);

  // Generate pseudo-content based on page number to simulate a real book
  const getPageContent = (page: number) => {
    if (page === 1) {
      return (
        <div className="space-y-6 text-center pt-10">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">{book.title}</h1>
          <p className="text-xl text-slate-600 italic mb-8">by {book.author}</p>
          <div className="w-16 h-1 bg-slate-300 mx-auto my-8"></div>
          <p className="text-sm text-slate-500 uppercase tracking-widest">Chapter One</p>
          <p className="text-lg font-serif text-slate-800 leading-relaxed text-left first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
            The beginning was not as anyone expected. It started with a whisper, a subtle shift in the wind that few noticed until it was too late. {book.description} This was the moment everything changed for the inhabitants of the known world.
          </p>
        </div>
      );
    }

    // Generic filler text for subsequent pages
    return (
      <div className="space-y-6 font-serif text-lg text-slate-800 leading-relaxed">
        <p>
           Page {page} continues the journey. The sun hung low in the sky, casting long shadows across the landscape. {book.author}'s distinctive voice echoes through the narrative, weaving a tapestry of complex emotions and vivid imagery. As the story unfolds, the stakes become higher.
        </p>
        <p>
          "I never thought it would come to this," a voice said from the shadows. The air was thick with tension, heavy with the scent of rain and old parchment. It was a time of great uncertainty, yet within the chaos, a small seed of hope began to sprout.
        </p>
        <p>
          Paragraphs of text fill the page, drawing the reader deeper into the world of <strong>{book.title}</strong>. The characters face challenges that test their resolve, their loyalty, and their very understanding of reality. 
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm">{book.title}</span>
              <span className="text-xs text-slate-500">Free Sample Preview</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Reading Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#fdfbf7]">
          <div className="max-w-xl mx-auto h-full flex flex-col">
             {getPageContent(currentPage)}
             
             {/* Page Number footer inside content area for print-feel */}
             <div className="mt-auto pt-8 text-center text-xs text-slate-400 font-serif">
                {currentPage}
             </div>
          </div>
        </div>

        {/* Footer / Controls */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </button>

          <span className="text-sm font-medium text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SampleReaderModal;