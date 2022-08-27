import { createToken } from "../../utils"
import { createHash } from "node:crypto"
import { sendEmail } from "../../utils/email"
import { verifyToken } from "../../utils/jwt"
import { User } from "../../utils/types/user"
import { createUser, createUserOTP, setVerifiedUser, signInUser, createUserToken, duplicateUsers, getUserFromToken } from "./auth.model"

export interface JWTToken {
  refreshToken: string,
  accessToken: string
}

/**
 * Signs user in and returns access and refresh web tokens
 * @param username email of the user signing in
 * @param password password of user signing in 
 * @returns access and refresh token if valid, otherwise error
 */
export const signIn = async ({ username, password }: User): Promise<{access_token?: string, refresh_token?: string, error?: string, success:boolean}> => {
  // create hashed password
  let hash = createHash('sha256');
  hash.update(password);

  // check if details are valid
  let currentUser = await signInUser(username, hash.digest('hex'))

  // if valid then return tokens
  if (currentUser !== null) {

    // store refresh token in db
    const tokenData = {
      access_token: createToken({ name: currentUser.username, email: currentUser.email }, "5m"),
      refresh_token: createToken({ name: currentUser.username, email: currentUser.email }, "30d"),
      success: true
    }

    // store refresh token in db
    createUserToken(tokenData.refresh_token, currentUser.id)

    return tokenData

  }
  return {
    error: 'Invalid credentials',
    success: false
  }
}

export const validateTokens = async ({ refreshToken, accessToken } : JWTToken) => {
  // check if access token is valid
  if (verifyToken(accessToken).success) {
    return {
      success: true,
    }
  }

  // if access token invalid, check refresh token
  let res = verifyToken(refreshToken)
  if (res.success) {

    const tokenData = {
      success: true,
      access_token: createToken((res as {success: boolean, payload: string | any}).payload, "5m"),
      refresh_token: createToken((res as {success: boolean, payload: string | any}).payload, "30d"),
    }

    let user = await getUserFromToken(tokenData.refresh_token)
    createUserToken(tokenData.refresh_token, user?.id!)

    return tokenData

  } else {
    return {
      success: false,
      message: (res as {success: boolean, code: number, error: string}).error
    }
  }
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
    // if in the database, there is ANY users with same email 
    let checkUnique =  duplicateUsers(newUser.username, newUser.email!)
    if ((await checkUnique).length > 0) {
      return {
        success: false,
        error: "Details are not unique"
      }
    }

    // if all a-ok then hash + salt password and store
    const hash = createHash('sha256');
    hash.update(newUser.password);
    newUser.password = hash.digest('hex')
    let user = await createUser(newUser)

    // create verification token
    // send via email
    let verificationCode = Math.random().toString(36).substring(2,8)

    sendEmail("Verify your email", `Hi! Your verification code is: ${verificationCode}`, newUser.email!)

    createUserOTP(verificationCode, user.id)
}

export const verifyUser = (verificationCode: string) => {
  return setVerifiedUser(verificationCode)
}