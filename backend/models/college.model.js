const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  collegeInfo: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  placement: {
    type: {
      averageSalary: {
        type: Number,
        default: null
      },
      companiesVisited: {
        type: Number,
        default: null
      }
    },
    required: true
  },
  // Additional details, you can customize as needed
  location: {
    type: String,
    required: true
  },
  courses: {
    type: [String],
    default: []
  },
  facilities: {
    type: [String],
    default: []
  },
  accreditation: {
    type: String,
    default: null
  },
  establishedYear: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const College = mongoose.model('College', collegeSchema);

module.exports = College;
