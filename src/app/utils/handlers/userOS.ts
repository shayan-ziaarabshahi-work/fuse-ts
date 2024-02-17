import platform from 'platform';

export function getUserOS(): string {
  return platform.os?.toString().toLowerCase() || '';
}

export function isUserDeviceAndroid(userOS = getUserOS()): boolean {
  return userOS?.includes('android');
}

export function isUserDeviceIOS(userOS = getUserOS()): boolean {
  return userOS?.includes('ios');
}
