import { IGetItemOptions, ISetItemOptions } from '@types-fuse/globalStorage';
import { decrypt, encrypt } from './AES';

export default {
  getItem(key: string, options: IGetItemOptions = { secure: true }) {
    try {
      const { secure } = options;
      let item: any = localStorage.getItem(key);

      if (!item) return null;

      if (secure !== false && process.env.REACT_APP_RUNTIME_MODE === 'production') {
        item = decrypt(item);
      }

      item = JSON.parse(item);

      if (typeof item === 'object' && 'expire' in item) {
        if (item.expire < Date.now()) {
          this.removeItem(key);
          return null;
        }
        return item.data;
      }

      return item;
    } catch {
      return null;
    }
  },

  /**
   *
   * @param  key
   * @param  value
   * @param options : { expire: a number per seconds, secure: boolean }
   */
  setItem(key: string, value: any, options: ISetItemOptions = { expire: undefined, secure: true }) {
    const { expire, secure } = options;

    if (expire) {
      value = {
        expire: expire * 1000 + Date.now(),
        data: value,
      };
    }

    // If secure is null or undefined, that means the secure value had not been specified , so it will be encrypted
    const data =
      secure && process.env.REACT_APP_RUNTIME_MODE === 'production'
        ? encrypt(value)
        : JSON.stringify(value);

    localStorage.setItem(key, data);
  },

  removeItem(key: string) {
    localStorage.removeItem(String(key));
  },

  key(index: number) {
    return localStorage.key(index);
  },

  clear() {
    localStorage.clear();
  },

  getLength(): number {
    return localStorage.length;
  },
};
