import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// create a function that returns users with certina un OR email
const duplicateUsers = async (usernameEntered: string, emailEntered: string) => {await prisma.user.findMany({
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
}

