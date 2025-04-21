const Lead = require('../models/Lead');
// const emailService = require('../services/emailService'); // Uncomment when email service is ready

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Public
 */
exports.createLead = async (req, res, next) => {
  try {
    const { email, firstName, source } = req.body;

    // Basic validation (more robust validation can be added via middleware)
    if (!email) {
      return res.status(400).json({ success: false, error: { message: 'Email is required.' } });
    }

    // Optional: Add more server-side validation if needed

    // Check if lead already exists (optional, depends on requirements)
    const existingLead = await Lead.findOne({ email: email.toLowerCase() });
    if (existingLead) {
      // Decide how to handle duplicates: update existing, return success, or return error?
      // For now, let's just return the existing lead info or a success message.
      console.log(`Lead already exists for email: ${email}`);
      // Optionally update source or tags if needed
      // existingLead.tags.addToSet('duplicate_submission');
      // await existingLead.save();
      return res.status(200).json({ success: true, message: 'Lead already exists.', data: existingLead });
      // Or return 409 Conflict:
      // return res.status(409).json({ success: false, error: { message: 'Email already subscribed.' } });
    }

    // Create new lead
    const newLead = new Lead({
      email: email,
      firstName: firstName,
      source: source || 'unknown', // Default source if not provided
      ipAddress: req.ip, // Get IP from request
      userAgent: req.headers['user-agent'] // Get User Agent
      // Add referrer if available: req.headers['referer']
    });

    const savedLead = await newLead.save();

    // Optional: Send confirmation email (uncomment when service is ready)
    // try {
    //   await emailService.sendWelcomeEmail(savedLead.email, savedLead.firstName);
    // } catch (emailError) {
    //   console.error(`Failed to send welcome email to ${savedLead.email}:`, emailError);
    //   // Don't fail the request if email sending fails, just log it
    // }

    res.status(201).json({ success: true, data: savedLead });

  } catch (error) {
    console.error("Error creating lead:", error);
    // Handle Mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: { message: messages.join(' '), details: error.errors } });
    }
    // Handle duplicate key error (if unique index is violated and not caught above)
    if (error.code === 11000) {
       return res.status(409).json({ success: false, error: { message: 'Email already subscribed.' } });
    }
    // Pass other errors to the global error handler
    next(error);
  }
};

/**
 * @desc    Get all leads (with pagination - implement later)
 * @route   GET /api/leads
 * @access  Private (Admin Only - implement auth later)
 */
exports.getLeads = async (req, res, next) => {
  try {
    // TODO: Add pagination, filtering, sorting
    // TODO: Add authentication/authorization check
    const leads = await Lead.find().sort({ createdAt: -1 }); // Get latest first
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    next(error);
  }
};

// Add more controller functions as needed (getLeadById, updateLead, deleteLead)