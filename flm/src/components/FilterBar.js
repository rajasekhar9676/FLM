import React, { useState } from 'react';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  Tune as TuneIcon
} from '@mui/icons-material';
import { useCompany } from '../context/CompanyContext';

function FilterBar() {
  const {
    filters,
    searchParams,
    updateFilters,
    resetFilters
  } = useCompany();

  const [isExpanded, setIsExpanded] = useState(true);

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleIndustryChange = (e) => {
    updateFilters({ industry: e.target.value });
  };

  const handleLocationChange = (e) => {
    updateFilters({ location: e.target.value });
  };

  const handleCountryChange = (e) => {
    updateFilters({ country: e.target.value });
  };

  const clearSearch = () => {
    updateFilters({ search: '' });
  };

  const hasActiveFilters = searchParams.search || searchParams.industry || searchParams.location || searchParams.country;

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl shadow-xl p-6 mb-6 border border-blue-100 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
            <FilterListIcon className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Filters & Search
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Find companies that match your criteria</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <TuneIcon />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-5">
            <label className="block text-sm font-bold text-gray-700 mb-2.5 flex items-center">
              <SearchIcon className="mr-1.5 text-blue-600" />
              Search Companies
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchParams.search}
                onChange={handleSearchChange}
                placeholder="Search by name or description..."
                className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all bg-white hover:bg-gray-50 text-sm font-medium shadow-sm hover:shadow-md"
              />
              {searchParams.search && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ClearIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Industry */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2.5">
              Industry
            </label>
            <select
              value={searchParams.industry}
              onChange={handleIndustryChange}
              className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
            >
              <option value="">All Industries</option>
              {filters.industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2.5">
              Country
            </label>
            <select
              value={searchParams.country}
              onChange={handleCountryChange}
              className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
            >
              <option value="">All Countries</option>
              {filters.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="md:col-span-3">
            <label className="block text-sm font-bold text-gray-700 mb-2.5">
              City
            </label>
            <select
              value={searchParams.location}
              onChange={handleLocationChange}
              className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-white hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"
            >
              <option value="">All Cities</option>
              {filters.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
