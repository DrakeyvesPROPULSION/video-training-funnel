const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs'); // Uncomment when password hashing is needed

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address.']
  },
  // password: { // Add password field when implementing authentication
  //   type: String,
  //   required: [true, 'Password is required.'],
  //   minlength: [8, 'Password must be at least 8 characters long.'],
  //   select: false // Prevent password from being returned by default in queries
  // },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters.']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters.']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: true }
    // Add more user preferences as needed
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending_verification', 'suspended'],
    default: 'active'
  },
  // Add roles or permissions if needed
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user'
  // }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexing
UserSchema.index({ email: 1 });
UserSchema.index({ status: 1, createdAt: -1 });

// --- Password Hashing Middleware (Uncomment when password field is added) ---
/*
UserSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware/handler
  }
});
*/

// --- Instance Method for Password Comparison (Uncomment when password field is added) ---
/*
UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
*/

const User = mongoose.model('User', UserSchema);

module.exports = User;