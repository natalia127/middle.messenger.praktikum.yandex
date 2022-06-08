export type TChangeUser = {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string,
  display_name: string,
}
export type TChangePassword = {
  oldPassword: string,
  newPassword: string,
}

export type TSearchUser = {
  login: string
}

export type TDelUsersChat = {
  chatId: number, users: [number]
}

export type TAddChat = {
  title: string
}

export type TAddUserChat = {
  chatId: number, users: [number]
}

export type TDelChat = {
  chatId: number
}

export type TChangeAvatarChat = {
  file: File,
  chatId : number
}

export type TSignUp = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export type TSignIn = {
  login: string,
  password: string
}

export type TResponse = {
  status: number,
  response: string
}
