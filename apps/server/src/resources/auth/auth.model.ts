import { PrismaClient, Prisma } from '@prisma/client'
import { User } from '../../utils/types/user'
import { createHash } from "node:crypto"

const prisma = new PrismaClient()

// create a function that returns users with certina un OR email
export const duplicateUsers = async (usernameEntered: string, emailEntered: string) => {
    let res = await prisma.user.findMany({
    where: {
        OR: [
            {email: {
                equals: emailEntered,
            }
        },
        {username: {
            equals: usernameEntered
        }},
        ]
    }
})
return res
}

export const createUser = async ({fName, lName, username, email, password, anonymous}: User) => {
    let userData: Prisma.UserCreateInput = {
        first_name: fName!,
        last_name: lName!,
        username: username,
        email: email!,
        password: password,
        verified: false,
        anonymous: anonymous!
    }

    return await prisma.user.create({ data: userData })
}

export const setVerifiedUser = async (verificationCode: string) => {
    let verifiedUser = await verifyVerificationCode(verificationCode)
    if (verifiedUser.success) {
        // return verified and success
        await prisma.user.update({
            where: {
              id: verifiedUser.user_id,
            },
            data: {
              verified: true,
            },
          })

        return {
            success: true
        }
    } else {
        return {
            success: false,
            error: "Verification token is invalid!"
        }
    }  
}

const verifyVerificationCode = async (verificationCode: string) => {
    // look for verificationcode
    let userOTP = await prisma.userOTP.findFirst({
        where: {
          otp: verificationCode
        }
      })

    if (userOTP == null) {
        return { success: false }
    } else {
        // delete from table
        await prisma.userOTP.deleteMany({
            where: {
              otp: verificationCode
            },
          })
        
        return {
            success: true,
            user_id: userOTP.user_id
        }
    }
}

export const loginUser = async (userEmail: string, userPassword: string) => {   
    // get user by id
    const user = await prisma.user.findFirst({
        where: {
            email: userEmail,
        },
    })

    let hash = createHash('sha256');

    hash = hash.update(userPassword);

    return user?.email && user.email === userEmail && hash.digest('hex') === user.password
}

export const createUserOTP = async (verificationCode: string, userID: number) => {
    const otp = {
        user_id: userID,
        otp: verificationCode,
    }
    await prisma.userOTP.create({
        data: otp
    })
}
