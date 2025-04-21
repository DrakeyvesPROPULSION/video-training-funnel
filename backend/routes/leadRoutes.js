const express = require('express');
const { createLead, getLeads } = require('../controllers/leadController');
// const { protect, authorize } = require('../middleware/auth'); // Uncomment when auth middleware is ready

const router = express.Router();

// Route to create a new lead (e.g., from exit intent form)
// POST /api/leads
router.post('/', createLead);

// Route to get all leads
// GET /api/leads
// Add protect and authorize middleware later for admin access
// router.get('/', protect, authorize('admin'), getLeads);
router.get('/', getLeads); // Temporarily public for testing

// Add routes for getting single lead, updating, deleting later if needed
// router.get('/:id', getLeadById);
// router.put('/:id', updateLead);
// router.delete('/:id', deleteLead);

module.exports = router;