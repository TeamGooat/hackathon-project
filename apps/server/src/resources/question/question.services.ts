import { QuestionStore } from './question.store';

export interface u {
    user_id: string,
    question_id: string,
    title: string,
    question: string,
    created_at:Date
}
export class QuestionService {
  private store: QuestionStore;
  constructor() {
    this.store = new QuestionStore();
  }

  async getQuestions() {
    return await this.store.getQuestions();
  }

  async getSingleQuestion(id: string) : Promise<u[]> {
    const qs = (await this.store.getQuestions()).filter((q) => q.question_id === id) as u[]
    return qs
  }

  async getAnswered() {
    return await this.store.getAnswered();
  }

  async newQuestion(userId: string, title: string, question: string) {
    return await this.store.newQuestion(userId, title, question);
  }

  async answerQuestion(userId: string, answer: string, questionId: string) {
    return await this.store.answerQuestion(userId, answer, questionId);
  }
}