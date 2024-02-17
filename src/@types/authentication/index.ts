import { authRoles } from 'src/app/auth';

export type FuseAuthRole = typeof authRoles[keyof typeof authRoles][number];

export type FuseAuthRoles = Readonly<FuseAuthRole[]> | null;
