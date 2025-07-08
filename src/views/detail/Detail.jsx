import React from 'react';

import CarImagesSection from './CarImagesSection/CarImagesSection';
import CarInfoSection from './CarInfoSection/CarInfoSection';
import CarTabsSection from './CarTabsSection/CarTabsSection';
import RelatedCarsSection from './RelatedCarsSection/RelatedCarsSection';
import BiddingHistorySection from './BiddingHistorySection/BiddingHistorySection';
import CarCommentsSection from './CarCommentsSection/CarCommentsSection';
import Breadcrumb from '../../components/ui/Breadcrumb';

const Detail = () => {
  return (
    <>
      <Breadcrumb 
        title="Detalle del Vehículo" 
        currentPage="Detalle"
      />
      
      {/* car single */}
      <div className="car-item-single py-120">
        <div className="container">
          <div className="car-single-wrapper">
            <div className="row">
              <CarImagesSection />
              <CarInfoSection />
            </div>
          </div>
        </div>
      </div>
      
      <CarTabsSection />
      <BiddingHistorySection />
      <CarCommentsSection />
      <RelatedCarsSection />
    </>
  );
};

export default Detail;