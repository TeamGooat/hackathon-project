import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import { nanoid } from 'nanoid';
import { createClient, RedisClientType } from 'redis';

export class QuestionStore {
  private client: PrismaClient;
  private redis: RedisClientType;

  constructor() {
    this.client = new PrismaClient();
    this.redis = createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
    });
    this.redis.connect().then(() => {
      console.log("redis connected");
    })
  }

  async getQuestions() {
    const keys = await this.redis.sMembers("questions")
    const qs = await Promise.all(
      keys.map(async (key) => {
        const question = await this.redis.get(key)
        return question
      })
    )

    const _qs = qs.filter((q) => q !== null)

    if (_qs.length < 1) {
      await this.redis.expire("questions", 0)
    }

    return _qs
  }
  async newQuestion(userId: string, question: string) {
    const id = `question:${nanoid()}`
    const q = await this.redis.set(id, JSON.stringify({
      user_id: userId,
      question,
      created_at: new Date().getTime(),
    }), {
      EX: 60 * 60 * 24
    })

    if (q === "OK") {
      await this.redis.sAdd("questions", id)
      return {
        success: true,
      }
    } else {
      return {
        success: false,
      }
    }
  }

  async answerQuestion(userId: string, answer: string, questionId: number) {

  }
}