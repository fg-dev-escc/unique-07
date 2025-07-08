import React from 'react';

import { useContactInfo } from './useContactInfo';

const ContactInfo = () => {
  const { contactInfoHelpers, contactInfoData } = useContactInfo();

  return (
    <div className="contact-area py-120">
      <div className="container">
        <div className="contact-content">
          <div className="row">
            {contactInfoData.contactInfo.map((info, index) => {
              const contactLink = contactInfoHelpers.getContactLink(info);
              return (
                <div key={index} className="col-md-3">
                  <div className="contact-info">
                    <div className="contact-info-icon">
                      <i className={info.icon}></i>
                    </div>
                    <div className="contact-info-content">
                      <h5>{info.title}</h5>
                      {contactLink ? (
                        <a href={contactLink}>{info.content}</a>
                      ) : (
                        <p>{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;