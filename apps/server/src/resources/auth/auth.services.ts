import { createToken } from "../../utils"
import { createHash } from "node:crypto"
import { sendEmail } from "../../utils/email"
import nodemailer from "nodemailer"

const user = {
  name: 'John Doe',
  email: 'johndoe@mail.com',
  password: '123456',
}

const existingUsers = new Array()

interface User {
  username: string
  password: string
}



export const signIn = async ({ username, password }: User) => {
  if (username === user.email && password === user.password) {
    return {
      access_token: createToken({ name: user.name, email: user.email }, "5m"),
      refresh_token: createToken({ name: user.name, email: user.email }, "30d"),
      success: true
    }
  }
  return {
    error: 'Invalid credentials',
    success: false
  }
}

export const register = async ( newUser : (User & {
  fName: string, 
  lName: string, 
  email: string, 
  rePassword: string, 
  anonymous: boolean})) => {
    // check if password and re-entered password is the same
    if (newUser.password !== newUser.rePassword) {
      return {
        sucess: false,
        error: "Password does not match"
      }
    }

    // check if username and email is unique
    if (existingUsers.filter(user => {
      if (user.username === newUser.username || user.email === newUser.email) return true
      return false
    }).length > 0) {
      return {
        success: false,
        error: "Details are not unique"
      }
    }

    // if all a-ok then hash + salt password and store
    // salt hash
    const hash = createHash('sha256');
    hash.update(newUser.password);
    newUser.password = hash.digest('hex')
    existingUsers.push(newUser)

    // create verification token
    // send via email
    let verificationCode = Math.random().toString(36).substring(2,8)
    sendEmail("Verify your email", `Hi! Your verification code is: ${verificationCode}`, newUser.email)
}

signIn({ username : "john", password: "123456" })