import React from 'react';
import { ShoppingCart, Search, BookOpen, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  onSearch, 
  user, 
  onLoginClick,
  onLogoutClick,
  onHomeClick
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={onHomeClick}>
            <BookOpen className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            <span className="ml-2 text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">Ai Book Hub</span>
          </div>

          {/* Search Bar - Hidden on mobile, handled in sub-header or simple responsive layout */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="Search titles, authors, or ISBNs..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm font-medium text-slate-700">Hi, {user.name}</span>
                <button
                   onClick={onLogoutClick}
                   className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-full transition-all"
                   title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Search (visible only on small screens) */}
        <div className="md:hidden pb-3">
           <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;