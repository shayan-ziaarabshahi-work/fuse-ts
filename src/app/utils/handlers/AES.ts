import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const secretKey =
  new Date().getTimezoneOffset() / 60 +
  window.screen?.width +
  window.screen?.height +
  navigator?.language +
  window.screen?.colorDepth +
  window.screen?.pixelDepth +
  navigator?.userAgent;

export function encrypt(value: any) {
  const stringified = JSON.stringify(value);
  return AES.encrypt(stringified, secretKey).toString();
}

export function decrypt(value: any): any {
  const decrypted = AES.decrypt(value, secretKey).toString(Utf8);
  return decrypted;
}
