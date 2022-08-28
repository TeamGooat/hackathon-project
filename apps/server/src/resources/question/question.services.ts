import { QuestionStore } from './question.store';

export class QuestionService {
  private store: QuestionStore;
  constructor() {
    this.store = new QuestionStore();
  }

  async getQuestions() {
    return await this.store.getQuestions();
  }

  async getSingleQuestion(id: string) {
    const qs = await this.store.getQuestions();
    return qs.filter((q) => q.question_id === id)
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