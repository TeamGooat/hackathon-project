import jwt, {Secret, verify} from 'jsonwebtoken';


export const createToken = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn })
}

export const createTokens = (payload: any) => {
  return {
    accessToken: createToken(payload, '5m'),
    refreshToken: createToken(payload, '30d'),
  }
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
}