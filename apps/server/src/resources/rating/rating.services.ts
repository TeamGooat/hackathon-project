import { RatingStore } from "./rating.store";

export class RatingService {
  private store: RatingStore;

  constructor() {
    this.store = new RatingStore();
  }

  async addRating(userId: string, rating: number) {
    return await this.store.addRating(userId, rating);
  }

  async getRatings(userId: string) {
    return await this.store.getRatings(userId);
  }

  async getOverall(userId: string) {
    return await this.store.getOverall(userId);
  }
}