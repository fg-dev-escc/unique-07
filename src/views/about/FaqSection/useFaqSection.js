import { useState } from 'react';

import faqSectionData from './faqSectionData.json';

export const useFaqSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const faqSectionHelpers = {
    isAccordionActive: (index) => {
      return activeAccordion === index;
    },

    getAccordionClasses: (index) => {
      return faqSectionHelpers.isAccordionActive(index) ? 'accordion-button' : 'accordion-button collapsed';
    },

    getCollapseClasses: (index) => {
      return faqSectionHelpers.isAccordionActive(index) ? 'accordion-collapse collapse show' : 'accordion-collapse collapse';
    },

    getAriaExpanded: (index) => {
      return faqSectionHelpers.isAccordionActive(index) ? 'true' : 'false';
    },

    formatFaqId: (faq, index) => {
      return faq.id || `faq${index + 1}`;
    },

    getFaqIcon: (iconType = 'question') => {
      const icons = {
        'question': 'far fa-question',
        'help': 'far fa-help',
        'info': 'far fa-info-circle',
        'plus': 'far fa-plus',
        'minus': 'far fa-minus'
      };
      return icons[iconType] || icons.question;
    },

    searchFaqs: (faqs, searchTerm) => {
      if (!searchTerm) return faqs;
      
      const term = searchTerm.toLowerCase();
      return faqs.filter(faq => 
        faq.question.toLowerCase().includes(term) || 
        faq.answer.toLowerCase().includes(term)
      );
    },

    getCategoryFaqs: (faqs, category) => {
      if (!category) return faqs;
      return faqs.filter(faq => faq.category === category);
    },

    getFaqCategories: (faqs) => {
      const categories = [...new Set(faqs.map(faq => faq.category).filter(Boolean))];
      return categories;
    }
  };

  const handleAccordionToggle = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  const handleAccordionOpen = (index) => {
    setActiveAccordion(index);
  };

  const handleAccordionClose = () => {
    setActiveAccordion(-1);
  };

  return {
    faqSectionHelpers,
    faqSectionData,
    activeAccordion,
    handleAccordionToggle,
    handleAccordionOpen,
    handleAccordionClose
  };
};