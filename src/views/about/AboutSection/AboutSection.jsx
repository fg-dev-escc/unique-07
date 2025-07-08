import React from 'react';

import { useAboutSection } from './useAboutSection';

const AboutSection = () => {
  const { aboutSectionHelpers, aboutSectionData } = useAboutSection();

  return (
    <div className="about-area py-120 mb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="about-left">
              <div className="about-img">
                <img {...aboutSectionHelpers.getImageProps(aboutSectionData.images)} />
              </div>
              <div className="about-shape">
                <img {...aboutSectionHelpers.getShapeProps(aboutSectionData.images)} />
              </div>
              <div className="about-experience">
                <div className="about-experience-icon">
                  <img {...aboutSectionHelpers.getExperienceIconProps(aboutSectionData.experience)} />
                </div>
                <b dangerouslySetInnerHTML={aboutSectionHelpers.formatExperienceText(aboutSectionData.experience.text)} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  {aboutSectionData.content.tagline}
                </span>
                <h2 className="site-title">
                  {aboutSectionData.content.title.before} <span>{aboutSectionData.content.title.highlight}</span> {aboutSectionData.content.title.after}
                </h2>
              </div>
              <p className="about-text">
                {aboutSectionData.content.description}
              </p>
              {aboutSectionHelpers.validateFeatures(aboutSectionData.content.features) && (
                <div className="about-list-wrapper">
                  <ul className="about-list list-unstyled">
                    {aboutSectionData.content.features.map((feature, index) => (
                      <li key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <a href={aboutSectionData.content.button.link} className="theme-btn mt-4">
                {aboutSectionData.content.button.text} <i className="far fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;