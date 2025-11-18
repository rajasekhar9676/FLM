import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CompanyContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  companies: [],
  filters: {
    industries: [],
    countries: [],
    cities: []
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  },
  searchParams: {
    search: '',
    industry: '',
    location: '',
    country: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
    limit: 10
  }
};

function companyReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: action.payload.companies,
        pagination: action.payload.pagination,
        loading: false,
        error: null
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'UPDATE_SEARCH_PARAMS':
      return {
        ...state,
        searchParams: { ...state.searchParams, ...action.payload }
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        searchParams: {
          ...initialState.searchParams,
          page: state.searchParams.page,
          limit: state.searchParams.limit
        }
      };
    default:
      return state;
  }
}

export function CompanyProvider({ children }) {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Fetch filter options
  const fetchFilters = async () => {
    try {
      console.log('Fetching filters from:', `${API_BASE_URL}/companies/filters`);
      const response = await fetch(`${API_BASE_URL}/companies/filters`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: 'SET_FILTERS', payload: data });
      console.log('Filters fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching filters:', error);
      console.error('API URL:', API_BASE_URL);
      // Set empty filters on error so UI doesn't break
      dispatch({ type: 'SET_FILTERS', payload: { industries: [], countries: [], cities: [] } });
    }
  };

  // Fetch companies
  const fetchCompanies = async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const searchParams = { ...state.searchParams, ...params };
      const queryParams = new URLSearchParams();
      
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key]) {
          queryParams.append(key, searchParams[key]);
        }
      });

      const url = `${API_BASE_URL}/companies?${queryParams}`;
      console.log('Fetching companies from:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Companies fetched successfully:', data.companies?.length || 0, 'companies');
      dispatch({
        type: 'SET_COMPANIES',
        payload: {
          companies: data.companies,
          pagination: data.pagination
        }
      });
      dispatch({ type: 'UPDATE_SEARCH_PARAMS', payload: params });
    } catch (error) {
      console.error('Error fetching companies:', error);
      console.error('API URL:', API_BASE_URL);
      let errorMessage = error.message || 'Failed to fetch companies';
      
      // Provide more helpful error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running on port 5000.';
      }
      
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      });
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchCompanies();
  }, []);

  const updateFilters = (newParams) => {
    fetchCompanies({ ...newParams, page: 1 });
  };

  const changePage = (page) => {
    fetchCompanies({ page });
  };

  const changeSort = (sortBy, sortOrder) => {
    fetchCompanies({ sortBy, sortOrder, page: 1 });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    fetchCompanies(initialState.searchParams);
  };

  return (
    <CompanyContext.Provider
      value={{
        ...state,
        fetchCompanies,
        updateFilters,
        changePage,
        changeSort,
        resetFilters
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}

