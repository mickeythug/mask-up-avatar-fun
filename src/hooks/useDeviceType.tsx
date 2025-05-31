
import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      console.log('Screen width:', width);
      console.log('User agent:', userAgent);
      
      // More precise mobile detection
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
      const isTabletDevice = /ipad|tablet|kindle|silk|playbook/i.test(userAgent);
      
      // Desktop first approach - if it's a large screen and not explicitly mobile/tablet
      if (width >= 1024 && !isMobileDevice && !isTabletDevice) {
        console.log('Setting to desktop');
        setDeviceType('desktop');
      } else if (width >= 768 && width < 1024) {
        console.log('Setting to tablet');
        setDeviceType('tablet');
      } else {
        console.log('Setting to mobile');
        setDeviceType('mobile');
      }
    };

    // Check on mount
    checkDeviceType();

    // Check on resize
    window.addEventListener('resize', checkDeviceType);
    
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  console.log('Current device type:', deviceType);
  return deviceType;
};
