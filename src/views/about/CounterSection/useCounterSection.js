import { useState, useEffect } from 'react';
import counterSectionData from './counterSectionData.json';

export const useCounterSection = () => {
  const [animatedCounters, setAnimatedCounters] = useState({});
  
  // effects
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counterId = entry.target.dataset.counterId;
          startCountAnimation(counterId);
        }
      });
    });

    document.querySelectorAll('.counter').forEach(counter => {
      observer.observe(counter);
    });

    return () => observer.disconnect();
  }, []);

  // helpers
  const counterSectionHelpers = {
    getCounterProps: (counter, index) => ({
      className: "counter",
      'data-count': "+",
      'data-to': counter.dataTo,
      'data-speed': "3000",
      'data-counter-id': index
    }),
    
    getIconProps: (counter) => ({
      src: counter.icon,
      alt: `${counter.title} icon`
    }),
    
    formatCounterValue: (value, isAnimated) => {
      return isAnimated ? value : '0';
    },
    
    validateCounter: (counter) => {
      return counter.icon && counter.value && counter.title;
    }
  };

  // animation logic
  const startCountAnimation = (counterId) => {
    if (animatedCounters[counterId]) return;
    
    const counter = counterSectionData.counters[counterId];
    const targetValue = parseInt(counter.dataTo);
    let currentValue = 0;
    const increment = targetValue / 100;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      
      setAnimatedCounters(prev => ({
        ...prev,
        [counterId]: Math.floor(currentValue)
      }));
    }, 30);
  };

  return {
    counterSectionHelpers,
    counterSectionData,
    animatedCounters
  };
};