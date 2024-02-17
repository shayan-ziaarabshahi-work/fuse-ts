import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import alertDialog from './alertDialogSlice';
import modal from './modalSlice';
import lightbox from './lightboxSlice';
import stackNavigation from './stackNavigationSlice';

const reducers = { fuse, i18n, user, alertDialog, modal, lightbox, stackNavigation };

export default reducers;
