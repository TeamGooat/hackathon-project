import jwt, {Secret, verify} from 'jsonwebtoken';


export const createToken = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn })
}

export const createTokens = (payload: any) => {
  return {
    accessToken: createToken(payload, '5m'),
    refreshToken: createToken(payload, '30d'),
  }
<<<<<<< HEAD
}

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as Secret)
    return {
      success: true,
      decoded,
    }
  } catch (error) {
    return {
      success: false,
    }
  }
=======
>>>>>>> 17a1015e65e273f3d1a1c8aa548e752fd0a47ba5
}