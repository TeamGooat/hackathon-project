import { PrismaClient } from '@prisma/client'
class UserRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser() {
  }
}