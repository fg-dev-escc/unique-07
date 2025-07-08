import React from 'react';

import { useCounterSection } from './useCounterSection';

const CounterSection = () => {
  const { counterSectionHelpers, counterSectionData, animatedCounters } = useCounterSection();

  return (
    <div className="counter-area pt-30 pb-30">
      <div className="container">
        <div className="row">
          {counterSectionData.counters.map((counter, index) => (
            counterSectionHelpers.validateCounter(counter) && (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="counter-box">
                  <div className="icon">
                    <img {...counterSectionHelpers.getIconProps(counter)} />
                  </div>
                  <div>
                    <span {...counterSectionHelpers.getCounterProps(counter, index)}>
                      {animatedCounters[index] || counter.value}
                    </span>
                    <h6 className="title">
                      {counter.title}
                    </h6>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;