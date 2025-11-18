import React from 'react';
import { Business as BusinessIcon } from '@mui/icons-material';
import { CompanyProvider } from './context/CompanyContext';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import CompanyList from './components/CompanyList';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  return (
    <CompanyProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-24">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-3.5 rounded-2xl shadow-xl transform hover:scale-110 transition-transform">
                  <BusinessIcon className="text-white text-3xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                    Companies Directory
                  </h1>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Discover and explore companies worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <FilterBar />
          <SortBar />
          <CompanyList />
          <Pagination />
        </main>

        {/* Footer */}
        <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200/50 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm text-gray-600 font-medium">
              © 2024 Companies Directory. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </CompanyProvider>
  );
}

export default App;
