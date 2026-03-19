import express from 'express';
import { contactController } from '../controllers/contactController.js';
import { validateContactForm } from '../middleware/validation.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/contact', validateContactForm, contactController.submitContact);

export default router;
