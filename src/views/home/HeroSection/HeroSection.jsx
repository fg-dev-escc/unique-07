import React from 'react';

import { useHeroSection } from './useHeroSection';

const HeroSection = () => {
  const { heroHelpers, heroData } = useHeroSection();

  return (
    <div className="hero-section">
      <div className="hero-slider owl-carousel owl-theme">
        {heroData.slides.map((slide, index) => (
          <div key={index} className={`hero-single hero-slide-${index + 1}`} style={{
            background: heroHelpers.getSlideBackground(slide)
          }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-9 col-lg-7">
                  <div className="hero-content">
                    <h6 className="hero-sub-title wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" data-wow-delay=".25s">
                      {slide.subtitle}
                    </h6>
                    <h1 className="hero-title wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" data-wow-delay=".50s"
                      dangerouslySetInnerHTML={heroHelpers.formatSlideTitle(slide.title)}>
                    </h1>
                    <p className="wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" data-wow-delay=".75s">
                      {slide.description}
                    </p>
                    <div className="hero-btn wow animate__animated animate__fadeInUp"
                      data-wow-duration="1s" data-wow-delay="1s">
                      <a href={heroData.routes.about} className="theme-btn">
                        {heroData.buttons.aboutMore}<i className="far fa-arrow-right"></i>
                      </a>
                      <a href={heroData.routes.cars} className="theme-btn theme-btn2">
                        {heroData.buttons.learnMore}<i className="far fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;