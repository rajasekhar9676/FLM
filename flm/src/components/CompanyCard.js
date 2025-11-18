import React from 'react';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarToday,
  OpenInNew as OpenInNewIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Color mapping for industries
const industryColors = {
  'Technology': 'from-blue-500 to-cyan-500',
  'Energy': 'from-green-500 to-emerald-500',
  'Healthcare': 'from-red-500 to-pink-500',
  'Finance': 'from-yellow-500 to-amber-500',
  'Education': 'from-purple-500 to-indigo-500',
  'Retail': 'from-orange-500 to-red-500',
  'Automotive': 'from-gray-600 to-gray-800',
  'Logistics': 'from-teal-500 to-cyan-500',
  'Pharmaceuticals': 'from-violet-500 to-purple-500',
  'Media': 'from-pink-500 to-rose-500',
  'Real Estate': 'from-amber-500 to-yellow-500',
  'Travel': 'from-sky-500 to-blue-500',
  'Agriculture': 'from-lime-500 to-green-500',
  'Sports': 'from-red-600 to-orange-500',
  'Security': 'from-slate-600 to-gray-700',
  'Fashion': 'from-fuchsia-500 to-pink-500',
  'Construction': 'from-orange-600 to-amber-600',
  'Entertainment': 'from-purple-600 to-pink-600',
  'Telecommunications': 'from-indigo-500 to-blue-600'
};

function CompanyCard({ company }) {
  const gradientClass = industryColors[company.industry] || 'from-blue-500 to-blue-600';
  
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden h-full flex flex-col transform hover:scale-[1.02]">
      {/* Card Header with Dynamic Gradient */}
      <div className={`bg-gradient-to-r ${gradientClass} p-5 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
        <div className="relative flex justify-between items-start">
          <h2 className="text-xl font-bold text-white pr-2 line-clamp-2 flex-1 drop-shadow-lg">
            {company.name}
          </h2>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-all flex-shrink-0 ml-2 bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:bg-white/30 hover:scale-110 transform"
            >
              <OpenInNewIcon className="text-lg" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white to-gray-50">
        {/* Industry Badge */}
        <div className="flex items-center mb-4">
          <div className={`bg-gradient-to-br ${gradientClass} bg-opacity-10 p-2.5 rounded-xl mr-3 shadow-sm`}>
            <BusinessIcon className={`text-lg bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
          </div>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${gradientClass} text-white shadow-md`}>
            {company.industry}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 p-2 rounded-lg mr-3">
            <LocationIcon className="text-gray-600 text-lg" />
          </div>
          <p className="text-sm text-gray-700 font-semibold">
            {company.location.city}, {company.location.country}
          </p>
        </div>

        {/* Description */}
        {company.description && (
          <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow leading-relaxed">
            {company.description}
          </p>
        )}

        {/* Stats Section */}
        <div className="mt-auto pt-5 border-t-2 border-gray-100 space-y-3 bg-white/50 rounded-lg p-4 -mx-4 -mb-4">
          {company.employees > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <div className="bg-blue-50 p-1.5 rounded-lg mr-2">
                  <PeopleIcon className="text-blue-600 text-base" />
                </div>
                <span className="font-semibold text-sm">Employees</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{company.employees.toLocaleString()}</span>
            </div>
          )}
          {company.founded && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <div className="bg-purple-50 p-1.5 rounded-lg mr-2">
                  <CalendarToday className="text-purple-600 text-base" />
                </div>
                <span className="font-semibold text-sm">Founded</span>
              </div>
              <span className="font-bold text-gray-900 text-sm">{company.founded}</span>
            </div>
          )}
          {company.revenue && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <div className="bg-green-50 p-1.5 rounded-lg mr-2">
                  <TrendingUpIcon className="text-green-600 text-base" />
                </div>
                <span className="font-semibold text-sm">Revenue</span>
              </div>
              <span className="font-bold text-green-600 text-sm">{company.revenue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
