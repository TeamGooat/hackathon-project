import { createToken } from "../../utils"
import { createHash } from "node:crypto"
import { sendEmail } from "../../utils/email"

// const user = {
//   name: 'John Doe',
//   email: 'johndoe@mail.com',
//   password: '123456',
// }

const existingUsers : {
  [key: string]: User
} = {}

const verificationTokens: {
  [key: string]: string
} = {}

interface User {
  username: string
  password: string
  fName?: string,
  lName?: string, 
  email?: string | undefined, 
  rePassword?: string, 
  anonymous?: boolean,
  isVerified?: boolean
}


/**
 * Signs user in and returns access and refresh web tokens
 * @param username email of the user signing in
 * @param password password of user signing in 
 * @returns access and refresh token if valid, otherwise error
 */
export const signIn = async ({ username, password }: User) => {
  const currentUser = existingUsers[username!];
  const hash = createHash('sha256');
  const hashPassword = hash.update(password);
  if (currentUser && currentUser.email === username && hashPassword.digest('hex') === currentUser.password) {
    return {
      access_token: createToken({ name: currentUser.username, email: currentUser.email }, "5m"),
      refresh_token: createToken({ name: currentUser.username, email: currentUser.email }, "30d"),
      success: true
    }
  }
  return {
    error: 'Invalid credentials',
    success: false
  }
}

export const validateTokens = async ({ refreshToken, accessToken }) {
  
}

export const register = async ( newUser : (User)) => {
    // check if password and re-entered password is the same
    if (newUser.password !== newUser.rePassword) {
      return {
        sucess: false,
        error: "Password does not match"
      }
    }

    // check if username and email is unique
    if (Object.entries(existingUsers).filter(([k,v]) => {
      return v.email === newUser.email! || v.username === newUser.username
    }).length > 0) {
      return {
        success: false,
        error: "Details are not unique"
      }
    }

    // if all a-ok then hash + salt password and store
    const hash = createHash('sha256');
    hash.update(newUser.password);
    newUser.password = hash.digest('hex')
    Object.assign(existingUsers, {[newUser.email!]: newUser})

    // create verification token
    // send via email
    let verificationCode = Math.random().toString(36).substring(2,8)

    sendEmail("Verify your email", `Hi! Your verification code is: ${verificationCode}`, newUser.email!)

    Object.assign(verificationTokens, {[verificationCode]: newUser.email})
}

export const verify = (verificationCode: string, email: string) => {
  let linkedEmail = verificationTokens[verificationCode]
  if (linkedEmail === email) {
    existingUsers[linkedEmail].isVerified = true
    delete existingUsers[linkedEmail]
    return {
      success: true,
      message: "User has been verified"
    }
  } else {
    return {
      success: false,
      message: "Verification token is invalid."
    }
  }
}