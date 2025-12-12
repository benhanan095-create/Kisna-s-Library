import React, { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { getBookRecommendations } from '../services/geminiService';
import { Book } from '../types';
import BookCard from './BookCard';

interface AIRecommenderProps {
  catalog: Book[];
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  onReadSample: (book: Book) => void;
  onBuyNow: (book: Book) => void;
}

const AIRecommender: React.FC<AIRecommenderProps> = ({ catalog, onAddToCart, onViewDetails, onReadSample, onBuyNow }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const results = await getBookRecommendations(query, catalog);
      setRecommendations(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-12 border border-indigo-100 shadow-inner">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
          <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
          <span className="text-sm font-semibold text-indigo-700">AI-Powered Discovery</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Not sure what to read next?
        </h2>
        <p className="text-slate-600 mb-8">
          Tell our AI librarian what you're in the mood for. Try "Sci-fi with a hopeful tone" or "Mystery set in Victorian London".
        </p>

        <form onSubmit={handleRecommend} className="relative max-w-xl mx-auto mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your perfect book..."
            className="w-full px-6 py-4 pr-14 rounded-full border-2 border-indigo-100 focus:border-indigo-500 focus:ring-0 shadow-sm text-lg placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recommended for you</h3>
            <button 
              onClick={() => { setRecommendations([]); setHasSearched(false); setQuery(''); }}
              className="text-sm text-slate-500 hover:text-indigo-600"
            >
              Clear results
            </button>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-72 bg-white rounded-xl animate-pulse"></div>
                ))}
             </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recommendations.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onAddToCart={onAddToCart} 
                  onClick={onViewDetails}
                  onReadSample={onReadSample}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">No specific recommendations found. Try a different description!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommender;