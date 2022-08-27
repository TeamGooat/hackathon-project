import { PrismaClient } from "@prisma/client";

export class RatingStore {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async addRating(userId: string, rating: number) {
    const ratefor = await this.client.user.findFirst({
      where: {
        exposed_id: userId
      }
    })

    const r = await this.client.rating.create({
      data: {
        rating: rating,
        user: {
          connect: {
            id: ratefor!.id
          }
        }
      }
    });

    if (r) {
      return {
        success: true,
        rating: r
      }
    } else {
      return {
        success: false
      }
    }
  }

  async getRatings(userId: string) {
    const ratefor = await this.client.user.findFirst({
      where: {
        exposed_id: userId
      }
    })

    const ratings = await this.client.rating.findMany({
      where: {
        user: {
          id: ratefor!.id
        }
      }
    })

    return {
      success: true,
      ratings
    }
  }

  async getOverall(userId: string) {
    const ratefor = await this.client.user.findFirst({
      where: {
        exposed_id: userId
      }
    })

    const ratings = await this.client.rating.findMany({
      where: {
        user: {
          id: ratefor!.id
        }
      }
    })

    if (ratings.length > 0) {
      let sum = 0;
      ratings.forEach(rating => {
        sum += rating.rating;
      })
      return {
        success: true,
        rating: sum / ratings.length
      }
    } else {
      return {
        success: true,
        rating: 0
      }
    }
  }
}