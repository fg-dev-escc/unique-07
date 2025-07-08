import React from 'react';

// data
const partnerData = {
  partners: [
    {
      name: "Partner 1",
      logo: "assets/img/partner/01.png"
    },
    {
      name: "Partner 2",
      logo: "assets/img/partner/02.png"
    },
    {
      name: "Partner 1",
      logo: "assets/img/partner/01.png"
    },
    {
      name: "Partner 2",
      logo: "assets/img/partner/02.png"
    },
    {
      name: "Partner 1",
      logo: "assets/img/partner/01.png"
    },
    {
      name: "Partner 2",
      logo: "assets/img/partner/02.png"
    },
    {
      name: "Partner 1",
      logo: "assets/img/partner/01.png"
    }
  ]
};

const PartnerSection = () => {
  // render
  return (
    <div className="partner-area bg pt-50 pb-50">
      <div className="container">
        <div className="partner-wrapper partner-slider owl-carousel owl-theme">
          {partnerData.partners.map((partner, index) => (
            <img 
              key={index} 
              src={partner.logo} 
              alt="thumb"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;