const mongoose = require('mongoose');
const validator = require('validator'); // Using validator package for robust validation

const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true, // Ensure emails are unique in the collection
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  firstName: { // Added based on form implementation
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters.']
  },
  source: {
    type: String,
    required: [true, 'Lead source is required.'],
    enum: {
      values: ['landing_page', 'exit_intent', 'training_video', 'external', 'manual'],
      message: 'Lead source must be one of the predefined values.'
    },
    default: 'exit_intent' // Default source, adjust if needed
  },
  captureDate: {
    type: Date,
    default: Date.now
  },
  ipAddress: { // Consider GDPR implications before storing IPs
    type: String,
    trim: true
  },
  userAgent: { // User agent string from the request
    type: String,
    trim: true
  },
  referrer: { // Referring URL
    type: String,
    trim: true
  },
  converted: { // Has this lead become a customer/taken further action?
    type: Boolean,
    default: false
  },
  conversionDate: {
    type: Date
  },
  tags: [{ // For segmenting leads
    type: String,
    trim: true,
    lowercase: true
  }],
  metadata: { // For storing additional arbitrary data
    type: Map,
    of: String
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Indexing for faster queries
// LeadSchema.index({ email: 1 }); // Removed - unique:true already creates an index
LeadSchema.index({ source: 1, captureDate: -1 });
LeadSchema.index({ createdAt: -1 });

// Pre-save hook example (can add more logic here if needed)
LeadSchema.pre('save', function(next) {
  // Example: ensure email is always lowercase before saving
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;