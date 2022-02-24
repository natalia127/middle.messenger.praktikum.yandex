export enum EHandsAuth {
  SIGNUP = '/auth/signup',
  SIGNIN = '/auth/signin',
  GETUSER = '/auth/user',
  LOGOUT = '/auth/logout'

}

export enum EHandsUser {
  CHANGE_PROFILE = '/user/profile',
  CHANGE_AVATAR = '/user/profile/avatar',
  CHANGE_PASSWORD = '/user/password',
  GET_USER = '/user/',
  SEARCH_USER = '/user/search',
  GET_AVATAR = '/resources'
}

export enum EHandsChat {
  GET_CHATS = '/chats',
  CREATE_CHAT = '/chats',
  DELETE_CHAT = '/chats',

}
