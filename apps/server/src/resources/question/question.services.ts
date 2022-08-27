import { createClient } from 'redis'
import { RedisClient } from '../../utils'

const rc = new RedisClient()

export const NewQuestion = async (userId: number, question: string) => {
  rc.setQuestion(userId, question)
}

export const GetQuestions = async () => {
  const vals = await rc.getQuestions()
  return vals.filter(v => v !== null)
}