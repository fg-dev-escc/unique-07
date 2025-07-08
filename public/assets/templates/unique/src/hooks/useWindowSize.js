// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // console.log(width);
  return {
    extraSmall: width < 576,
    small:width >= 576 && width < 768,
    medium: width >= 768 && width < 992,
    large: width >= 992,
    width: width
  };
};
