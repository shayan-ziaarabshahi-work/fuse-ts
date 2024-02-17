import { FuseAuthRoles } from '@types-fuse/authentication';

export type FuseUserType = {
  uuid?: string;
  from?: string;
  role?: FuseAuthRoles;
  loginRedirectUrl?: string;
  data?: {
    displayName?: string;
    photoURL?: string;
    email?: string;
    settings?: {
      layout?: any;
      theme?: any;
    };
    shortcuts?: string[];
  };
};
