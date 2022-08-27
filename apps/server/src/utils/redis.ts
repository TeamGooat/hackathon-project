import { RedisClientType, createClient } from 'redis';
import { nanoid } from 'nanoid'

export class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
    });
    this.client.connect().then(() => {
      console.log("redis connected");
    })
  }

  private set(key: string, value: any, exp?: number) {
    this.client.set(key, value, {
      EX: exp
    }).then(v => {
      if (v === 'OK') {
        return true;
      }

      return false
    }).catch(e => {
      return false
    });
  }

  setSession(userId: number, value: any) {
    this.set(`session:${userId}:${nanoid()}`, value, 60 * 60 * 24 * 7);
  }

  setQuestion(userId: number, value: any) {
    const key = `question:${userId}:${nanoid()}`;
    this.set(key, value, 60);
    this.client.sAdd("questions", key);
  }

  async getQuestions() {
    const keys = await this.client.sMembers("questions");
    return await Promise.all(
      keys.map(async key => {
        const val = await this.getValue(key);
        if (val) {
          return {
            question: val,
            userId: key.split(":")[1]
          }
        } else {
          await this.removeMember('questions', key);
          return null
        }
      })
    )
  }

  async getValue(key: string) {
    return await this.client.get(key);
  }

  async removeMember(set: string, key: string) {
    return await this.client.sRem(set, [key]);
  }
}