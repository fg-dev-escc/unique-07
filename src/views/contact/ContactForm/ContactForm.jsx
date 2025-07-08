import React from 'react';

import { useContactForm } from './useContactForm';

const ContactForm = () => {
  const {
    formData,
    isSubmitting,
    submitMessage,
    handleInputChange,
    handleSubmit,
    formHelpers,
    contactFormData
  } = useContactForm();

  return (
    <div className="contact-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="contact-img">
              <img src={contactFormData.image.src} alt={contactFormData.image.alt} />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="contact-form">
              <div className="contact-form-header">
                <h2>{contactFormData.form.title}</h2>
                <p>
                  {contactFormData.form.description}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        placeholder={contactFormData.form.placeholders.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        placeholder={contactFormData.form.placeholders.email} 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="subject"
                    placeholder={contactFormData.form.placeholders.subject} 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    cols="30" 
                    rows="5" 
                    className="form-control"
                    placeholder={contactFormData.form.placeholders.message}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="theme-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? contactFormData.form.buttons.submitting : contactFormData.form.buttons.submit} 
                  <i className="far fa-paper-plane"></i>
                </button>
                <div className="col-md-12 mt-3">
                  <div className={`form-messege ${formHelpers.getMessageStyle(submitMessage)}`}>
                    {submitMessage}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;