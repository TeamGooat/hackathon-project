import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// create a that looks into users table and checks if user with same email or username exists
// return true if there is , false otherwise

