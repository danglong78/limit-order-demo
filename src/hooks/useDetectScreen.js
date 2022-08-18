import { useState, useEffect } from 'react';
import isClient from 'utils/isClient.util';

export default function useDetectScreen() {
  const [mobileScreen, setMobileScreen] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setMobileScreen(isClient && window.innerWidth < 768);
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    mobileScreen,
    laptopScreen: !mobileScreen,
  };
}
