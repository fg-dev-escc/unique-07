import React from 'react';

import { useContactMap } from './useContactMap';

const ContactMap = () => {
  const { contactMapHelpers, contactMapData } = useContactMap();

  return (
    <div className="contact-map">
      <iframe 
        src={contactMapData.map.src}
        style={contactMapHelpers.getMapStyles()}
        {...contactMapHelpers.getMapProps()}
        title={contactMapData.map.title}
      />
    </div>
  );
};

export default ContactMap;