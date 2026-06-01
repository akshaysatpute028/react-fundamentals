// Contact Page Component - Demonstrates form handling and user input
import React, { useState } from 'react';
import '../styles/Contact.css';

// Contact component - represents the "/contact" route
const Contact = () => {
  // State for form fields - stores user input
  // We use an object with multiple properties instead of multiple useState calls
  // This is a common pattern for managing related form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State to track if form was submitted successfully
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  // This function runs whenever a user types in any form field
  // event.target gives us access to the input element that triggered the change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Use spread operator (...) to copy all existing form data, then update the specific field
    setFormData({
      ...formData,
      [name]: value, // Update the field that changed
    });
  };

  // Handle form submission
  // This function runs when the user clicks the Submit button
  const handleSubmit = (event) => {
    // event.preventDefault() stops the form from doing its default action (page reload)
    event.preventDefault();

    // Validate that all fields are filled
    if (formData.name && formData.email && formData.subject && formData.message) {
      // In a real app, you'd send this data to a server
      console.log('Form submitted:', formData);

      // Show success message
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    } else {
      // Alert user if any field is empty
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="contact-container">
      <section className="contact-header">
        <h1>Contact Us 📧</h1>
        <p>Have questions? We'd love to hear from you!</p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          {/* Left side - Contact information */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Reach out to us with any questions about React or this project.</p>

            <div className="info-items">
              <div className="info-item">
                <span className="info-label">📍 Location</span>
                <p>Web Development Hub, Internet</p>
              </div>
              <div className="info-item">
                <span className="info-label">📧 Email</span>
                <p>contact@myapp.com</p>
              </div>
              <div className="info-item">
                <span className="info-label">⏰ Hours</span>
                <p>Available 24/7</p>
              </div>
            </div>

            {/* Quick facts about this project */}
            <div className="quick-facts">
              <h3>Did You Know?</h3>
              <ul>
                <li>React powers over 1M websites worldwide</li>
                <li>React components are reusable and composable</li>
                <li>Unidirectional data flow makes debugging easier</li>
                <li>React has one of the largest development communities</li>
              </ul>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>

            {/* Success message - conditionally rendered */}
            {isSubmitted && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {/* Form for user input */}
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name input field */}
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email input field */}
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Subject input field */}
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  required
                />
              </div>

              {/* Message textarea */}
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>

            {/* Tips for beginners */}
            <div className="form-tips">
              <h4>💡 What's Happening Here?</h4>
              <p>
                This form demonstrates <strong>controlled inputs</strong> - a React pattern where form values are
                controlled by component state. Try typing in the fields to see state updates in action!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
