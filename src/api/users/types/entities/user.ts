import { Entity } from '../../../../shared/types/entity'

export type PasswordReset = {
  token: string
  expiration: number
}

export interface User extends Entity {
  username: string
  email: string
  hashedPassword: string
  passwordReset: PasswordReset | null
  profilePictureUrl: string | null
  role: string
}
