import React from 'react';

import { useContactHeader } from './useContactHeader';

const ContactHeader = () => {
  const { contactHeaderHelpers, contactHeaderData } = useContactHeader();

  return (
    <div className="contact-header-area bg py-120" style={contactHeaderHelpers.getSectionStyle()}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">{contactHeaderData.sectionTitle.tagline}</span>
              <h2 className="site-title">
                {contactHeaderData.sectionTitle.title} <span>{contactHeaderData.sectionTitle.titleSpan}</span>
              </h2>
              <div className="heading-divider"></div>
              <p className="site-title-desc">{contactHeaderData.sectionTitle.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;