import { prisma, PrismaClient } from '@prisma/client';
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

  async getAnswered() {
    const answered = await this.client.answers.findMany({
      include: {
        user: {
          select: {
            username: true,
          }
        },
        question: {
          include: {
            user: {
              select: {
                username: true,
              }
            }
          }
        }
      }
    })
    return answered
  }

  async getQuestions() {
    const keys = await this.redis.sMembers("questions")
    const qs = await Promise.all(
      keys.map(async (key) => {
        const question = await this.redis.get(key)
        return question
      })
    )

    const _qs = qs.filter((q) => q !== null).map((q) => JSON.parse(q!))

    if (_qs.length < 1) {
      await this.redis.expire("questions", 0)
    }

    return _qs
  }
  async newQuestion(userId: string, title: string, question: string) {
    const id = `question:${nanoid()}`
    const q = await this.redis.set(id, JSON.stringify({
      user_id: userId,
      title: title,
      question,
      created_at: new Date().getTime(),
    }), {
      EX: 60 * 60 * 24
    })

    if (q === "OK") {
      await this.redis.sAdd("questions", id)
      return {
        question_id: id,
        success: true,
      }
    } else {
      return {
        success: false,
      }
    }
  }

  async answerQuestion(userId: string, answer: string, questionId: string) {
    const q = await this.redis.get(questionId)
    if (q) {
      const _q = JSON.parse(q) as {user_id: string, title: string,  question: string, created_at: number}
      const asker = await this.client.user.findFirst({
        where: {
          exposed_id: _q.user_id
        }
      })

      const answerer = await this.client.user.findFirst({
        where: {
          exposed_id: userId
        }
      })

      const question = await this.client.questions.create({
        data: {
          user: {
            connect: {
              id: asker!.id
            }
          },
          title: _q.title,
          question: _q.question,
        }
      })

      const _answer = await this.client.answers.create({
        data: {
          user: {
            connect: {
              id: answerer!.id
            }
          },
          answer: answer,
          question: {
            connect: {
              id: question.id
            }
          }
        }
      })

      await this.redis.del(questionId)

      return {
        success: true,
        question: question,
        answer: _answer,
      }
    } else {
      return {
        success: false,
      }
    }
  }
}