import i18next from 'i18next';
import fa from './navigation-i18n/fa'
import { NavigationConfig } from '@types-fuse/navigation';
import { authRoles } from '../auth';

i18next.addResourceBundle('fa', 'navigation', fa);

const navigationConfig: NavigationConfig[] = [
  {
    id: 'home',
    title: 'خانه',
    type: 'item',
    url: '',
    // icon: 'heroicons-outline:star',
    // translate: 'home',
  },
  {
    id: 'form',
    title: 'فرم',
    type: 'item',
    url: 'form',
  },
];

export default navigationConfig;
