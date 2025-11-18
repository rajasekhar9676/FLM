const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  industry: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  location: {
    city: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    country: {
      type: String,
      required: true,
      trim: true,
      index: true
    }
  },
  website: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  employees: {
    type: Number,
    default: 0
  },
  founded: {
    type: Number
  },
  revenue: {
    type: String
  }
}, {
  timestamps: true
});

// Index for text search
companySchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Company', companySchema);

