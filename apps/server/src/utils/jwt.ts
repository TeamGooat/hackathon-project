import jwt, {JwtPayload, Secret} from 'jsonwebtoken';
import { number, object } from 'zod';


export const createToken = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn })
}

export const verifyToken = (token: string)
: ({success: boolean, payload: string | any} | {success: boolean, code: number, error: string}) => {
  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET as Secret, {complete: true})
    return {
      success: true,
      payload: decodedToken.payload
    }
  } catch (err) {
    return {
      success: false,
      code: 401,
      error: "Invalid Token."
    }
  }
}
