import {UserRole} from "../enums/userRole";

export interface UserDTO{
  id?: number
  firstname?: string
  lastname?: string
  birthDate?: string
  username: string
  phoneNumber?:string
  money?: number
  coin?: number
  role?: UserRole
}
