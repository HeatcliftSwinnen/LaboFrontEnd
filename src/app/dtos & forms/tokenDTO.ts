import {UserDTO} from "./userDTO";

export interface TokenDTO {
  token?: string
  user? : UserDTO
}
