import React from 'react';

import { useFaqSection } from './useFaqSection';

const FaqSection = () => {
  const {
    faqSectionHelpers,
    faqSectionData,
    activeAccordion,
    handleAccordionToggle,
    handleAccordionOpen,
    handleAccordionClose
  } = useFaqSection();
  return (
    <div className="faq-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="faq-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  {faqSectionData.content.tagline}
                </span>
                <h2 className="site-title my-3">
                  {faqSectionData.content.title.before} <span>{faqSectionData.content.title.highlight}</span> {faqSectionData.content.title.after}
                </h2>
              </div>
              <p className="about-text">
                {faqSectionData.content.description}
              </p>
              <div className="faq-img mt-3">
                <img src={faqSectionData.image.src} alt={faqSectionData.image.alt} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordion" id="accordionExample">
              {faqSectionData.faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={`heading${faqSectionHelpers.formatFaqId(faq, index)}`}>
                    <button 
                      className={faqSectionHelpers.getAccordionClasses(index)}
                      type="button" 
                      onClick={() => handleAccordionToggle(index)}
                      aria-expanded={faqSectionHelpers.getAriaExpanded(index)}
                      aria-controls={`collapse${faqSectionHelpers.formatFaqId(faq, index)}`}
                    >
                      <span><i className={faqSectionHelpers.getFaqIcon()}></i></span> {faq.question}
                    </button>
                  </h2>
                  <div 
                    id={`collapse${faqSectionHelpers.formatFaqId(faq, index)}`} 
                    className={faqSectionHelpers.getCollapseClasses(index)}
                    aria-labelledby={`heading${faqSectionHelpers.formatFaqId(faq, index)}`}
                  >
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;