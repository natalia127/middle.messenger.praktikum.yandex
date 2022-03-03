export enum EPATH {
  SIGNIN = '/sign-in',
  SIGNUP = '/sign-up',
  PROFILE = '/my-profile',
  EDIT_PROFILE = '/edit-profile',
  EDIT_PASSWORD = '/edit-password',
  CHAT = '/'
}

export const authorizedPaths: string[] = [
  EPATH.PROFILE,
  EPATH.EDIT_PROFILE,
  EPATH.EDIT_PASSWORD,
  EPATH.CHAT
];
