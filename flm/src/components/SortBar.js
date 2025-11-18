import React from 'react';
import { Sort as SortIcon, ArrowUpward as ArrowUpIcon, ArrowDownward as ArrowDownIcon } from '@mui/icons-material';
import { useCompany } from '../context/CompanyContext';

function SortBar() {
  const { searchParams, changeSort } = useCompany();

  const handleSortByChange = (e) => {
    changeSort(e.target.value, searchParams.sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
    changeSort(searchParams.sortBy, newOrder);
  };

  return (
    <div className="bg-gradient-to-r from-white to-blue-50/50 rounded-2xl shadow-lg p-5 mb-6 border border-blue-100">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-md">
            <SortIcon className="text-white" />
          </div>
          <span className="font-bold text-gray-800 text-lg">Sort by:</span>
        </div>

        <select
          value={searchParams.sortBy}
          onChange={handleSortByChange}
          className="px-5 py-3 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all text-sm font-semibold cursor-pointer shadow-sm hover:shadow-md min-w-[160px]"
        >
          <option value="name">Name</option>
          <option value="industry">Industry</option>
          <option value="employees">Employees</option>
          <option value="founded">Founded Year</option>
          <option value="createdAt">Date Added</option>
        </select>

        <button
          onClick={toggleSortOrder}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2 ${
            searchParams.sortOrder === 'asc'
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}
        >
          {searchParams.sortOrder === 'asc' ? (
            <>
              <ArrowUpIcon className="text-base" />
              Ascending
            </>
          ) : (
            <>
              <ArrowDownIcon className="text-base" />
              Descending
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default SortBar;
