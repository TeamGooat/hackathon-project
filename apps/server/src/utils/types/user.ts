export interface User {
    username: string
    password: string
    fName?: string,
    lName?: string, 
    email?: string | undefined, 
    rePassword?: string, 
    anonymous?: boolean,
    isVerified?: boolean
  }