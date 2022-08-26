import { createToken } from "../../utils"

const user = {
  name: 'John Doe',
  email: 'johndoe@mail.com',
  password: '123456',
}

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

signIn({ username : "john", password: "123456" })