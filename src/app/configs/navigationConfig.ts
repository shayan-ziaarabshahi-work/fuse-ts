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
    id: 'secret',
    title: 'محرمانه',
    type: 'item',
    url: 'secret',
    auth: authRoles.staff
  },
];

export default navigationConfig;
