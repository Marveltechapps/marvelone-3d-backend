import { body, validationResult } from 'express-validator';
import { logger } from '../utils/logger.js';

// Validation rules for contact form
export const validateContactForm = [
  // Full Name validation
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s'.-]+$/)
    .withMessage('Full name can only contain letters, numbers, spaces, hyphens, apostrophes, and periods'),

  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false
    }),

  // Phone validation (optional but if provided, must be valid)
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),

  // Project Type validation
  body('projectType')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Project type must be less than 100 characters'),

  // Budget Range validation
  body('budgetRange')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Budget range must be less than 100 characters'),

  // Timeline validation
  body('timeline')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Timeline must be less than 100 characters'),

  // Project Details validation
  body('projectDetails')
    .trim()
    .notEmpty()
    .withMessage('Project details are required')
    .isLength({ min: 1, max: 5000 })
    .withMessage('Project details must be between 1 and 5000 characters'),

  // Validation error handler
  (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }));

      logger.warn('Validation failed', { errors: errorMessages, body: req.body });

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    next();
  }
];
