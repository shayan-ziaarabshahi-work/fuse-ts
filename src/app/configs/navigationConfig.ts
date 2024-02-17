import i18next from 'i18next';
import fa from './navigation-i18n/fa'
import { NavigationConfig } from '@types-fuse/navigation';

i18next.addResourceBundle('fa', 'navigation', fa);

const navigationConfig: NavigationConfig[] = [
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
];

export default navigationConfig;
