const mongoose = require('mongoose');

const InteractionEventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['play', 'pause', 'seek', 'volume_change', 'rate_change', 'fullscreen_enter', 'fullscreen_exit', 'ended', 'error']
  },
  timestamp: { // Timestamp within the video timeline (seconds)
    type: Number,
    required: true
  },
  eventTimestamp: { // Timestamp when the event occurred (wall clock time)
    type: Date,
    default: Date.now
  },
  value: { // Optional value associated with the event (e.g., seek target time, volume level)
    type: String
  }
}, { _id: false }); // Don't create separate IDs for subdocuments

const VideoInteractionSchema = new mongoose.Schema({
  userId: { // Link to the User model if the user is logged in
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true, // Index for querying by user
    sparse: true // Allow null values if user is anonymous
  },
  sessionId: { // Unique identifier for the user's session (even if anonymous)
    type: String,
    required: true,
    index: true
  },
  videoId: { // Identifier for the specific video being watched
    type: String, // Using String for flexibility (could be slug, ID, etc.)
    required: true,
    index: true
  },
  videoTitle: { // Store title for easier reporting
    type: String,
    trim: true
  },
  videoDuration: { // Store duration for percentage calculation
    type: Number // Seconds
  },
  watchStartTime: { // When the user first started watching this video in this session
    type: Date,
    default: Date.now
  },
  lastUpdateTime: { // When the progress was last updated
    type: Date,
    default: Date.now
  },
  totalWatchTimeSeconds: { // Accumulated watch time for this video in this session
    type: Number,
    default: 0
  },
  maxPercentageWatched: { // Highest percentage reached by the user
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  completed: { // Flag if the video was watched to completion (e.g., >95%)
    type: Boolean,
    default: false,
    index: true
  },
  // Store discrete interaction events if needed for detailed analysis
  // interactions: [InteractionEventSchema] // Uncomment if detailed event logging is required
  ipAddress: { // Consider GDPR
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexing for common queries
VideoInteractionSchema.index({ userId: 1, videoId: 1 });
VideoInteractionSchema.index({ sessionId: 1, videoId: 1 });
VideoInteractionSchema.index({ videoId: 1, completed: 1 });
VideoInteractionSchema.index({ createdAt: -1 });

// Update lastUpdateTime before saving
VideoInteractionSchema.pre('save', function(next) {
  this.lastUpdateTime = new Date();
  // Calculate completion status based on percentage
  if (this.isModified('maxPercentageWatched')) {
    this.completed = this.maxPercentageWatched >= 95; // Define completion threshold
  }
  next();
});

const VideoInteraction = mongoose.model('VideoInteraction', VideoInteractionSchema);

module.exports = VideoInteraction;