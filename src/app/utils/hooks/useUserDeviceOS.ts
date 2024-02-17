import { useMemo } from 'react';
import { getUserOS, isUserDeviceAndroid, isUserDeviceIOS } from '../handlers/userOS';

const useUserDeviceOS = () => {
  const userOS = useMemo(() => getUserOS(), []);

  return {
    userOS,
    isUserDeviceIOS: isUserDeviceIOS(userOS),
    isUserDeviceAndroid: isUserDeviceAndroid(userOS),
  };
};

export default useUserDeviceOS;
