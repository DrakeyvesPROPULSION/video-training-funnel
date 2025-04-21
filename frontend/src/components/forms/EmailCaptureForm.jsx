import React, { useState } from 'react';
import './EmailCaptureForm.css'; // Create this next

/**
 * EmailCaptureForm Component
 *
 * A reusable form for capturing email and optionally first name.
 * Includes basic client-side validation.
 *
 * @param {Function} onSubmit - Callback function executed on successful submission. Passes form data.
 * @param {string} submitButtonText - Text for the submit button. Defaults to "Submit".
 */
function EmailCaptureForm({ onSubmit, submitButtonText = "Get Free Access" }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(''); // Optional field
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(''); // For general form errors (e.g., API failure)

  // Basic client-side validation
  const validateForm = () => {
    const newErrors = {};
    setFormError(''); // Clear previous general errors

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // First name validation (optional - only if entered)
    if (firstName.trim() && firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      // Simulate API call or pass data up
      // In a real app, you'd call an API service here:
      // await apiService.submitLead({ email, firstName });

      // For now, just simulate a delay and call the onSubmit prop
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

      // Call the parent component's onSubmit handler
      if (onSubmit) {
        onSubmit({ email, firstName });
      }

      // Optionally clear form on success (depends on desired UX)
      // setEmail('');
      // setFirstName('');

    } catch (error) {
      console.error("Form submission error:", error);
      // Display a generic error message to the user
      setFormError('Submission failed. Please try again later.');
      // Or set specific field errors based on API response if available
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="email-capture-form" onSubmit={handleSubmit} noValidate>
      {formError && <div className="form-error-message">{formError}</div>}

      <div className="form-group">
        <label htmlFor="ecf-firstName">First Name <span className="optional">(Optional)</span></label>
        <input
          type="text"
          id="ecf-firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "ecf-firstName-error" : undefined}
          className={errors.firstName ? 'input-error' : ''}
        />
        {errors.firstName && <span id="ecf-firstName-error" className="error-message">{errors.firstName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ecf-email">Email Address <span className="required">*</span></label>
        <input
          type="email"
          id="ecf-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "ecf-email-error" : undefined}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span id="ecf-email-error" className="error-message">{errors.email}</span>}
      </div>

      <button
        type="submit"
        className="submit-button cta-button" // Reuse cta-button styles
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : submitButtonText}
      </button>

      <p className="privacy-note">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}

export default EmailCaptureForm;