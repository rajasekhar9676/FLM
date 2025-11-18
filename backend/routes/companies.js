const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Company = require('../models/Company');

// Middleware to check MongoDB connection
const checkConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: 'Database not connected. Please check your MongoDB connection.',
      readyState: mongoose.connection.readyState,
      states: {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
      }
    });
  }
  next();
};

// GET /api/companies - Get all companies with filtering, sorting, and pagination
router.get('/', checkConnection, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      industry = '',
      location = '',
      country = '',
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = {};

    // Search filter (name or description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Industry filter
    if (industry) {
      filter.industry = { $regex: industry, $options: 'i' };
    }

    // Location filter (city)
    if (location) {
      filter['location.city'] = { $regex: location, $options: 'i' };
    }

    // Country filter
    if (country) {
      filter['location.country'] = { $regex: country, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const companies = await Company.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Company.countDocuments(filter);

    res.json({
      companies,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/companies/filters - Get unique values for filters
router.get('/filters', checkConnection, async (req, res) => {
  try {
    const industries = await Company.distinct('industry');
    const countries = await Company.distinct('location.country');
    const cities = await Company.distinct('location.city');

    res.json({
      industries: industries.sort(),
      countries: countries.sort(),
      cities: cities.sort()
    });
  } catch (error) {
    console.error('Error in /filters:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Make sure MongoDB is connected and database is seeded'
    });
  }
});

// GET /api/companies/:id - Get single company
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/companies - Create new company
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

