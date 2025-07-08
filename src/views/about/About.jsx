import React from 'react';

import HeroSection from './HeroSection/HeroSection';
import AboutSection from './AboutSection/AboutSection';
import CounterSection from './CounterSection/CounterSection';
import ServiceSection from './ServiceSection/ServiceSection';
import FaqSection from './FaqSection/FaqSection';
import PartnerSection from './PartnerSection/PartnerSection';

const About = () => {
  return (
    <main className="main">
      {/* <HeroSection /> */}
      <AboutSection />
      <CounterSection />
      <ServiceSection />
      <FaqSection />
      <PartnerSection />
    </main>
  );
};

export default About;