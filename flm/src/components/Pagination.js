import React from 'react';
import { useCompany } from '../context/CompanyContext';

function Pagination() {
  const { pagination, searchParams, changePage, updateFilters } = useCompany();

  const handlePageChange = (page) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    updateFilters({ limit: e.target.value, page: 1 });
  };

  if (pagination.totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    
    // Always show first page
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
    }
    
    // Show pages around current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Items per page:</span>
          <select
            value={searchParams.limit}
            onChange={handleItemsPerPageChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold text-gray-700 hover:border-blue-500"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold text-gray-700 hover:border-blue-500"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {renderPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 font-semibold">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    page === pagination.currentPage
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105'
                      : 'bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-blue-500 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold text-gray-700 hover:border-blue-500"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold text-gray-700 hover:border-blue-500"
          >
            Last
          </button>
        </div>

        <span className="text-sm font-semibold text-gray-700">
          Page <span className="text-blue-600">{pagination.currentPage}</span> of{' '}
          <span className="text-blue-600">{pagination.totalPages}</span>
        </span>
      </div>
    </div>
  );
}

export default Pagination;
