import jwt, {Secret} from 'jsonwebtoken';


export const createToken = (payload: any, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn })
}